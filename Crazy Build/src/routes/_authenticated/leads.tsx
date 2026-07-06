import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { generateOutreach, listLeads, updateLeadStatus } from "@/lib/signals.functions";
import { crmStatus, syncLeadToCrm } from "@/lib/crm.functions";
import { Building2, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { UrgencyBadge, Badge } from "./app";

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
    mutationFn: (v: { id: string; status: (typeof STATUSES)[number] }) =>
      statusFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });

  const pushCrm = useMutation({
    mutationFn: (id: string) => crmFn({ data: { lead_id: id } }),
    onSuccess: (r) => {
      if (r.skipped) toast.error("Connect HubSpot in Project Settings → Connectors first.");
      else toast.success("Synced to HubSpot as a deal.");
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Prioritization agent</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-scored opportunities ranked by conversion potential and urgency.
          </p>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] ${
            crm.data.connected
              ? "border-success/40 bg-success/10 text-success"
              : "border-border text-muted-foreground"
          }`}
        >
          <Building2 className="h-3 w-3" />
          HubSpot {crm.data.connected ? "connected" : "not connected"}
        </div>
      </div>


      {q.data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No leads yet. Harvest signals on a target to generate leads.
        </div>
      ) : (
        <div className="space-y-3">
          {q.data.map((l) => (
            <div key={l.id} className="rounded-2xl border border-border bg-card/60 p-5">
              <div className="flex items-start gap-4">
                <div className="grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-intent/20 p-3">
                  <div className="text-center">
                    <div className="font-mono text-2xl text-primary">{l.score}</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                      score
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{l.intent ?? "unknown"}</Badge>
                    <UrgencyBadge urgency={l.urgency} />
                  </div>
                  <div className="mt-1.5 font-medium">{l.title}</div>
                  {l.rationale && (
                    <div className="mt-1 text-sm text-muted-foreground">{l.rationale}</div>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
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
                    <button
                      onClick={() => draft.mutate(l.id)}
                      disabled={draft.isPending}
                      className="flex items-center gap-1.5 rounded-md bg-primary/15 px-3 py-1 text-xs text-primary hover:bg-primary/25 disabled:opacity-50"
                    >
                      {draft.isPending && draft.variables === l.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Mail className="h-3 w-3" />
                      )}
                      Draft outreach
                    </button>
                    <button
                      onClick={() => pushCrm.mutate(l.id)}
                      disabled={pushCrm.isPending}
                      className="flex items-center gap-1.5 rounded-md bg-intent/15 px-3 py-1 text-xs text-intent hover:bg-intent/25 disabled:opacity-50"
                    >
                      {pushCrm.isPending && pushCrm.variables === l.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Building2 className="h-3 w-3" />
                      )}
                      Push to CRM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
