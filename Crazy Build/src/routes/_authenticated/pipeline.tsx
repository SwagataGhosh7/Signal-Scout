import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Network,
  Radar,
  Brain,
  Zap,
  Mail,
  Activity,
  Play,
  Terminal,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { Badge } from "./app";
import { DepthLayer, ParallaxField, TiltCard } from "@/components/depth-system";

export const Route = createFileRoute("/_authenticated/pipeline")({
  component: PipelinePage,
});

interface PipelineStage {
  step: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  tasks: string[];
  output: string;
}

const STAGES: PipelineStage[] = [
  {
    step: "01",
    title: "Signal Collection Agent",
    icon: Radar,
    color: "border-sky-500 bg-sky-500/5 text-sky-400 glow-sky",
    tasks: [
      "LinkedIn scraping",
      "Twitter/X posts",
      "crunchbase funding",
      "jobs boards scan",
      "website changelogs",
    ],
    output: "Raw text data & URLs",
  },
  {
    step: "02",
    title: "Intent Analysis Agent",
    icon: Brain,
    color: "border-violet-500 bg-violet-500/5 text-violet-400 glow-violet",
    tasks: [
      "Buying / Hiring intent",
      "Partnership signals",
      "Expansion flags",
      "Creator collab checks",
      "Urgency index",
    ],
    output: "Intent flags & reasoning",
  },
  {
    step: "03",
    title: "Prioritization Agent",
    icon: Zap,
    color: "border-amber-500 bg-amber-500/5 text-amber-400 glow-amber",
    tasks: [
      "Lead scoring (0-100)",
      "Convert probability",
      "Urgency verification",
      "Deal size estimation",
    ],
    output: "Qualified B2B scores",
  },
  {
    step: "04",
    title: "Automation Agent",
    icon: Mail,
    color: "border-emerald-500 bg-emerald-500/5 text-emerald-400 glow-emerald",
    tasks: [
      "Outbound email drafts",
      "LinkedIn InMails",
      "CRM deal entries",
      "Slack team notifications",
    ],
    output: "Personalized outbound drafts",
  },
  {
    step: "05",
    title: "Intelligence Dashboard",
    icon: Activity,
    color: "border-fuchsia-500 bg-fuchsia-500/5 text-fuchsia-400 glow-fuchsia",
    tasks: [
      "Opportunity heatmaps",
      "Funnel charts",
      "Pipeline velocities",
      "Stakeholder PDF reports",
    ],
    output: "Interactive visuals",
  },
];

const SIMULATION_LOGS = [
  { step: 0, text: "Initializing Signal Scout swarm on target entities..." },
  { step: 0, text: "Scan queued: LinkedIn API & news portals matching ICP parameters." },
  { step: 1, text: "LinkedIn: Detected new VP Hiring at Supabase. Job ID: jobs-991." },
  { step: 1, text: "Crunchbase: Vercel announced $40M Series C funding." },
  { step: 2, text: "Analyzing Vercel funding: 'Buying Intent' computed as HIGH. score: 92." },
  { step: 2, text: "Analyzing Supabase hiring: 'Hiring Intent' computed as MEDIUM. score: 74." },
  {
    step: 3,
    text: "Prioritizing leads: Vercel score = 92 (CRITICAL). Estimated deal size: $1,380.",
  },
  { step: 3, text: "Prioritizing leads: Supabase score = 74 (HIGH). Estimated deal size: $1,110." },
  { step: 4, text: "Automation: Outbound cold-email drafted for Vercel CEO (Executive Tone)." },
  {
    step: 4,
    text: "CRM: HubSpot deal record inserted for Vercel Series C. Stage: Appointment Scheduled.",
  },
  { step: 5, text: "Dashboard metrics: Sync complete. Signal trends refreshed." },
];

