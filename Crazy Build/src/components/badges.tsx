import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
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
      className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase font-semibold ${
        map[urgency] ?? map.medium
      }`}
    >
      {urgency}
    </span>
  );
}
