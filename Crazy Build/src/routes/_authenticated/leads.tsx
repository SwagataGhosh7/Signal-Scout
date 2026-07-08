import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { generateOutreach, listLeads, updateLeadStatus } from "@/lib/signals.functions";
import { crmStatus, syncLeadToCrm } from "@/lib/crm.functions";
import {
  Building2,
  Loader2,
  Mail,
  Zap,
  TrendingUp,
  DollarSign,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { TiltCard } from "@/components/depth-system";
import { UrgencyBadge, Badge } from "./app";
import { HackathonLeadGenTrigger } from "@/components/LeadGenTrigger";
import { LeadProfileCards } from "@/components/LeadProfileCards";

const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;

export const Route = createFileRoute("/_authenticated/leads")({
  component: LeadsPage,
});

function LeadsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listLeads);
  const outreachFn = useServerFn(generateOutreach);
  const statusFn = useServerFn(updateLeadStatus);
  const crmFn = useServerFn(syncLeadToCrm);
  const crmStatusFn = useServerFn(crmStatus);

  const q = useSuspenseQuery({ queryKey: ["leads"], queryFn: () => listFn() });
  const crm = useSuspenseQuery({ queryKey: ["crm-status"], queryFn: () => crmStatusFn() });

  const draft = useMutation({
    mutationFn: (id: string) => outreachFn({ data: { lead_id: id } }),
    onSuccess: () => {
      toast.success("Outreach draft ready — check the Outreach tab.");
      qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  const setStatus = useMutation({
    mutationFn: (v: { id: string; status: (typeof STATUSES)[number] }) => statusFn({ data: v }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead status updated.");
    },
  });

  const pushCrm = useMutation({
    mutationFn: (id: string) => crmFn({ data: { lead_id: id } }),
    onSuccess: (r) => {
      if (r.skipped) {
        toast.error(
          "CRM Sync skipped. Toggle on connectors in settings or Project Settings → CRM.",
        );
      } else {
        toast.success("Synced to CRM pipeline successfully as a new Deal.", {
          description: `Deal ID: ${r.deal_id}`,
        });
      }
    },
    onError: (e) => toast.error(e.message),
  });

  // Calculate dynamic metrics for presentation
  const getLeadDetails = (l: (typeof q.data)[0]) => {
    const probability = Math.round(l.score * 0.95);
    const dealSize = l.score * 150;

    // Choose dynamic next action based on intent
    let nextAction = "Draft personalized email outreach";
    if (l.intent === "hiring") {
      nextAction = "Pitch B2B talent pipeline solutions";
    } else if (l.intent === "funding") {
      nextAction = "Reach out immediately with enterprise license options";
    } else if (l.intent === "expansion") {
      nextAction = "Draft expansion partnership proposal";
    }

    return { probability, dealSize, nextAction };
  };

  return (
    <div className="space-y-6">
      <HackathonLeadGenTrigger />
      <LeadProfileCards />
      <div className="flex flex-col gap-3 md:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] md:text-xs uppercase tracking-widest text-primary font-semibold">
            Prioritization agent
          </p>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-gradient">
            AI-Scored Leads
          </h1>
          <p className="mt-1 text-[13px] md:text-sm text-muted-foreground">
            Ranked prospects prioritized based on buying intentions, size triggers, and signal
            freshness.
          </p>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs shrink-0 ${
            crm.data.connected
              ? "border-success/40 bg-success/10 text-success"
              : "border-border text-muted-foreground bg-muted/20"
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          CRM Connection: {crm.data.connected ? "HubSpot Linked" : "Inactive Setup"}
        </div>
      </div>

      {q.data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
          No prioritized leads in log. Run a target scan to discover signals and compile leads
          automatically.
        </div>
      ) : (
        <div className="space-y-4.5">
          {q.data.map((l) => {
            const details = getLeadDetails(l);

            return (
              <TiltCard
                key={l.id}
                intensity="dense"
                className="rounded-2xl p-4 md:p-5 transition duration-200 text-left"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4 justify-between">
                  <div className="flex items-start gap-4">
                    {/* Score badge */}
                    <div className="grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-intent/15 border border-primary/20 p-3 shadow-inner">
                      <div className="text-center min-w-[40px]">
                        <div className="font-mono text-2xl font-black text-primary leading-none">
                          {l.score}
                        </div>
                        <div className="text-[8px] uppercase font-bold tracking-widest text-muted-foreground mt-1">
                          priority
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge>{l.intent ?? "buying"}</Badge>
                        <UrgencyBadge urgency={l.urgency} />
                        {l.status !== "new" && (
                          <span className="rounded-full bg-primary/10 border border-primary/30 px-2 py-0.5 text-[9px] font-mono text-primary uppercase font-bold">
                            CRM Stage: {l.status}
                          </span>
                        )}
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-foreground leading-snug">
                        {l.title}
                      </h4>
                      {l.rationale && (
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {l.rationale}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Calculated metrics table */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 border-t md:border-t-0 border-border/40 pt-3 md:pt-0 shrink-0 text-left text-xs md:text-right font-mono">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">
                        Probability
                      </span>
                      <span className="font-semibold text-success font-mono text-xs">
                        {details.probability}% Convert
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">
                        Est. Deal size
                      </span>
                      <span className="font-semibold text-foreground text-xs">
                        ${details.dealSize.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommended Next Action bar */}
                <div className="mt-4 rounded-lg bg-background/50 border border-border/50 px-3.5 py-2.5 text-xs text-muted-foreground flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <TrendingUp className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">
                      <span className="text-primary font-semibold">Next best action:</span>{" "}
                      {details.nextAction}
                    </span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />
                </div>

                {/* CRM and Email Actions */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3 text-xs">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] text-muted-foreground uppercase font-mono mr-1">
                      Deal Stage
                    </label>
                    <select
                      value={l.status}
                      onChange={(e) =>
                        setStatus.mutate({
                          id: l.id,
                          status: e.target.value as (typeof STATUSES)[number],
                        })
                      }
                      className="rounded-md border border-border bg-input px-2 py-1 text-xs"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => draft.mutate(l.id)}
                      disabled={draft.isPending}
                      className="flex items-center gap-1.5 rounded-md border border-border/80 bg-background hover:bg-accent px-4.5 py-1.5 text-xs font-semibold text-foreground disabled:opacity-50"
                    >
                      {draft.isPending && draft.variables === l.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Mail className="h-3.5 w-3.5 text-primary" />
                      )}
                      Draft outreach
                    </button>
                    <button
                      onClick={() => pushCrm.mutate(l.id)}
                      disabled={pushCrm.isPending}
                      className="flex items-center gap-1.5 rounded-md bg-primary px-4.5 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      {pushCrm.isPending && pushCrm.variables === l.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Building2 className="h-3.5 w-3.5" />
                      )}
                      Sync to CRM
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