function PipelinePage() {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const startSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setCurrentStep(0);

    // Simulating sequential log entries
    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < SIMULATION_LOGS.length) {
        const item = SIMULATION_LOGS[logIdx];
        setCurrentStep(item.step);
        setLogs((prev) => [...prev, `[Agent] ${item.text}`]);
        logIdx++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setCurrentStep(null);
        toast.success("AI pipeline simulation completed successfully!");
      }
    }, 1000);
  };

  return (
    <ParallaxField className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">
            Agentic Workflow Topology
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI Pipeline Architecture</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Understand how our autonomous agent swarm scrapes signals, classifies intent,
            prioritizes hot deals, and triggers actions.
          </p>
        </div>
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className="depth-press flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow hover:opacity-90 disabled:opacity-50"
        >
          <Play className="h-4 w-4" /> {isRunning ? "Running..." : "Simulate Pipeline"}
        </button>
      </div>

      {/* Horizontal Pipeline Diagram */}
      <DepthLayer className="rounded-2xl p-6 overflow-x-auto">
        <h3 className="font-semibold text-sm mb-6 text-left">Topology View</h3>

        <div className="flex items-start gap-4 min-w-[1000px] justify-between relative py-4">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            const stepNum = idx;
            const active = currentStep === stepNum;
            const completed = currentStep !== null && currentStep > stepNum;

            return (
              <div key={s.step} className="flex-1 flex items-start relative z-10">
                {/* Node Container */}
                <TiltCard
                  intensity="dense"
                  className={`w-full rounded-2xl p-4 transition-all duration-300 ${
                    active
                      ? `${s.color} ring-2 ring-primary border-primary scale-105`
                      : completed
                        ? "border-primary/40 bg-background/40 opacity-90"
                        : "border-border/60 bg-background/20 opacity-80"
                  }`}
                >
                  {/* Step / Icon header */}
                  <div className="flex items-center justify-between border-b border-border/40 pb-2.5 mb-2.5">
                    <span className="font-mono text-xs font-semibold text-muted-foreground">
                      STAGE {s.step}
                    </span>
                    <div
                      className={`p-1.5 rounded-md ${active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h4 className="font-semibold text-xs text-foreground text-left">{s.title}</h4>

                  {/* Tasks List */}
                  <ul className="mt-3.5 space-y-1.5 text-left">
                    {s.tasks.map((t) => (
                      <li
                        key={t}
                        className="text-[10px] text-muted-foreground flex items-center gap-1"
                      >
                        <span
                          className={`h-1 w-1 rounded-full ${active ? "bg-primary animate-ping" : "bg-muted"}`}
                        />
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Output field */}
                  <div className="mt-4 border-t border-border/40 pt-2 text-[9px] text-muted-foreground flex items-center justify-between">
                    <span>Produces:</span>
                    <span className="font-semibold font-mono text-foreground text-[8px] uppercase tracking-wider bg-muted px-1.5 py-0.5 rounded">
                      {s.output}
                    </span>
                  </div>
                </TiltCard>

                {/* Animated Connector Arrow (hide on last item) */}
                {idx !== STAGES.length - 1 && (
                  <div className="absolute top-1/2 left-[calc(100%-8px)] -translate-y-1/2 w-6 flex items-center justify-center shrink-0">
                    <ArrowRight
                      className={`h-4 w-4 ${
                        active
                          ? "text-primary animate-pulse"
                          : completed
                            ? "text-primary/70"
                            : "text-muted-foreground/30"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </DepthLayer>

      {/* Simulator logs panel */}
      <DepthLayer className="rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4.5 w-4.5 text-primary" />
            <h3 className="font-semibold text-sm">Agent Communication Terminal</h3>
          </div>
          <Badge>{isRunning ? "simulation active" : "idle"}</Badge>
        </div>

        {/* Log window */}
        <div className="bg-background/80 rounded-xl border border-border/80 p-4 font-mono text-xs text-left h-64 overflow-y-auto space-y-2">
          {logs.length === 0 ? (
            <div className="text-muted-foreground text-center pt-24">
              Click "Simulate Pipeline" above to visualize AI Agent communications.
            </div>
          ) : (
            logs.map((l, i) => (
              <div
                key={i}
                className="text-muted-foreground hover:text-foreground transition duration-150"
              >
                <span className="text-primary mr-2">&gt;&gt;</span>
                {l}
              </div>
            ))
          )}
        </div>

        <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> Pipeline is secure and GDPR/SOC-2
            compliant
          </span>
          <span>Simulation Speed: 1.0s/step</span>
        </div>
      </DepthLayer>
    </ParallaxField>
  );
}
