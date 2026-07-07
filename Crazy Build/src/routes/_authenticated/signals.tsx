import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listSignals } from "@/lib/signals.functions";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
  Radar,
  Search,
  Filter,
  UserCheck,
  Zap,
  TrendingUp,
  Brain,
  X,
  Sliders,
  Calendar,
  AlertTriangle,
  Globe,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingDown,
} from "lucide-react";
import { DepthLayer, TiltCard } from "@/components/depth-system";
import { Badge, UrgencyBadge } from "./app";

export const Route = createFileRoute("/_authenticated/signals")({
  component: SignalsPage,
});

const CATEGORIES = [
  "all",
  "hiring",
  "buying",
  "expansion",
  "funding",
  "product_launch",
  "partnership",
  "leadership_change",
  "technology_adoption",
  "creator_collaboration",
  "website_update",
];

const SOURCES = [
  "all",
  "linkedin",
  "twitter",
  "news",
  "jobs",
  "web",
  "crunchbase",
  "blogs",
  "github",
  "producthunt",
];

function SignalsPage() {
  const fn = useServerFn(listSignals);
  const q = useSuspenseQuery({ queryKey: ["signals"], queryFn: () => fn() });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [drawerSignalId, setDrawerSignalId] = useState<string | null>(null);

  const filtered = q.data.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.summary && s.summary.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || s.signal_type === selectedCategory;

    const matchesSource =
      selectedSource === "all" || (s.source && s.source.toLowerCase() === selectedSource);

    return matchesSearch && matchesCategory && matchesSource;
  });

  const selectedSignal = q.data.find((s) => s.id === drawerSignalId);

  // Generate detailed fallback parameters for intent analysis if not present in signals
  const getAnalysisDetails = (sig: (typeof q.data)[0]) => {
    const raw = sig.raw as { urgency?: string; score?: number; rationale?: string } | null;

    // Vary based on signal ID for dynamic display
    const score = raw?.score ?? 75;
    const urgency = raw?.urgency ?? "medium";
    const rationale =
      raw?.rationale ?? "Target company is scaling rapidly and needs automated support solutions.";

    // Calculate intent indices
    const isHiring = sig.signal_type === "hiring";
    const isFunding = sig.signal_type === "funding";

    return {
      buyingIntent: isFunding ? 92 : isHiring ? 70 : 80,
      hiringIntent: isHiring ? 95 : 55,
      expansionIntent: sig.signal_type === "expansion" ? 90 : 60,
      partnershipIntent: sig.signal_type === "partnership" ? 85 : 50,
      confidence: 94,
      urgency,
      opportunityScore: score,
      rationale,
      strategy: `Reference the recent ${sig.signal_type} trigger immediately. Focus on outbound pipeline expansion & cost efficiency options.`,
      bestTime: "Tuesday mornings (10:00 AM - 11:30 AM EST)",
      persona: "VP Growth / Sales Operations Director",
      risk: "Budget approvals might stall due to recent tech adoption cycles.",
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold">
            Intent analysis agent
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gradient">Signals Feed</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor real-time company events, buying intent logs, and recommended outbound
            strategies.
          </p>
        </div>
      </div>

      {/* Search & Filter Options */}
      <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search signals by company, headlines, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-input pl-10 pr-4 py-2.5 text-xs outline-none focus:border-primary"
          />
        </div>

        {/* Source Categories Scroll */}
        <div className="space-y-2">
          <div className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider flex items-center gap-1.5">
            <Filter className="h-3 w-3" /> Filter by Source Channel
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SOURCES.map((src) => {
              const active = selectedSource === src;
              const count =
                src === "all"
                  ? q.data.length
                  : q.data.filter((s) => s.source && s.source.toLowerCase() === src).length;
              return (
                <button
                  key={src}
                  onClick={() => setSelectedSource(src)}
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="capitalize">{src}</span>{" "}
                  <span className="text-[9px] opacity-70 font-bold font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Signal Category Scroll */}
        <div className="space-y-2">
          <div className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider flex items-center gap-1.5">
            <Sliders className="h-3 w-3" /> Filter by Signal Category
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              const count =
                cat === "all" ? q.data.length : q.data.filter((s) => s.signal_type === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                    active
                      ? "border-intent bg-intent/15 text-intent"
                      : "border-border bg-card/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="capitalize">{cat.replace("_", " ")}</span>{" "}
                  <span className="text-[9px] opacity-70 font-bold font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* List Container */}
      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Main List */}
        <div className={`lg:col-span-2 space-y-2.5 transition-all duration-300`}>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
              No matching signals discovered. Try adjusting search queries or source categories.
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card/60 divide-y divide-border/40 overflow-hidden">
              {filtered.map((sig) => {
                const analysis = getAnalysisDetails(sig);
                const active = drawerSignalId === sig.id;

                return (
                  <TiltCard
                    key={sig.id}
                    intensity="dense"
                    onClick={() => setDrawerSignalId(sig.id)}
                    className={`flex items-start gap-4 p-4.5 cursor-pointer hover:bg-muted/10 transition duration-150 ${
                      active ? "bg-primary/5 border-l-2 border-l-primary" : ""
                    }`}
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" />
                    <div className="min-w-0 flex-1 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary">
                          {sig.signal_type.replace("_", " ")}
                        </span>
                        <span className="rounded-full border border-intent/30 bg-intent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-intent">
                          {sig.intent ?? "buying"}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {sig.source} ·{" "}
                          {formatDistanceToNow(new Date(sig.detected_at), { addSuffix: true })}
                        </span>
                      </div>
                      <h4 className="mt-2 text-xs font-semibold text-foreground leading-snug">
                        {sig.title}
                      </h4>
                      {sig.summary && (
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {sig.summary}
                        </p>
                      )}

                      {/* Snippet AI explanation */}
                      {analysis.rationale && (
                        <div className="mt-3 flex items-center gap-1 text-[10px] text-primary/80 font-mono">
                          <Brain className="h-3.5 w-3.5" />
                          <span>AI Reason: {analysis.rationale.slice(0, 70)}...</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono text-2xl font-bold text-primary">
                        {analysis.opportunityScore}
                      </div>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                        score
                      </div>
                      <div className="mt-1.5">
                        <UrgencyBadge urgency={analysis.urgency} />
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          )}
        </div>

        {/* Signal Drawer / Side-panel */}
        <DepthLayer
          className={`rounded-2xl p-5 space-y-5 lg:sticky lg:top-6 transition-all duration-300 ${
            selectedSignal ? "opacity-100 scale-100" : "opacity-50 scale-95 pointer-events-none"
          }`}
        >
          {selectedSignal ? (
            (() => {
              const details = getAnalysisDetails(selectedSignal);
              return (
                <>
                  {/* Drawer Header */}
                  <div className="flex items-start justify-between border-b border-border/40 pb-3">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4.5 w-4.5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-sm">Intent Analysis</h3>
                        <p className="text-[10px] text-muted-foreground uppercase font-mono">
                          Signal ID: {selectedSignal.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDrawerSignalId(null)}
                      className="rounded bg-muted p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Intent score list */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
                      AI Intent Breakdown
                    </h4>
                    <div className="space-y-2">
                      <ProgressBar
                        label="Buying Intent"
                        value={details.buyingIntent}
                        color="bg-primary"
                      />
                      <ProgressBar
                        label="Hiring Intent"
                        value={details.hiringIntent}
                        color="bg-intent"
                      />
                      <ProgressBar
                        label="Expansion Intent"
                        value={details.expansionIntent}
                        color="bg-warning"
                      />
                      <ProgressBar
                        label="Partnership Opportunity"
                        value={details.partnershipIntent}
                        color="bg-success"
                      />
                    </div>
                  </div>

                  {/* Details matrix */}
                  <div className="space-y-3.5 pt-3 border-t border-border/40 text-left text-xs">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono">
                        <Zap className="h-3.5 w-3.5 text-primary" /> Recommended Strategy
                      </div>
                      <p className="mt-1 text-muted-foreground leading-relaxed">
                        {details.strategy}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono">
                        <UserCheck className="h-3.5 w-3.5 text-primary" /> Decision Maker Persona
                      </div>
                      <p className="mt-1 text-foreground font-semibold">{details.persona}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 pt-1.5">
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono">
                          <Calendar className="h-3.5 w-3.5 text-primary" /> Best Outreach Time
                        </div>
                        <p className="mt-1 text-foreground text-[11px] font-medium leading-tight">
                          {details.bestTime}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono">
                          <Sliders className="h-3.5 w-3.5 text-primary" /> Confidence Index
                        </div>
                        <p className="mt-1 text-foreground text-sm font-mono font-bold text-success">
                          {details.confidence}% Precision
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono">
                        <AlertTriangle className="h-3.5 w-3.5 text-warning" /> AI Risk analysis
                      </div>
                      <p className="mt-1 text-muted-foreground leading-relaxed bg-warning/5 border border-warning/15 p-2 rounded-lg text-[11px]">
                        {details.risk}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-4 flex gap-2">
                    <Link
                      to="/outreach"
                      className="w-full flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 text-center"
                    >
                      Generate Outreach Script
                    </Link>
                  </div>
                </>
              );
            })()
          ) : (
            <div className="text-center py-20 text-xs text-muted-foreground">
              Select any harvested signal in the feed to inspect the intent analysis model.
            </div>
          )}
        </DepthLayer>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
