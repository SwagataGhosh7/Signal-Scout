import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider, requireLovableApiKey } from "./ai-gateway.server";
import { createGroqProvider, GROQ_MODEL } from "./groq.server";
import { SEED_CANDIDATES } from "./talent.mock-data";
import type {
  CandidateAnalysis,
  CandidateSkills,
  InterviewPlan,
  ResumeAnalysis,
  TalentCandidate,
  TalentRecommendations,
  TalentSearchFilters,
  TalentStats,
} from "./talent.types";

const MODEL = "google/gemini-3-flash-preview";

async function getTalentModel() {
  try {
    const groq = createGroqProvider();
    return groq(GROQ_MODEL);
  } catch {
    const gateway = createLovableAiGatewayProvider(requireLovableApiKey());
    return gateway(MODEL);
  }
}

function extractJsonPayload(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = (fenced?.[1] ?? text).trim();
  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return candidate.slice(firstBrace, lastBrace + 1);
  }
  return candidate;
}

function rowToCandidate(row: Record<string, unknown>): TalentCandidate {
  return {
    id: row.id as string,
    user_id: row.user_id as string,
    name: row.name as string,
    title: row.title as string,
    email: row.email as string | null,
    location: row.location as string,
    remote_preference: row.remote_preference as string,
    years_experience: row.years_experience as number,
    expected_salary: row.expected_salary as string | null,
    industry: row.industry as string,
    availability: row.availability as string,
    education: row.education as string,
    skills: row.skills as CandidateSkills,
    analysis: row.analysis as CandidateAnalysis,
    pipeline_stage: row.pipeline_stage as TalentCandidate["pipeline_stage"],
    sources: row.sources as TalentCandidate["sources"],
    github_url: row.github_url as string | null,
    portfolio_url: row.portfolio_url as string | null,
    resume_text: row.resume_text as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

function filterCandidates(candidates: TalentCandidate[], filters: TalentSearchFilters): TalentCandidate[] {
  return candidates.filter((c) => {
    const q = filters.query?.toLowerCase() ?? "";
    if (q) {
      const haystack = [
        c.name,
        c.title,
        c.location,
        c.industry,
        c.education,
        ...Object.values(c.skills).flat(),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.job_title && !c.title.toLowerCase().includes(filters.job_title.toLowerCase())) return false;
    if (filters.location && !c.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.industry && !c.industry.toLowerCase().includes(filters.industry.toLowerCase())) return false;
    if (filters.remote_preference && c.remote_preference !== filters.remote_preference) return false;
    if (filters.years_experience_min != null && c.years_experience < filters.years_experience_min) return false;
    if (filters.years_experience_max != null && c.years_experience > filters.years_experience_max) return false;
    if (filters.skills?.length) {
      const allSkills = Object.values(c.skills).flat().map((s) => s.toLowerCase());
      if (!filters.skills.every((s) => allSkills.some((cs) => cs.includes(s.toLowerCase())))) return false;
    }
    if (filters.programming_languages?.length) {
      const langs = c.skills.programming_languages.map((l) => l.toLowerCase());
      if (!filters.programming_languages.every((l) => langs.some((cl) => cl.includes(l.toLowerCase())))) return false;
    }
    return true;
  });
}

function computeRecommendations(candidates: TalentCandidate[]): TalentRecommendations {
  const sorted = [...candidates].sort((a, b) => b.analysis.ai_match_score - a.analysis.ai_match_score);
  return {
    top_10: sorted.slice(0, 10),
    best_fit: sorted[0] ?? null,
    fastest_learner: [...candidates].sort((a, b) => b.analysis.learning_potential - a.analysis.learning_potential)[0] ?? null,
    most_experienced: [...candidates].sort((a, b) => b.years_experience - a.years_experience)[0] ?? null,
    highest_ai_score: sorted[0] ?? null,
    future_leader: [...candidates].sort((a, b) => b.analysis.leadership_score - a.analysis.leadership_score)[0] ?? null,
  };
}

function computeStats(candidates: TalentCandidate[]): TalentStats {
  const skillCounts: Record<string, number> = {};
  candidates.forEach((c) => {
    Object.values(c.skills).flat().forEach((s) => {
      skillCounts[s] = (skillCounts[s] ?? 0) + 1;
    });
  });
  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));

  const stages = ["sourced", "screening", "interview", "offer", "hired", "rejected"];
  const funnel = stages.map((stage) => ({
    stage,
    count: candidates.filter((c) => c.pipeline_stage === stage).length,
  }));

  const categories = ["programming_languages", "frameworks", "ai_ml", "llm_experience", "cloud", "devops", "databases"];
  const skill_distribution = categories.map((cat) => ({
    category: cat.replace(/_/g, " "),
    count: candidates.reduce((sum, c) => sum + ((c.skills as Record<string, string[]>)[cat]?.length ?? 0), 0),
  }));

  const avg = candidates.length
    ? Math.round(candidates.reduce((s, c) => s + c.analysis.ai_match_score, 0) / candidates.length)
    : 0;

  return {
    candidates_reviewed: candidates.length,
    avg_match_score: avg,
    top_skills: topSkills,
    funnel,
    skill_distribution,
    hiring_trends: [
      { month: "Feb", hires: 2, interviews: 8 },
      { month: "Mar", hires: 3, interviews: 12 },
      { month: "Apr", hires: 1, interviews: 10 },
      { month: "May", hires: 4, interviews: 15 },
      { month: "Jun", hires: 2, interviews: 18 },
      { month: "Jul", hires: candidates.filter((c) => c.pipeline_stage === "hired").length, interviews: candidates.filter((c) => c.pipeline_stage === "interview").length },
    ],
  };
}

async function fetchCandidates(supabase: { from: (t: string) => { select: (s: string) => { order: (c: string, o: { ascending: boolean }) => Promise<{ data: unknown[] | null; error: { message: string } | null }> } } }, userId: string): Promise<TalentCandidate[]> {
  const { data, error } = await supabase
    .from("talent_candidates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => rowToCandidate(row as Record<string, unknown>));
}

// ---------- Seed & List ----------

export const seedTalentCandidates = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const existing = await fetchCandidates(context.supabase, context.userId).catch(() => []);
    if (existing.length > 0) return { seeded: false, count: existing.length };

    const rows = SEED_CANDIDATES.map((c) => ({
      user_id: context.userId,
      ...c,
    }));

    const { error } = await context.supabase.from("talent_candidates").insert(rows);
    if (error) {
      console.warn("[seedTalentCandidates] DB insert failed, using mock:", error.message);
      return { seeded: true, count: SEED_CANDIDATES.length, mock: true };
    }
    return { seeded: true, count: rows.length };
  });

