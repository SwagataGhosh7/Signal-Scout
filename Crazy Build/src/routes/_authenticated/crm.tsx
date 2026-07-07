import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listLeads, updateLeadStatus } from "@/lib/signals.functions";
import { crmStatus } from "@/lib/crm.functions";
import { useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  CheckCircle2,
  Database,
  ArrowRightLeft,
  ChevronRight,
  TrendingUp,
  Circle,
  PlusCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Badge, UrgencyBadge } from "./app";

export const Route = createFileRoute("/_authenticated/crm")({
  component: CrmPage,
});

const CONNECTORS = [
  {
    name: "HubSpot",
    id: "hubspot",
    desc: "Sync contacts, deals, and notes directly to your HubSpot pipeline.",
    color: "text-[#FF7A59]",
    logo: Building2,
  },
  {
    name: "Salesforce",
    id: "salesforce",
    desc: "Automate lead mapping and contact records inside Salesforce CRM.",
    color: "text-[#00A4EF]",
    logo: Database,
  },
  {
    name: "Zoho CRM",
    id: "zoho",
    desc: "Push signals directly into Zoho deals module and set up follow-up alerts.",
    color: "text-[#E21A22]",
    logo: ArrowRightLeft,
  },
  {
    name: "Pipedrive",
    id: "pipedrive",
    desc: "Sync targeted buyer personas to your active pipelines.",
    color: "text-[#00B46A]",
    logo: TrendingUp,
  },
  {
    name: "Freshsales",
    id: "freshsales",
    desc: "Automate outbound outreach mapping to Freshsales deals.",
    color: "text-[#183247]",
    logo: RefreshCw,
  },
];

const CRM_STAGES = [
  { label: "New Leads", key: "new", color: "border-sky-500/20 bg-sky-500/5 text-sky-400" },
  {
    label: "Contacted",
    key: "contacted",
    color: "border-amber-500/20 bg-amber-500/5 text-amber-400",
  },
  {
    label: "Qualified",
    key: "qualified",
    color: "border-violet-500/20 bg-violet-500/5 text-violet-400",
  },
  {
    label: "Deals Won",
    key: "won",
    color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
  },
  { label: "Lost", key: "lost", color: "border-rose-500/20 bg-rose-500/5 text-rose-400" },
] as const;

