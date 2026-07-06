import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { addTarget, deleteTarget, harvestSignals, listTargets } from "@/lib/signals.functions";
import { useState } from "react";
import { Loader2, Radar, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

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

  const [form, setForm] = useState({ company_name: "", domain: "", industry: "", notes: "" });

  const add = useMutation({
    mutationFn: () =>
      addFn({
        data: {
          company_name: form.company_name,
          domain: form.domain || null,
          industry: form.industry || null,
          notes: form.notes || null,
        },
      }),
    onSuccess: () => {
      toast.success("Target added");
      setForm({ company_name: "", domain: "", industry: "", notes: "" });
      qc.invalidateQueries({ queryKey: ["targets"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (e) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Target removed");
      qc.invalidateQueries({ queryKey: ["targets"] });
    },
  });

  const harvest = useMutation({
    mutationFn: (id: string) => harvestFn({ data: { target_id: id } }),
    onSuccess: (r) => {
      toast.success(`Harvested ${r.signals_created} signals · ${r.leads_created} leads`);
      qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-primary">Signal collection agent</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Targets</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add companies you want to monitor. Trigger a harvest to run the agent pipeline.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            add.mutate();
          }}
          className="grid gap-3 md:grid-cols-4"
        >
          <input
            required
            placeholder="Company name *"
            value={form.company_name}
            onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            className="rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <input
            placeholder="Domain (acme.com)"
            value={form.domain}
            onChange={(e) => setForm({ ...form, domain: e.target.value })}
            className="rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <input
            placeholder="Industry"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            className="rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            disabled={add.isPending}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {add.isPending ? "Adding…" : "Add target"}
          </button>
          <textarea
            placeholder="Notes (ICP, personas, product context…)"
            rows={2}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="md:col-span-4 rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </form>
      </div>

      <div className="space-y-2">
        {q.data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No targets yet. Add one above to deploy your first agent.
          </div>
        ) : (
          q.data.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-base font-semibold">{t.company_name}</div>
                  {t.industry && (
                    <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {t.industry}
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {t.domain ?? "no domain"} ·{" "}
                  {t.last_harvested_at
                    ? `harvested ${formatDistanceToNow(new Date(t.last_harvested_at), { addSuffix: true })}`
                    : "never harvested"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => harvest.mutate(t.id)}
                  disabled={harvest.isPending}
                  className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                >
                  {harvest.isPending && harvest.variables === t.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Radar className="h-3.5 w-3.5" />
                  )}
                  Harvest
                </button>
                <button
                  onClick={() => del.mutate(t.id)}
                  className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
