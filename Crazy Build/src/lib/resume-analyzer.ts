import { Groq } from "groq-sdk";

export interface ResumeAnalysisBreakdown {
  impact_and_metrics: number;
  experience_and_progression: number;
  skills_match_and_depth: number;
  formatting_and_structure: number;
}

export interface ResumeAnalysisResponse {
  overall_score: number;
  breakdown: ResumeAnalysisBreakdown;
  summary: string;
  missing_skills: string[];
  critical_feedback: string[];
}

export class ResumeAnalysisError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 400,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ResumeAnalysisError";
  }
}

const SYSTEM_PROMPT = `You are an expert AI Resume Analyzer and Technical Recruiter.

Your only task is to objectively evaluate the provided resume.

Score the resume out of 100 using the following criteria.

Evaluation Criteria:

1. Impact & Metrics (30)
- Quantified achievements
- Business impact
- Measurable improvements
- Numbers
- Metrics

2. Experience & Progression (25)
- Career progression
- Ownership
- Responsibilities
- Seniority
- Project complexity

3. Skills Match & Depth (25)
- Relevant technologies
- Technical depth
- Industry knowledge
- Certifications
- Framework expertise

4. Formatting & Structure (20)
- Readability
- ATS friendliness
- Sections
- Grammar
- Action verbs
- Consistency

Scoring Rules

100 = Exceptional resume

90–99 = Excellent

80–89 = Strong

70–79 = Good

60–69 = Average

Below 60 = Needs significant improvement

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT explain anything.

Do NOT wrap JSON inside code blocks.

Return exactly this schema.
{
  "overall_score": 0,
  "breakdown": {
    "impact_and_metrics": 0,
    "experience_and_progression": 0,
    "skills_match_and_depth": 0,
    "formatting_and_structure": 0
  },
  "summary": "",
  "missing_skills": [],
  "critical_feedback": []
}`;

const MODEL = "llama-3.3-70b-versatile";
const TEMPERATURE = 0.2;
const MAX_RESUME_CHARS = 30000;
const MAX_TOKENS = 800;
const REQUEST_TIMEOUT_MS = Number(process.env.RESUME_ANALYSIS_TIMEOUT_MS ?? 20000);
const MAX_RETRY_ATTEMPTS = 2;

function getGroqClient(): Groq {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new ResumeAnalysisError("Missing GROQ_API_KEY environment variable", 500);
  }

  return new Groq({
    apiKey,
    timeout: REQUEST_TIMEOUT_MS,
  });
}

export function validateResumeText(resumeText: unknown): string {
  if (typeof resumeText !== "string") {
    throw new ResumeAnalysisError("Resume text is required", 400);
  }

  const normalized = resumeText.trim();
  if (!normalized) {
    throw new ResumeAnalysisError("Resume text is required", 400);
  }

  if (normalized.length < 20) {
    throw new ResumeAnalysisError("Resume must be at least 20 characters long", 400);
  }

  if (normalized.length > MAX_RESUME_CHARS) {
    throw new ResumeAnalysisError(`Resume must be no more than ${MAX_RESUME_CHARS} characters`, 400);
  }

  return normalized;
}

export function validateAnalysisPayload(payload: unknown): ResumeAnalysisResponse {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new ResumeAnalysisError("Invalid resume analysis payload", 502);
  }

  const analysis = payload as Record<string, unknown>;
  const overallScore = analysis.overall_score;
  if (typeof overallScore !== "number" || !Number.isInteger(overallScore) || overallScore < 0 || overallScore > 100) {
    throw new ResumeAnalysisError("overall_score must be an integer between 0 and 100", 502);
  }

  const breakdown = analysis.breakdown;
  if (!breakdown || typeof breakdown !== "object" || Array.isArray(breakdown)) {
    throw new ResumeAnalysisError("breakdown must be an object", 502);
  }

  const breakdownRecord = breakdown as Record<string, unknown>;
  const allowedBreakdownRanges: Record<string, [number, number]> = {
    impact_and_metrics: [0, 30],
    experience_and_progression: [0, 25],
    skills_match_and_depth: [0, 25],
    formatting_and_structure: [0, 20],
  };

  for (const [key, [min, max]] of Object.entries(allowedBreakdownRanges)) {
    const value = breakdownRecord[key];
    if (typeof value !== "number" || !Number.isInteger(value) || value < min || value > max) {
      throw new ResumeAnalysisError(`breakdown.${key} must be between ${min} and ${max}`, 502);
    }
  }

  if (typeof analysis.summary !== "string" || !analysis.summary.trim()) {
    throw new ResumeAnalysisError("summary must be a non-empty string", 502);
  }

  if (!Array.isArray(analysis.missing_skills)) {
    throw new ResumeAnalysisError("missing_skills must be an array", 502);
  }

  if (!Array.isArray(analysis.critical_feedback)) {
    throw new ResumeAnalysisError("critical_feedback must be an array", 502);
  }

  return {
    overall_score: overallScore,
    breakdown: {
      impact_and_metrics: breakdownRecord.impact_and_metrics as number,
      experience_and_progression: breakdownRecord.experience_and_progression as number,
      skills_match_and_depth: breakdownRecord.skills_match_and_depth as number,
      formatting_and_structure: breakdownRecord.formatting_and_structure as number,
    },
    summary: String(analysis.summary).trim(),
    missing_skills: (analysis.missing_skills as unknown[]).filter((item): item is string => typeof item === "string"),
    critical_feedback: (analysis.critical_feedback as unknown[]).filter((item): item is string => typeof item === "string"),
  };
}

function extractJsonPayload(rawText: string): unknown {
  const trimmed = rawText.trim();
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new ResumeAnalysisError("The AI response did not include valid JSON", 502);
  }

  const candidate = trimmed.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(candidate);
  } catch {
    throw new ResumeAnalysisError("The AI response could not be parsed as JSON", 502);
  }
}

async function callGroqForAnalysis(resumeText: string): Promise<ResumeAnalysisResponse> {
  const client = getGroqClient();
  const userPrompt = `Analyze the following resume.\n\nResume:\n${resumeText}`;

  const response = await client.chat.completions.create({
    model: MODEL,
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  });

  const content = response.choices[0]?.message?.content ?? "";
  if (!content) {
    throw new ResumeAnalysisError("The AI service returned an empty response", 502);
  }

  const parsed = extractJsonPayload(content);
  return validateAnalysisPayload(parsed);
}

export async function analyzeResume(resumeText: unknown): Promise<ResumeAnalysisResponse> {
  const normalizedResumeText = validateResumeText(resumeText);

  let attempt = 0;
  while (attempt < MAX_RETRY_ATTEMPTS) {
    try {
      return await callGroqForAnalysis(normalizedResumeText.slice(0, MAX_RESUME_CHARS));
    } catch (error) {
      attempt += 1;
      if (attempt >= MAX_RETRY_ATTEMPTS) {
        if (error instanceof ResumeAnalysisError) {
          throw error;
        }

        throw new ResumeAnalysisError("Groq resume analysis failed", 502, error);
      }
    }
  }

  throw new ResumeAnalysisError("Groq resume analysis failed after retry", 502);
}