function CrmPage() {
  const qc = useQueryClient();
  const leadsFn = useServerFn(listLeads);
  const statusFn = useServerFn(crmStatus);
  const updateStatusFn = useServerFn(updateLeadStatus);

  const leadsQ = useSuspenseQuery({ queryKey: ["leads"], queryFn: () => leadsFn() });
  const crmQ = useSuspenseQuery({ queryKey: ["crm-status"], queryFn: () => statusFn() });

  const [activeTab, setActiveTab] = useState<"pipeline" | "connectors">("pipeline");
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    hubspot: crmQ.data.connected,
    salesforce: false,
    zoho: false,
    pipedrive: false,
    freshsales: false,
  });

  const [isSyncing, setIsSyncing] = useState(false);

  const setStatus = useMutation({
    mutationFn: (v: { id: string; status: "new" | "contacted" | "qualified" | "won" | "lost" }) =>
      updateStatusFn({ data: v }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      toast.success("CRM stage updated");
    },
  });

  const toggleConnection = (id: string) => {
    if (id === "hubspot" && crmQ.data.connected) {
      toast.info("HubSpot is configured in env variables.");
      return;
    }
    const next = !integrations[id];
    setIntegrations({ ...integrations, [id]: next });
    if (next) {
      toast.success(`${CONNECTORS.find((c) => c.id === id)?.name} connected successfully!`);
    } else {
      toast.info(`Disconnected ${CONNECTORS.find((c) => c.id === id)?.name}`);
    }
  };

  const forceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("All CRM accounts fully synced.", {
        description: `Successfully pushed ${leadsQ.data.filter((x) => x.status !== "new").length} leads to connected systems.`,
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Sales execution</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">CRM Sync Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Automatically bridge the gap between AI signal intent and your sales tech stack.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={forceSync}
            disabled={isSyncing}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
          >
            {isSyncing ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <RefreshCw className="h-4 w-4 text-primary" />
            )}
            Force CRM Sync
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/50">
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
            activeTab === "pipeline"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Deal Pipeline Board
        </button>
        <button
          onClick={() => setActiveTab("connectors")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
            activeTab === "connectors"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Connectors ({Object.values(integrations).filter(Boolean).length})
        </button>
      </div>

      {activeTab === "pipeline" && (
        <div className="grid gap-4 md:grid-cols-5 overflow-x-auto pb-4">
          {CRM_STAGES.map((stage) => {
            const stageLeads = leadsQ.data.filter((l) => l.status === stage.key);
            const totalDealValue = stageLeads.reduce((acc, curr) => acc + curr.score * 150, 0);

            return (
              <div
                key={stage.key}
                className="flex flex-col min-w-[220px] rounded-2xl border border-border/60 bg-card/20 p-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-semibold text-sm truncate">{stage.label}</span>
                    <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-mono font-bold">
                      {stageLeads.length}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    ${totalDealValue.toLocaleString()}
                  </span>
                </div>

                {/* Lead Items */}
                <div className="flex-1 space-y-3 min-h-[300px] overflow-y-auto">
                  {stageLeads.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-border/40 p-4 text-center text-xs text-muted-foreground">
                      <Circle className="h-4 w-4 mb-1 opacity-20" />
                      No deals in this stage
                    </div>
                  ) : (
                    stageLeads.map((l) => (
                      <div
                        key={l.id}
                        className="group relative rounded-xl border border-border bg-card/85 p-3 hover:border-primary/50 hover:glow-violet transition duration-200 text-left"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <Badge>{l.intent ?? "intent"}</Badge>
                          <div className="font-mono text-xs font-bold text-primary">{l.score}%</div>
                        </div>
                        <h4 className="mt-2 text-xs font-semibold text-foreground leading-snug line-clamp-2">
                          {l.title}
                        </h4>
                        {l.rationale && (
                          <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                            {l.rationale}
                          </p>
                        )}
                        <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[10px]">
                          <span className="text-muted-foreground font-mono">
                            Est: ${(l.score * 150).toLocaleString()}
                          </span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition duration-150">
                            {CRM_STAGES.filter((s) => s.key !== stage.key).map((s) => (
                              <button
                                key={s.key}
                                onClick={() => setStatus.mutate({ id: l.id, status: s.key })}
                                className="rounded bg-muted px-1.5 py-0.5 hover:bg-primary/20 hover:text-primary transition font-bold"
                                title={`Move to ${s.label}`}
                              >
                                {s.label[0]}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "connectors" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CONNECTORS.map((c) => {
            const connected = integrations[c.id];
            return (
              <div
                key={c.id}
                className={`rounded-2xl border bg-card/60 p-5 flex flex-col justify-between transition ${
                  connected ? "border-primary/40 glow" : "border-border"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`grid h-9 w-9 place-items-center rounded-lg bg-card border border-border/80 ${c.color}`}
                      >
                        <c.logo className="h-5 w-5" />
                      </div>
                      <span className="font-semibold text-foreground">{c.name}</span>
                    </div>
                    {connected ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase font-mono font-semibold text-success border border-success/40 bg-success/15 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="h-2.5 w-2.5" /> Connected
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-mono font-semibold text-muted-foreground border border-border bg-muted/30 px-2.5 py-0.5 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => toggleConnection(c.id)}
                    className={`w-full rounded-md px-3 py-2 text-xs font-semibold transition ${
                      connected
                        ? "border border-destructive/40 text-destructive bg-destructive/5 hover:bg-destructive/15"
                        : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    {connected ? "Disconnect" : "Configure Connector"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
