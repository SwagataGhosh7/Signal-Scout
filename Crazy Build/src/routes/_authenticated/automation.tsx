import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Workflow,
  Radar,
  Brain,
  Zap,
  Mail,
  Building2,
  Bell,
  ArrowRight,
  Settings2,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Play,
  History,
  Info,
} from "lucide-react";
import { Badge } from "./app";

export const Route = createFileRoute("/_authenticated/automation")({
  component: AutomationPage,
});

interface WorkflowNode {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
  desc: string;
  config: Record<string, string | number | boolean>;
}

const INITIAL_NODES: WorkflowNode[] = [
  {
    id: "scantargets",
    label: "Signal Scraped",
    icon: Radar,
    enabled: true,
    desc: "Agent swarm scrapes LinkedIn, jobs, news and X daily.",
    config: { freq: "Daily", min_confidence: 70 },
  },
  {
    id: "geminianalyze",
    label: "Intent Analysis Agent",
    icon: Brain,
    enabled: true,
    desc: "Gemini models evaluate intent categories & urgency.",
    config: { model: "Gemini 3.5 Flash", buying_intent: true, hiring_intent: true },
  },
  {
    id: "prioritizelead",
    label: "Lead Prioritizer",
    icon: Zap,
    enabled: true,
    desc: "Lead score threshold filters qualified prospects.",
    config: { min_score: 65, deal_size_est: true },
  },
  {
    id: "outreachdraft",
    label: "Outreach Draft",
    icon: Mail,
    enabled: true,
    desc: "AI auto-generates personalized emails for sales reps.",
    config: { tone: "Professional", cta: "15 min intro chat", auto_send: false },
  },
  {
    id: "crmsync",
    label: "CRM Sync & Alert",
    icon: Building2,
    enabled: true,
    desc: "Create Deal inside CRM & send notification.",
    config: {
      provider: "HubSpot",
      slack_alerts: true,
      webhook: "https://hooks.slack.com/services/...",
    },
  },
];

const RUN_HISTORY = [
  {
    time: "Just now",
    target: "Supabase",
    action: "Lead Sync",
    result: "Synced as CRM Deal #421",
    status: "success",
  },
  {
    time: "2 hours ago",
    target: "Vercel",
    action: "Outreach Draft",
    result: "Email drafted (Executive tone)",
    status: "success",
  },
  {
    time: "4 hours ago",
    target: "Stripe",
    action: "Lead Score",
    result: "Score calculated: 92 (Critical)",
    status: "success",
  },
  {
    time: "Yesterday",
    target: "Retool",
    action: "Signal Harvest",
    result: "Harvested 4 expansion signals",
    status: "success",
  },
];