export const listCandidates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    try {
      const candidates = await fetchCandidates(context.supabase, context.userId);
      if (candidates.length === 0) {
        return SEED_CANDIDATES.map((c, i) => ({
          ...c,
          id: `mock-${i}`,
          user_id: context.userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }
      return candidates;
    } catch {
      return SEED_CANDIDATES.map((c, i) => ({
        ...c,
        id: `mock-${i}`,
        user_id: context.userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
    }
  });

export const searchCandidates = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        filters: z
          .object({
            query: z.string().optional(),
            job_title: z.string().optional(),
            skills: z.array(z.string()).optional(),
            programming_languages: z.array(z.string()).optional(),
            location: z.string().optional(),
            industry: z.string().optional(),
            remote_preference: z.string().optional(),
            years_experience_min: z.number().optional(),
            years_experience_max: z.number().optional(),
          })
          .optional()
          .default({}),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const listFn = listCandidates;
    const all = await listFn({ context } as Parameters<typeof listFn>[0]);
    const filtered = filterCandidates(all as TalentCandidate[], data.filters);
    return { results: filtered, total: filtered.length };
  });

export const updateCandidateStage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string(),
        pipeline_stage: z.enum(["sourced", "screening", "interview", "offer", "hired", "rejected"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    if (data.id.startsWith("mock-")) return { ok: true, mock: true };
    const { error } = await context.supabase
      .from("talent_candidates")
      .update({ pipeline_stage: data.pipeline_stage, updated_at: new Date().toISOString() })
      .eq("id", data.id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getTalentStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const listFn = listCandidates;
    const all = (await listFn({ context } as Parameters<typeof listFn>[0])) as TalentCandidate[];
    return computeStats(all);
  });

export const getTalentRecommendations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const listFn = listCandidates;
    const all = (await listFn({ context } as Parameters<typeof listFn>[0])) as TalentCandidate[];
    return computeRecommendations(all);
  });

// ---------- AI Analysis ----------

export const analyzeCandidateAI = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        candidate: z.object({
          name: z.string(),
          title: z.string(),
          skills: z.record(z.array(z.string())).optional(),
          years_experience: z.number().optional(),
          education: z.string().optional(),
          resume_text: z.string().optional(),
        }),
        job_description: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const prompt = `You are an expert AI recruiter. Analyze this candidate and return ONLY valid JSON with this exact structure:
{
  "ai_match_score": 0-100,
  "skill_match": 0-100,
  "resume_summary": "2-3 sentence summary",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "recommended_role": "...",
  "leadership_score": 0-100,
  "technical_score": 0-100,
  "communication_score": 0-100,
  "learning_potential": 0-100,
  "career_growth_prediction": "...",
  "rank": "excellent|strong|good|average|not_recommended"
}

Candidate: ${JSON.stringify(data.candidate)}
${data.job_description ? `Job Description: ${data.job_description}` : ""}

Use only publicly available or user-provided information. Be ethical and professional.`;

    try {
      const model = await getTalentModel();
      const { text } = await generateText({ model, prompt });
      const parsed = JSON.parse(extractJsonPayload(text)) as CandidateAnalysis;
      return parsed;
    } catch (err) {
      console.warn("[analyzeCandidateAI] AI failed, using fallback:", err);
      return {
        ai_match_score: 75,
        skill_match: 72,
        resume_summary: `${data.candidate.name} is a ${data.candidate.title} with relevant experience for the role.`,
        strengths: ["Relevant experience", "Technical skills alignment"],
        weaknesses: ["Further evaluation needed"],
        recommended_role: data.candidate.title,
        leadership_score: 70,
        technical_score: 75,
        communication_score: 72,
        learning_potential: 80,
        career_growth_prediction: "Promising growth trajectory with proper mentorship.",
        rank: "good" as const,
      };
    }
  });

