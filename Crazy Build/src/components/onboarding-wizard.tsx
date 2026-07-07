import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { addTarget, harvestSignals } from "@/lib/signals.functions";
import { toast } from "sonner";
import { Check, Loader2, Radar, Sparkles, Target as TargetIcon, X } from "lucide-react";

const KEY = "pulse.onboarding.dismissed";

export function OnboardingWizard({
  hasTargets,
  onDone,
}: {
  hasTargets: boolean;
  onDone?: () => void;
}) {
  const dismissed = typeof window !== "undefined" && localStorage.getItem(KEY) === "1";
  const [open, setOpen] = useState(!hasTargets && !dismissed);
  const [step, setStep] = useState(0);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [form, setForm] = useState({ company_name: "", domain: "", industry: "" });

  const qc = useQueryClient();
  const navigate = useNavigate();
  const addFn = useServerFn(addTarget);
  const harvestFn = useServerFn(harvestSignals);

  const add = useMutation({
    mutationFn: () =>
      addFn({
        data: {
          company_name: form.company_name,
          domain: form.domain || null,
          industry: form.industry || null,
        },
      }),
    onSuccess: (t) => {
      setCreatedId(t.id);
      setStep(2);
      qc.invalidateQueries({ queryKey: ["targets"] });
    },
    onError: (e) => toast.error(e.message),
  });

  const harvest = useMutation({
    mutationFn: () => harvestFn({ data: { target_id: createdId! } }),
    onSuccess: (r) => {
      toast.success(`${r.signals_created} signals · ${r.leads_created} leads`);
      qc.invalidateQueries();
      dismiss();
      navigate({ to: "/leads" });
    },
    onError: (e) => toast.error(e.message),
  });

  const dismiss = () => {
    localStorage.setItem(KEY, "1");
    setOpen(false);
    onDone?.();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary">Get started</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Deploy your first signal agent
            </h2>
          </div>
          <button
            onClick={dismiss}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <Stepper step={step} />

        {step === 0 && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <IntroCard
                icon={TargetIcon}
                title="1. Add a target"
                body="Company you want to monitor"
              />
              <IntroCard
                icon={Radar}
                title="2. Harvest signals"
                body="AI scans intent & activity"
              />
              <IntroCard
                icon={Sparkles}
                title="3. Get leads"
                body="Scored, ranked, ready to work"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={dismiss}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
              >
                Skip
              </button>
              <button
                onClick={() => setStep(1)}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Start
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              add.mutate();
            }}
            className="mt-6 space-y-3"
          >
            <p className="text-sm text-muted-foreground">
              Pick a company to monitor. Real ones work best — try a competitor or account you're
              chasing.
            </p>
            <input
              required
              autoFocus
              placeholder="Company name *"
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <div className="grid grid-cols-2 gap-3">
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
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
              >
                Back
              </button>
              <button
                disabled={add.isPending || !form.company_name}
                className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {add.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Create target
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-border bg-background/40 p-4">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-success" />
                Target <span className="font-semibold">{form.company_name}</span> created.
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Now run the Signal Collection agent. It'll scan for hiring, funding, product, and
                intent signals, then score opportunities into leads.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={dismiss}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
              >
                I'll do it later
              </button>
              <button
                onClick={() => harvest.mutate()}
                disabled={harvest.isPending}
                className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {harvest.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Radar className="h-3.5 w-3.5" />
                )}
                Harvest signals
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition ${
            i <= step ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

function IntroCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <div className="mb-2 grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{body}</div>
    </div>
  );
}