function AutomationPage() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("prioritizelead");
  const [isRunning, setIsRunning] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const handleToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes(nodes.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)));
    const n = nodes.find((x) => x.id === id);
    if (n) {
      toast.info(`${n.label} auto-step ${n.enabled ? "disabled" : "enabled"}`);
    }
  };

  const updateConfig = (key: string, value: string | number | boolean) => {
    setNodes(
      nodes.map((n) =>
        n.id === selectedNodeId ? { ...n, config: { ...n.config, [key]: value } } : n,
      ),
    );
  };

  const triggerPipeline = () => {
    setIsRunning(true);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Running agentic pipeline scan...",
      success: () => {
        setIsRunning(false);
        return "Workflow run complete. Scanned targets, drafted emails, and updated CRM dashboards.";
      },
      error: "Pipeline error",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">AI Agent Workflows</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Automation Engine</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure agent swarms, set lead score filters, and control how leads flow to the CRM.
          </p>
        </div>
        <button
          onClick={triggerPipeline}
          disabled={isRunning}
          className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow hover:opacity-90 disabled:opacity-50"
        >
          <Play className="h-4 w-4" /> Run Workflow
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Interactive Visual Builder Canvas */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card/60 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-sm">Visual Workflow Pipeline</h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5" /> Tap nodes to configure options
              </div>
            </div>

            {/* Vertical/Horizontal Flow Stack */}
            <div className="flex flex-col items-center py-4 space-y-6">
              {nodes.map((n, index) => {
                const Icon = n.icon;
                const active = n.id === selectedNodeId;
                return (
                  <div key={n.id} className="w-full flex flex-col items-center">
                    {/* Node Card */}
                    <div
                      onClick={() => setSelectedNodeId(n.id)}
                      className={`relative w-full max-w-md rounded-2xl border p-4 cursor-pointer transition flex items-center justify-between ${
                        active
                          ? "border-primary bg-primary/10 glow"
                          : n.enabled
                            ? "border-border bg-background/50 hover:border-border/80"
                            : "border-border/30 bg-muted/5 opacity-55 hover:opacity-80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-9 w-9 place-items-center rounded-lg border ${
                            active
                              ? "bg-primary/20 border-primary text-primary"
                              : n.enabled
                                ? "bg-muted border-border/80 text-foreground"
                                : "bg-muted/30 border-border/30 text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium text-xs text-foreground flex items-center gap-1.5">
                            {n.label}
                            {n.enabled ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                            )}
                          </h4>
                          <p className="text-[11px] text-muted-foreground">{n.desc}</p>
                        </div>
                      </div>

                      {/* Enable Switch */}
                      <button
                        onClick={(e) => handleToggle(n.id, e)}
                        className="text-muted-foreground hover:text-foreground transition"
                      >
                        {n.enabled ? (
                          <ToggleRight className="h-6 w-6 text-primary" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-muted-foreground/60" />
                        )}
                      </button>

                      {/* Small number indicator */}
                      <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground bg-card border border-border h-5 w-5 rounded-full flex items-center justify-center shadow">
                        {index + 1}
                      </span>
                    </div>

                    {/* Flow arrow (not showing for last node) */}
                    {index !== nodes.length - 1 && (
                      <div className="my-2 flex flex-col items-center">
                        <div className="h-4.5 w-0.5 bg-gradient-to-b from-primary to-border/30 animate-pulse" />
                        <ArrowRight className="h-3.5 w-3.5 rotate-90 text-primary -mt-1" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border/40 pt-4 flex justify-between items-center text-xs text-muted-foreground">
            <span>
              Workflow Status: <span className="text-success font-semibold">Active Swarm</span>
            </span>
            <span>Total Nodes: 5</span>
          </div>
        </div>

        {/* Configuration Side-Panel & Activity History */}
        <div className="space-y-4">
          {/* Node Config */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/40 pb-3">
              <Settings2 className="h-4.5 w-4.5 text-primary" />
              <h3 className="font-semibold text-sm">Configure: {selectedNode.label}</h3>
            </div>

            <div className="space-y-3">
              {selectedNode.id === "scantargets" && (
                <>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase font-mono block mb-1">
                      Scan Frequency
                    </label>
                    <select
                      value={selectedNode.config.freq as string}
                      onChange={(e) => updateConfig("freq", e.target.value)}
                      className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs"
                    >
                      <option value="Real-time">Continuous Swarm (Premium)</option>
                      <option value="Hourly">Hourly Intervals</option>
                      <option value="Daily">Daily Routine Scans</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase font-mono block mb-1">
                      Min Confidence Score ({selectedNode.config.min_confidence}%)
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={selectedNode.config.min_confidence as number}
                      onChange={(e) => updateConfig("min_confidence", parseInt(e.target.value))}
                      className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </>
              )}

              {selectedNode.id === "geminianalyze" && (
                <>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase font-mono block mb-1">
                      AI Processor
                    </label>
                    <select
                      value={selectedNode.config.model as string}
                      onChange={(e) => updateConfig("model", e.target.value)}
                      className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs"
                    >
                      <option value="Gemini 3.5 Flash">Gemini 3.5 Flash (Primary)</option>
                      <option value="Llama 3.3 (Groq)">Llama 3.3 Versatile (Groq)</option>
                      <option value="OpenAI GPT-4o">OpenAI Compatible (GPT-4o)</option>
                    </select>
                  </div>
                  <div className="space-y-1 pt-1 text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="buy"
                        checked={selectedNode.config.buying_intent as boolean}
                        onChange={(e) => updateConfig("buying_intent", e.target.checked)}
                      />
                      <label htmlFor="buy" className="text-muted-foreground">
                        Extract buying intent signals
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hire"
                        checked={selectedNode.config.hiring_intent as boolean}
                        onChange={(e) => updateConfig("hiring_intent", e.target.checked)}
                      />
                      <label htmlFor="hire" className="text-muted-foreground">
                        Extract hiring intent signals
                      </label>
                    </div>
                  </div>
                </>
              )}

              {selectedNode.id === "prioritizelead" && (
                <>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase font-mono block mb-1">
                      Qualifying Threshold Score ({selectedNode.config.min_score})
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      value={selectedNode.config.min_score as number}
                      onChange={(e) => updateConfig("min_score", parseInt(e.target.value))}
                      className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>Low Filters</span>
                      <span>High Threshold</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <input
                      type="checkbox"
                      id="est"
                      checked={selectedNode.config.deal_size_est as boolean}
                      onChange={(e) => updateConfig("deal_size_est", e.target.checked)}
                    />
                    <label htmlFor="est" className="text-muted-foreground">
                      Auto-estimate deal values
                    </label>
                  </div>
                </>
              )}

              {selectedNode.id === "outreachdraft" && (
                <>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase font-mono block mb-1">
                      Default Template Persona
                    </label>
                    <select
                      value={selectedNode.config.tone as string}
                      onChange={(e) => updateConfig("tone", e.target.value)}
                      className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs"
                    >
                      <option value="Professional">Professional Corporate</option>
                      <option value="Friendly">Friendly SaaS Founder</option>
                      <option value="Executive">Executive Briefing</option>
                      <option value="Startup">Bold Startup Pitch</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase font-mono block mb-1">
                      Call to Action (CTA)
                    </label>
                    <input
                      value={selectedNode.config.cta as string}
                      onChange={(e) => updateConfig("cta", e.target.value)}
                      className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </>
              )}

              {selectedNode.id === "crmsync" && (
                <>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase font-mono block mb-1">
                      Sync Target CRM
                    </label>
                    <select
                      value={selectedNode.config.provider as string}
                      onChange={(e) => updateConfig("provider", e.target.value)}
                      className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs"
                    >
                      <option value="HubSpot">HubSpot CRM</option>
                      <option value="Salesforce">Salesforce CRM</option>
                      <option value="Zoho">Zoho CRM</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground uppercase font-mono block mb-1">
                      Slack Alerts Webhook URL
                    </label>
                    <input
                      value={selectedNode.config.webhook as string}
                      onChange={(e) => updateConfig("webhook", e.target.value)}
                      className="w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs outline-none focus:border-primary text-muted-foreground"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => toast.success("Configuration successfully updated.")}
              className="w-full rounded-md bg-muted hover:bg-accent border border-border px-3 py-2 text-xs font-semibold"
            >
              Apply Settings
            </button>
          </div>

          {/* Execution History */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-border/40 pb-3">
              <History className="h-4.5 w-4.5 text-primary" />
              <h3 className="font-semibold text-sm">Execution History</h3>
            </div>

            <div className="divide-y divide-border/40">
              {RUN_HISTORY.map((h, index) => (
                <div key={index} className="py-2.5 flex items-start justify-between gap-2 text-xs">
                  <div className="min-w-0">
                    <div className="font-medium text-foreground flex items-center gap-1.5">
                      {h.action} · <span className="text-primary">{h.target}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{h.result}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] text-muted-foreground block">{h.time}</span>
                    <span className="inline-block mt-0.5 text-[8px] uppercase tracking-wider font-semibold font-mono text-success bg-success/10 px-1 rounded border border-success/30">
                      {h.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