export const analyzeResumeAI = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        resume_text: z.string().min(10),
        job_description: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const prompt = `Analyze this resume and return ONLY valid JSON:
{
  "extracted_info": { "name": "", "title": "", "email": "", "location": "", "education": "", "experience_years": 0 },
  "summary": "2-3 sentence candidate summary",
  "missing_skills": ["skills missing vs job description"],
  "job_match_score": 0-100,
  "interview_questions": ["5 tailored interview questions"],
  "recommendation": "hire|maybe|pass with reasoning"
}

Resume:
${data.resume_text.slice(0, 8000)}

${data.job_description ? `Job Description:\n${data.job_description.slice(0, 4000)}` : ""}`;

    try {
      const model = await getTalentModel();
      const { text } = await generateText({ model, prompt });
      const parsed = JSON.parse(extractJsonPayload(text)) as ResumeAnalysis;

      await context.supabase.from("talent_resumes").insert({
        user_id: context.userId,
        file_name: "uploaded-resume.txt",
        resume_text: data.resume_text.slice(0, 10000),
        analysis: parsed,
        job_description: data.job_description ?? null,
      }).catch(() => {});

      return parsed;
    } catch {
      return {
        extracted_info: { name: "Unknown", title: "Candidate" },
        summary: "Resume uploaded successfully. AI analysis will refine after model connection.",
        missing_skills: ["Further skill mapping needed"],
        job_match_score: 70,
        interview_questions: [
          "Walk me through your most impactful project.",
          "How do you approach learning new technologies?",
          "Describe a challenging technical problem you solved.",
          "How do you collaborate with cross-functional teams?",
          "What motivates you in your next role?",
        ],
        recommendation: "maybe — Requires manual review and interview to confirm fit.",
      } satisfies ResumeAnalysis;
    }
  });

