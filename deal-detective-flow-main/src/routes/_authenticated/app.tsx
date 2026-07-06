import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { dashboardStats, listLeads, listSignals, listTargets } from "@/lib/signals.functions";
import { Activity, ArrowRight, Radar, Target, TrendingUp, Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { OnboardingWizard } from "@/components/onboarding-wizard";

export const Route = createFileRoute("/_authenticated/app")({
  component: Dashboard,
});

function Dashboard() {
  const statsFn = useServerFn(dashboardStats);
  const leadsFn = useServerFn(listLeads);
  const signalsFn = useServerFn(listSignals);
  const targetsFn = useServerFn(listTargets);

  const stats = useSuspenseQuery({ queryKey: ["stats"], queryFn: () => statsFn() });
  const leads = useSuspenseQuery({ queryKey: ["leads"], queryFn: () => leadsFn() });
  const signals = useSuspenseQuery({ queryKey: ["signals"], queryFn: () => signalsFn() });
  const targets = useSuspenseQuery({ queryKey: ["targets"], queryFn: () => targetsFn() });

  const s = stats.data;
  const topLeads = leads.data.slice(0, 5);
  const recentSignals = signals.data.slice(0, 8);

  return (
    <div className="space-y-6">
      <OnboardingWizard hasTargets={targets.data.length > 0} />
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Mission control</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Signal dashboard</h1>
        </div>
        <Link
          to="/targets"
          className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground glow hover:opacity-90"
        >
          <Target className="h-4 w-4" />
          Add target
        </Link>
      </div>

      {/* KPI grid */}
      <div className="grid gap-3 md:grid-cols-4">
        <Stat icon={Target} label="Targets" value={s.targets} accent="primary" />
        <Stat icon={Radar} label="Signals" value={s.signals} accent="primary" />
        <Stat icon={Zap} label="Hot leads" value={s.highUrgency} accent="intent" sub={`avg score ${s.avgScore}`} />
        <Stat icon={TrendingUp} label="Drafts" value={s.drafts} accent="intent" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Top leads */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Priority leads</h2>
            <Link to="/leads" className="flex items-center gap-1 text-xs text-primary hover:underline">
              All leads <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {topLeads.length === 0 ? (
            <EmptyState label="No leads yet. Add a target and harvest signals." />
          ) : (
            <div className="space-y-2">
              {topLeads.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <ScoreDot score={l.score} />
                      <div className="truncate text-sm font-medium">{l.title}</div>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge>{l.intent ?? "unknown"}</Badge>
                      <UrgencyBadge urgency={l.urgency} />
                      <span>· {l.status}</span>
                    </div>
                  </div>
                  <div className="ml-4 font-mono text-lg text-primary">{l.score}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Intent heatmap */}
        <div className="rounded-2xl border border-border bg-card/60 p-5">
          <h2 className="mb-4 font-semibold">Intent heatmap</h2>
          {Object.keys(s.byIntent).length === 0 ? (
            <EmptyState label="No intents detected yet." />
          ) : (
            <div className="space-y-3">
              {Object.entries(s.byIntent).map(([k, v]) => {
                const max = Math.max(...Object.values(s.byIntent));
                const pct = (v / max) * 100;
                return (
                  <div key={k}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="capitalize text-muted-foreground">{k}</span>
                      <span className="font-mono text-foreground">{v}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-intent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Signal feed */}
      <div className="rounded-2xl border border-border bg-card/60 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Live signal feed</h2>
          <Link to="/signals" className="flex items-center gap-1 text-xs text-primary hover:underline">
            All signals <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {recentSignals.length === 0 ? (
          <EmptyState label="Feed is quiet. Harvest a target to see signals." />
        ) : (
          <div className="divide-y divide-border/50">
            {recentSignals.map((sig) => (
              <div key={sig.id} className="flex items-start gap-3 py-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary pulse-dot" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge>{sig.signal_type}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {sig.source} · {formatDistanceToNow(new Date(sig.detected_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-medium">{sig.title}</div>
                  {sig.summary && (
                    <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {sig.summary}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  accent: "primary" | "intent";
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <div
          className={`grid h-7 w-7 place-items-center rounded-md ${
            accent === "primary" ? "bg-primary/15 text-primary" : "bg-intent/20 text-intent"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="mt-2 font-mono text-3xl">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function ScoreDot({ score }: { score: number }) {
  const color =
    score >= 75 ? "bg-destructive" : score >= 55 ? "bg-warning" : "bg-success";
  return <div className={`h-2 w-2 shrink-0 rounded-full ${color}`} />;
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

export function UrgencyBadge({ urgency }: { urgency: string }) {
  const map: Record<string, string> = {
    high: "border-destructive/40 text-destructive bg-destructive/10",
    medium: "border-warning/40 text-warning bg-warning/10",
    low: "border-success/40 text-success bg-success/10",
  };
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase ${
        map[urgency] ?? map.medium
      }`}
    >
      {urgency}
    </span>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
      <Activity className="mb-2 h-5 w-5 opacity-40" />
      {label}
    </div>
  );
}
