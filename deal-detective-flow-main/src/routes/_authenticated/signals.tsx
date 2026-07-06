import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listSignals } from "@/lib/signals.functions";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/signals")({
  component: SignalsPage,
});

function SignalsPage() {
  const fn = useServerFn(listSignals);
  const q = useSuspenseQuery({ queryKey: ["signals"], queryFn: () => fn() });
  const [filter, setFilter] = useState<string>("all");

  const types = Array.from(new Set(q.data.map((s) => s.signal_type)));
  const rows = filter === "all" ? q.data : q.data.filter((s) => s.signal_type === filter);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-primary">Intent analysis agent</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Signal feed</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All ({q.data.length})
        </FilterChip>
        {types.map((t) => (
          <FilterChip key={t} active={filter === t} onClick={() => setFilter(t)}>
            {t} ({q.data.filter((s) => s.signal_type === t).length})
          </FilterChip>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No signals yet. Harvest a target on the Targets page.
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card/60">
          {rows.map((sig, i) => {
            const raw = sig.raw as { urgency?: string; score?: number; rationale?: string } | null;
            return (
              <div
                key={sig.id}
                className={`flex items-start gap-4 p-4 ${
                  i !== rows.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                      {sig.signal_type}
                    </span>
                    <span className="rounded-full border border-intent/40 bg-intent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-intent">
                      {sig.intent}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {sig.source} · {formatDistanceToNow(new Date(sig.detected_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="mt-1.5 font-medium">{sig.title}</div>
                  {sig.summary && (
                    <div className="mt-1 text-sm text-muted-foreground">{sig.summary}</div>
                  )}
                  {raw?.rationale && (
                    <div className="mt-2 rounded-md border border-border/50 bg-background/40 px-3 py-2 text-xs text-muted-foreground">
                      <span className="text-primary">Why it matters: </span>
                      {raw.rationale}
                    </div>
                  )}
                </div>
                {raw?.score != null && (
                  <div className="text-right">
                    <div className="font-mono text-2xl text-primary">{raw.score}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      score
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition ${
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-card/50 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