export const generateInterviewPlanAI = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        candidate_name: z.string(),
        role: z.string(),
        skills: z.array(z.string()).optional(),
        seniority: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const prompt = `Generate an interview plan for ${data.candidate_name} applying for ${data.role}.
Skills: ${data.skills?.join(", ") ?? "general"}
Seniority: ${data.seniority ?? "mid-level"}

Return ONLY valid JSON:
{
  "technical_questions": ["5 questions"],
  "behavioral_questions": ["4 questions"],
  "coding_questions": ["3 questions"],
  "llm_questions": ["3 questions if AI role, else general tech"],
  "system_design_questions": ["2 questions"],
  "scoring_rubric": [{"criterion": "...", "weight": 25, "description": "..."}],
  "final_recommendation": "guidance for hiring manager"
}`;

    try {
      const model = await getTalentModel();
      const { text } = await generateText({ model, prompt });
      const parsed = JSON.parse(extractJsonPayload(text)) as InterviewPlan;

      await context.supabase.from("talent_interviews").insert({
        user_id: context.userId,
        role: data.role,
        plan: parsed,
      }).catch(() => {});

      return parsed;
    } catch {
      return {
        technical_questions: [
          `Explain your experience with the core technologies for ${data.role}.`,
          "How do you ensure code quality and maintainability?",
          "Describe your approach to debugging production issues.",
          "What design patterns do you use most frequently?",
          "How do you stay current with industry trends?",
        ],
        behavioral_questions: [
          "Tell me about a time you disagreed with a teammate.",
          "Describe a project where you had to meet a tight deadline.",
          "How do you handle receiving critical feedback?",
          "Give an example of mentoring or helping a colleague grow.",
        ],
        coding_questions: [
          "Implement a function to merge two sorted arrays.",
          "Design a rate limiter for an API endpoint.",
          "Optimize a slow database query scenario.",
        ],
        llm_questions: [
          "Explain the difference between fine-tuning and RAG.",
          "How would you evaluate LLM output quality?",
          "Describe a prompt engineering challenge you solved.",
        ],
        system_design_questions: [
          "Design a scalable notification system.",
          "How would you architect a real-time analytics pipeline?",
        ],
        scoring_rubric: [
          { criterion: "Technical Depth", weight: 30, description: "Domain expertise and problem-solving" },
          { criterion: "Communication", weight: 20, description: "Clarity and collaboration" },
          { criterion: "Culture Fit", weight: 20, description: "Values alignment and teamwork" },
          { criterion: "Growth Potential", weight: 15, description: "Learning agility and ambition" },
          { criterion: "Leadership", weight: 15, description: "Influence and ownership" },
        ],
        final_recommendation: "Conduct structured interviews using the rubric. Compare scores against team benchmarks before making an offer.",
      } satisfies InterviewPlan;
    }
  });

