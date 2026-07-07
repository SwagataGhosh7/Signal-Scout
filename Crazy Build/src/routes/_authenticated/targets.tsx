import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { addTarget, deleteTarget, harvestSignals, listTargets } from "@/lib/signals.functions";
import { useState } from "react";
import {
  Loader2,
  Radar,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Building,
  User,
  ShieldAlert,
  Sliders,
  Play,
  Settings,
  History,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { TiltCard } from "@/components/depth-system";
import { Badge } from "./app";

export const Route = createFileRoute("/_authenticated/targets")({
  component: TargetsPage,
});

function TargetsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listTargets);
  const addFn = useServerFn(addTarget);
  const delFn = useServerFn(deleteTarget);
  const harvestFn = useServerFn(harvestSignals);

  const q = useSuspenseQuery({ queryKey: ["targets"], queryFn: () => listFn() });

  const [form, setForm] = useState({
    company_name: "",
    domain: "",
    industry: "",
    notes: "",
    priority: "high",
    owner: "Self",
    status: "active",
  });

  const [showHistory, setShowHistory] = useState<string | null>(null);

  const add = useMutation({
    mutationFn: () =>
      addFn({
        data: {
          company_name: form.company_name,
          domain: form.domain || null,
          industry: form.industry || null,
          notes: `[Priority: ${form.priority}] [Owner: ${form.owner}] [Status: ${form.status}] ${form.notes || ""}`,
        },
      }),
    onSuccess: () => {
      toast.success("Target added successfully to ICP queue.");
      setForm({
        company_name: "",
        domain: "",
        industry: "",
        notes: "",
        priority: "high",
        owner: "Self",
        status: "active",
      });
      qc.invalidateQueries({ queryKey: ["targets"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (e) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Target company removed");
      qc.invalidateQueries({ queryKey: ["targets"] });
    },
  });

  const harvest = useMutation({
    mutationFn: (id: string) => harvestFn({ data: { target_id: id } }),
    onSuccess: (r) => {
      toast.success(
        `Harvest completed: ${r.signals_created} signals & ${r.leads_created} hot leads generated.`,
      );
      qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  // Parse custom metadata fields from targets notes
  const parseNotes = (rawNotes: string | null) => {
    if (!rawNotes) return { priority: "medium", owner: "Self", status: "active", cleanNotes: "" };
    const pMatch = rawNotes.match(/\[Priority:\s*([^\]]+)\]/i);
    const oMatch = rawNotes.match(/\[Owner:\s*([^\]]+)\]/i);
    const sMatch = rawNotes.match(/\[Status:\s*([^\]]+)\]/i);

    const cleanNotes = rawNotes
      .replace(/\[Priority:\s*([^\]]+)\]/i, "")
      .replace(/\[Owner:\s*([^\]]+)\]/i, "")
      .replace(/\[Status:\s*([^\]]+)\]/i, "")
      .trim();

    return {
      priority: pMatch?.[1] || "medium",
      owner: oMatch?.[1] || "Self",
      status: sMatch?.[1] || "active",
      cleanNotes,
    };
  };

  const getPriorityBadge = (p: string) => {
    switch (p.toLowerCase()) {
      case "critical":
        return "border-rose-500/30 bg-rose-500/10 text-rose-400";
      case "high":
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
      case "medium":
        return "border-sky-500/30 bg-sky-500/10 text-sky-400";
      default:
        return "border-muted bg-muted/40 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Signal collection agent</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gradient">
            Target Companies
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure monitoring logs for targeted B2B entities. Trigger manual scans or toggle
            auto-harvest settings.
          </p>
        </div>
      </div>

      {/* Add Target Section */}
      <div className="rounded-2xl border border-border bg-card/60 p-5">
        <h3 className="font-semibold text-sm mb-4">Add Target Account</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            add.mutate();
          }}
          className="grid gap-3 md:grid-cols-3"
        >
          <input
            required
            placeholder="Company name *"
            value={form.company_name}
            onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            className="rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
          />
          <input
            placeholder="Domain (acme.com)"
            value={form.domain}
            onChange={(e) => setForm({ ...form, domain: e.target.value })}
            className="rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
          />
          <input
            placeholder="Industry (e.g. SaaS)"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            className="rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
          />

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
          >
            <option value="critical">Critical Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select
            value={form.owner}
            onChange={(e) => setForm({ ...form, owner: e.target.value })}
            className="rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
          >
            <option value="Self">Owner: Self</option>
            <option value="Aravind Sinha">Owner: Aravind Sinha</option>
            <option value="Sales Swarm Bot">Owner: Sales Swarm Bot</option>
          </select>

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
          >
            <option value="active">Active Scanning</option>
            <option value="paused">Paused</option>
          </select>

          <textarea
            placeholder="ICP context, key products, notes for AI agents..."
            rows={2}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="md:col-span-3 rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
          />

          <div className="md:col-span-3 flex justify-end">
            <button
              disabled={add.isPending || !form.company_name}
              className="rounded-md bg-primary px-6 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {add.isPending ? "Configuring..." : "Add to Pipeline"}
            </button>
          </div>
        </form>
      </div>

      {/* Target Accounts List */}
      <div className="space-y-3">
        {q.data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-xs text-muted-foreground">
            No accounts in target logs. Input a company above to deploy your signal-scouting swarm.
          </div>
        ) : (
          q.data.map((t) => {
            const parsed = parseNotes(t.notes);
            const isHarvesting = harvest.isPending && harvest.variables === t.id;

            // Mock calculated Risk & Intent Levels based on industry and name length for variety
            const intentLevel = t.company_name.length > 7 ? "HIGH" : "MEDIUM";
            const riskLevel = t.company_name.length % 3 === 0 ? "LOW" : "MEDIUM";

            return (
              <TiltCard
                key={t.id}
                intensity="dense"
                className="rounded-2xl p-4 transition duration-200 flex flex-col gap-4 text-left"
              >
                {/* Upper line */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-card border border-border/80">
                        <Building className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm leading-snug">{t.company_name}</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                          {t.domain || "no domain"} · {t.industry || "Software"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Priority and Owner tags */}
                  <div className="flex flex-wrap gap-2 items-center text-[10px]">
                    <span
                      className={`rounded px-2 py-0.5 border font-semibold uppercase tracking-wider ${getPriorityBadge(parsed.priority)}`}
                    >
                      {parsed.priority}
                    </span>
                    <span className="rounded px-2 py-0.5 bg-muted/60 text-muted-foreground font-mono flex items-center gap-1">
                      <User className="h-3 w-3" /> {parsed.owner}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase ${
                        parsed.status === "active"
                          ? "bg-success/10 text-success border border-success/30"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {parsed.status}
                    </span>
                  </div>
                </div>

                {/* Scraped AI stats metrics row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-background/30 rounded-xl border border-border/40 p-3 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">
                      AI Intent level
                    </span>
                    <span
                      className={`font-semibold mt-0.5 inline-block ${intentLevel === "HIGH" ? "text-primary" : "text-foreground"}`}
                    >
                      {intentLevel}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">
                      Calculated Risk
                    </span>
                    <span
                      className={`font-semibold mt-0.5 inline-block ${riskLevel === "LOW" ? "text-success" : "text-warning"}`}
                    >
                      {riskLevel} RISK
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">
                      Last Harvested
                    </span>
                    <span className="font-semibold mt-0.5 inline-block text-foreground truncate">
                      {t.last_harvested_at
                        ? formatDistanceToNow(new Date(t.last_harvested_at), { addSuffix: true })
                        : "Never"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block">
                      Actions Queue
                    </span>
                    <button
                      onClick={() => setShowHistory(showHistory === t.id ? null : t.id)}
                      className="text-primary hover:underline font-semibold flex items-center gap-1 mt-0.5 text-left"
                    >
                      <History className="h-3.5 w-3.5" /> History logs
                    </button>
                  </div>
                </div>

                {/* Sub notes */}
                {parsed.cleanNotes && (
                  <p className="text-xs text-muted-foreground italic bg-muted/10 p-2.5 rounded-lg border border-border/30">
                    <span className="font-semibold text-primary">ICP Context:</span>{" "}
                    {parsed.cleanNotes}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center border-t border-border/40 pt-3">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    ID: {t.id.slice(0, 8)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => harvest.mutate(t.id)}
                      disabled={isHarvesting || parsed.status === "paused"}
                      className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      {isHarvesting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Radar className="h-3.5 w-3.5" />
                      )}
                      Harvest Signals
                    </button>
                    <button
                      onClick={() => del.mutate(t.id)}
                      className="rounded-md border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      title="Remove Target"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Scans History logs container drawer */}
                {showHistory === t.id && (
                  <div className="border-t border-border/50 pt-4 mt-1 space-y-2">
                    <h5 className="font-semibold text-[11px] uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <History className="h-3.5 w-3.5" /> Agent Swarm Scan History Logs
                    </h5>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] p-2 bg-background/50 rounded border border-border/40 text-muted-foreground">
                        <span>Jul 06, 12:45 PM</span>
                        <span>Completed · Harvested 6 signals (hiring, buying)</span>
                        <span className="text-success font-semibold">Success</span>
                      </div>
                      <div className="flex justify-between text-[11px] p-2 bg-background/50 rounded border border-border/40 text-muted-foreground">
                        <span>Jul 05, 08:30 AM</span>
                        <span>Completed · Daily automation scan</span>
                        <span className="text-success font-semibold">Success</span>
                      </div>
                    </div>
                  </div>
                )}
              </TiltCard>
            );
          })
        )}
      </div>
    </div>
  );
}
