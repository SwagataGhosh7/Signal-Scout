import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock3,
  DollarSign,
  Download,
  FileText,
  GraduationCap,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { DepthLayer, TiltCard, ParallaxField } from "@/components/depth-system";

export const Route = createFileRoute("/_authenticated/hiring")({
  component: HiringPage,
});

const candidatePool = [
  {
    id: 1,
    name: "Maya Patel",
    role: "Senior React Engineer",
    location: "Remote · US",
    match: 96,
    scoreLabel: "Excellent",
    experience: "7 yrs",
    skills: ["React", "TypeScript", "LLM", "GraphQL"],
    summary: "Led AI-assisted product teams and shipped multilingual onboarding flows.",
  },
  {
    id: 2,
    name: "Daniel Kim",
    role: "LLM Engineer",
    location: "New York · Hybrid",
    match: 92,
    scoreLabel: "Excellent",
    experience: "6 yrs",
    skills: ["Python", "PyTorch", "RAG", "LangChain"],
    summary:
      "Built production retrieval pipelines and evaluation harnesses for enterprise copilots.",
  },
  {
    id: 3,
    name: "Sofia Alvarez",
    role: "AI Researcher",
    location: "San Francisco · On-site",
    match: 88,
    scoreLabel: "Strong",
    experience: "8 yrs",
    skills: ["ML", "Transformers", "Research", "Publishing"],
    summary: "Published benchmark work on multimodal reasoning and open-source model evals.",
  },
];

const recommendationCards = [
  {
    title: "Best Fit",
    detail: "Maya Patel aligns with product-led AI engineering and strong React leadership.",
  },
  {
    title: "Fastest Learner",
    detail:
      "Sofia Alvarez shows rapid model experimentation velocity and strong mentorship signals.",
  },
  {
    title: "Future Leader",
    detail:
      "Daniel Kim combines deep LLM systems knowledge with strong cross-functional influence.",
  },
];

const skillDistribution = [
  { name: "React", value: 72 },
  { name: "Python", value: 68 },
  { name: "LLMs", value: 81 },
  { name: "Cloud", value: 57 },
  { name: "Data", value: 64 },
];

const readinessProfile = [
  { subject: "Tech", score: 92 },
  { subject: "Leadership", score: 84 },
  { subject: "Communication", score: 88 },
  { subject: "Growth", score: 90 },
  { subject: "Culture", score: 78 },
];

const interviewQuestions = [
  {
    type: "Technical",
    question:
      "Design a retrieval layer that keeps LLM answers grounded with real-time product data.",
  },
  {
    type: "Behavioral",
    question:
      "Describe how you handled a difficult cross-functional launch with unclear ownership.",
  },
  {
    type: "LLM",
    question:
      "How would you evaluate prompt quality, hallucination rate, and tool-call reliability?",
  },
];

const hiringTrend = [
  { month: "Apr", reviewed: 24, shortlisted: 10 },
  { month: "May", reviewed: 38, shortlisted: 16 },
  { month: "Jun", reviewed: 46, shortlisted: 22 },
  { month: "Jul", reviewed: 58, shortlisted: 31 },
];

function HiringPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            Enterprise Talent Intelligence
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            AI Talent Intelligence & Hiring Agent
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Discover, evaluate, and prioritize elite candidates with authorized data sources, Gemini
            3 Flash scoring, and recruiter-ready interview plans.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          <span>Authorized data only · Gemini 3 Flash analysis</span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <MetricCard
          title="Candidates Reviewed"
          value="128"
          hint="+18 this week"
          icon={Users}
          accent="text-primary"
        />
        <MetricCard
          title="Average Match Score"
          value="91.4"
          hint="Across active roles"
          icon={TrendingUp}
          accent="text-success"
        />
        <MetricCard
          title="Top Skills"
          value="LLMs / React"
          hint="Most in-demand"
          icon={Brain}
          accent="text-intent"
        />
        <MetricCard
          title="Hiring Funnel"
          value="31"
          hint="Shortlisted this month"
          icon={Briefcase}
          accent="text-warning"
        />
      </div>

      <ParallaxField className="space-y-6">
        <DepthLayer className="rounded-2xl p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-sm font-semibold">AI Talent Search</h2>
              <p className="text-xs text-muted-foreground">
                Run role-aware talent queries with skills, experience, salary, and location filters.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Senior React Developer", "LLM Engineer", "AI Researcher", "Prompt Engineer"].map(
                (query) => (
                  <button
                    key={query}
                    className="rounded-full border border-border bg-background/50 px-3 py-1 text-[11px] text-muted-foreground transition hover:bg-accent"
                  >
                    {query}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border/70 bg-background/50 p-3 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border/70 bg-background/70 px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value="Senior React Developer"
                readOnly
                className="w-full bg-transparent text-sm text-foreground outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterChip label="Remote" />
              <FilterChip label="7+ yrs" />
              <FilterChip label="$180k+" />
              <FilterChip label="LLM / React" />
            </div>
          </div>
        </DepthLayer>

        <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
          <DepthLayer className="rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Candidate Pipeline</h2>
                <p className="text-xs text-muted-foreground">
                  Ranked candidates with AI match scoring, skill fit, and growth potential.
                </p>
              </div>
              <div className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Top 10 Ranked
              </div>
            </div>

            <div className="space-y-3">
              {candidatePool.map((candidate) => (
                <TiltCard
                  key={candidate.id}
                  intensity="dense"
                  className="rounded-2xl border border-border/60 bg-background/40 p-4"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                        <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-success">
                          {candidate.scoreLabel}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{candidate.role}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {candidate.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock3 className="h-3 w-3" />
                          {candidate.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          $185k
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl border border-border/70 bg-card/60 px-3 py-2 text-right">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        AI Match
                      </div>
                      <div className="font-mono text-xl font-semibold text-primary">
                        {candidate.match}
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">{candidate.summary}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[10px] text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </DepthLayer>

          <DepthLayer className="rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">AI Recommendations</h2>
                <p className="text-xs text-muted-foreground">
                  Signals that matter when recruiters decide who to advance.
                </p>
              </div>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-3">
              {recommendationCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-border/70 bg-background/50 p-3"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {card.title}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{card.detail}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Zap className="h-4 w-4 text-primary" />
                Suggested action
              </div>
              <p className="mt-2">
                Schedule interviews with Maya and Daniel this afternoon and prepare a structured LLM
                evaluation kit.
              </p>
            </div>
          </DepthLayer>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <DepthLayer className="rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Resume Intelligence</h2>
                <p className="text-xs text-muted-foreground">
                  Upload a PDF or DOCX to extract, summarize, and compare against the role.
                </p>
              </div>
              <button className="rounded-full border border-border bg-background/50 px-3 py-1 text-[11px] text-muted-foreground transition hover:bg-accent">
                Upload Resume
              </button>
            </div>

            <div className="rounded-xl border border-dashed border-border/70 bg-background/50 p-4 text-center text-sm text-muted-foreground">
              <FileText className="mx-auto mb-2 h-6 w-6 text-primary" />
              Drag a resume here or use the upload action to extract insights instantly.
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-border/70 bg-background/50 p-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Summary
                </div>
                <p className="mt-2 text-sm text-foreground">
                  Strong product engineering profile with leadership, stable delivery history, and
                  proven ML experimentation.
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/50 p-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Missing Skills
                </div>
                <p className="mt-2 text-sm text-foreground">
                  Fine-tune on distributed systems, search ranking, and enterprise deployment
                  experience.
                </p>
              </div>
            </div>
          </DepthLayer>

          <DepthLayer className="rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Interview Assistant</h2>
                <p className="text-xs text-muted-foreground">
                  Generate technical, behavioral, and LLM-specific questions instantly.
                </p>
              </div>
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-2">
              {interviewQuestions.map((item) => (
                <div
                  key={item.type}
                  className="rounded-xl border border-border/70 bg-background/50 p-3"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {item.type}
                  </div>
                  <p className="mt-2 text-sm text-foreground">{item.question}</p>
                </div>
              ))}
            </div>
          </DepthLayer>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <DepthLayer className="rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Hiring Analytics</h2>
                <p className="text-xs text-muted-foreground">
                  Monitor candidate volume, shortlist velocity, and skill demand over time.
                </p>
              </div>
              <Download className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hiringTrend}>
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="reviewed"
                    stroke="var(--primary)"
                    fill="rgba(99,102,241,0.18)"
                  />
                  <Area
                    type="monotone"
                    dataKey="shortlisted"
                    stroke="var(--success)"
                    fill="rgba(16,185,129,0.16)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </DepthLayer>

          <DepthLayer className="rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Skills Intelligence</h2>
                <p className="text-xs text-muted-foreground">
                  A quick view of the strongest emerging skill clusters.
                </p>
              </div>
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillDistribution}>
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" fontSize={10} />
                  <YAxis stroke="rgba(255,255,255,0.45)" fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/50 p-3">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Readiness Profile
              </div>
              <div className="mt-3 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={readinessProfile}>
                    <PolarGrid stroke="rgba(255,255,255,0.12)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 10, fill: "rgba(255,255,255,0.7)" }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar dataKey="score" stroke="var(--primary)" fill="rgba(99,102,241,0.25)" />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </DepthLayer>
        </div>

        <DepthLayer className="rounded-2xl p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-sm font-semibold">AI Awgataot</h2>
              <p className="text-xs text-muted-foreground">
                Ask the recruiter assistant for ranking, comparisons, interview plans, or resume
                summaries.
              </p>
            </div>
            <div className="rounded-full border border-border bg-background/50 px-3 py-1 text-[11px] text-muted-foreground">
              Example prompts: “Find the best LLM Engineer”
            </div>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-2">
              {[
                "Find the best LLM Engineer",
                "Compare Candidate A vs Candidate B",
                "Generate interview questions",
                "Summarize this resume",
              ].map((prompt) => (
                <button
                  key={prompt}
                  className="flex w-full items-center justify-between rounded-xl border border-border/70 bg-background/50 px-3 py-2 text-left text-sm text-foreground transition hover:bg-accent"
                >
                  <span>{prompt}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Current Recommendation
              </div>
              <p className="mt-2 text-sm text-foreground">
                Maya Patel is the best fit for the hiring mandate based on React leadership, strong
                AI product experience, and strong communication signals.
              </p>
            </div>
          </div>
        </DepthLayer>
      </ParallaxField>
    </div>
  );
}

function MetricCard({
  title,
  value,
  hint,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <TiltCard intensity="dense" className="rounded-2xl border border-border/60 bg-card/50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </span>
        <div className={`rounded-lg bg-background/60 p-2 ${accent}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-mono text-2xl font-semibold text-foreground">{value}</div>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </TiltCard>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
      {label}
    </span>
  );
}