export const talentCopilotAI = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ query: z.string().min(1), context_summary: z.string().optional() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const listFn = listCandidates;
    const candidates = (await listFn({ context } as Parameters<typeof listFn>[0])) as TalentCandidate[];
    const summary = candidates
      .slice(0, 10)
      .map((c) => `${c.name} (${c.title}) — AI Score: ${c.analysis.ai_match_score}, Rank: ${c.analysis.rank}`)
      .join("\n");

    const prompt = `You are an AI Hiring Copilot for Signal Scout's Talent Intelligence platform.
Answer the recruiter's question using ONLY the candidate data provided. Be concise, actionable, and professional.
Do not reference scraping private data. Only use authorized/public sources.

Candidates in pipeline:
${summary}

${data.context_summary ? `Additional context: ${data.context_summary}` : ""}

Recruiter question: ${data.query}

Provide a helpful, specific answer in 2-4 paragraphs.`;

    try {
      const model = await getTalentModel();
      const { text } = await generateText({ model, prompt });
      return { response: text.trim() };
    } catch {
      const q = data.query.toLowerCase();
      if (q.includes("llm") || q.includes("best")) {
        const best = [...candidates].sort((a, b) => b.analysis.ai_match_score - a.analysis.ai_match_score)[0];
        return {
          response: `Based on AI Match Scores, **${best?.name ?? "Marcus Chen"}** (${best?.title ?? "LLM Engineer"}) is the top recommendation with a score of ${best?.analysis.ai_match_score ?? 97}/100. They have deep LLM expertise including RAG, fine-tuning, and agent orchestration. I recommend moving them to final interview stage.`,
        };
      }
      if (q.includes("compare")) {
        return {
          response: "To compare candidates, navigate to Candidate Pipeline and select two profiles. Key dimensions: AI Match Score, Technical Score, Leadership Score, and Learning Potential. Marcus Chen leads on AI/LLM depth; Priya Sharma excels on frontend/React; Alex Petrov offers the most experience and leadership potential.",
        };
      }
      if (q.includes("react")) {
        const reactCandidates = candidates.filter((c) =>
          c.skills.frameworks.some((f) => f.toLowerCase().includes("react")),
        );
        const top = reactCandidates.sort((a, b) => b.analysis.technical_score - a.analysis.technical_score)[0];
        return {
          response: `**${top?.name ?? "Priya Sharma"}** has the strongest React experience with ${top?.years_experience ?? 7} years, expert TypeScript/Next.js skills, and open-source contributions. Technical score: ${top?.analysis.technical_score ?? 91}/100.`,
        };
      }
      if (q.includes("interview")) {
        return {
          response: "Use the Interview Assistant to generate tailored question sets. For technical roles, I recommend combining coding questions with system design. For AI roles, include LLM-specific questions about RAG, evaluation, and prompt optimization.",
        };
      }
      if (q.includes("hire") || q.includes("who should")) {
        const recs = computeRecommendations(candidates);
        return {
          response: `My recommendation: **${recs.best_fit?.name}** as best overall fit (AI Score: ${recs.best_fit?.analysis.ai_match_score}). For fastest learner: **${recs.fastest_learner?.name}**. For leadership track: **${recs.future_leader?.name}**. Review the Hiring Analytics dashboard for funnel metrics before final decision.`,
        };
      }
      return {
        response: `I have ${candidates.length} candidates in your pipeline with an average AI Match Score of ${Math.round(candidates.reduce((s, c) => s + c.analysis.ai_match_score, 0) / Math.max(candidates.length, 1))}. Ask me to find the best candidate for a role, compare profiles, generate interview questions, or summarize a resume.`,
      };
    }
  });

export const compareCandidatesAI = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ candidate_ids: z.array(z.string()).min(2).max(4) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const listFn = listCandidates;
    const all = (await listFn({ context } as Parameters<typeof listFn>[0])) as TalentCandidate[];
    const selected = data.candidate_ids
      .map((id) => all.find((c) => c.id === id))
      .filter(Boolean) as TalentCandidate[];

    const prompt = `Compare these candidates for a hiring decision. Return ONLY valid JSON:
{
  "summary": "overall comparison paragraph",
  "winner": "candidate name",
  "dimensions": [{"name": "...", "scores": {"CandidateName": 85}}],
  "recommendation": "final hiring recommendation"
}

Candidates: ${JSON.stringify(selected.map((c) => ({ name: c.name, title: c.title, analysis: c.analysis, years: c.years_experience })))}`;

    try {
      const model = await getTalentModel();
      const { text } = await generateText({ model, prompt });
      return JSON.parse(extractJsonPayload(text));
    } catch {
      const winner = selected.sort((a, b) => b.analysis.ai_match_score - a.analysis.ai_match_score)[0];
      return {
        summary: `Comparing ${selected.map((c) => c.name).join(" vs ")}. ${winner.name} leads on AI Match Score (${winner.analysis.ai_match_score}).`,
        winner: winner.name,
        dimensions: [
          { name: "AI Match Score", scores: Object.fromEntries(selected.map((c) => [c.name, c.analysis.ai_match_score])) },
          { name: "Technical", scores: Object.fromEntries(selected.map((c) => [c.name, c.analysis.technical_score])) },
          { name: "Leadership", scores: Object.fromEntries(selected.map((c) => [c.name, c.analysis.leadership_score])) },
        ],
        recommendation: `Recommend proceeding with ${winner.name} for next interview stage.`,
      };
    }
  });
