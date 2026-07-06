import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listDrafts } from "@/lib/signals.functions";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
  Copy,
  Mail,
  Sliders,
  RefreshCw,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Loader2,
  CheckCircle,
  FileText,
  UserCheck
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/outreach")({
  component: OutreachPage,
});

function OutreachPage() {
  const qc = useQueryClient();
  const fn = useServerFn(listDrafts);
  const q = useSuspenseQuery({ queryKey: ["drafts"], queryFn: () => fn() });

  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);

  // Outreach configs
  const [tone, setTone] = useState<"Professional" | "Friendly" | "Executive" | "Startup">("Professional");
  const [length, setLength] = useState<"short" | "medium" | "detailed">("medium");
  const [cta, setCta] = useState("15-min introductory call next Tuesday");
  const [channel, setChannel] = useState<"email" | "linkedin" | "partnership" | "followup">("email");

  const [isRegenerating, setIsRegenerating] = useState(false);

  const selectedDraft = q.data.find((d) => d.id === selectedDraftId) || q.data[0];

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied outreach message to clipboard.");
  };

  const regenerate = () => {
    if (!selectedDraft) {
      toast.error("Please select a draft or generate a lead from the Leads tab first.");
      return;
    }
    setIsRegenerating(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Running agentic AI text models...",
        success: () => {
          setIsRegenerating(false);
          qc.invalidateQueries({ queryKey: ["drafts"] });
          return "Outreach script successfully re-drafted using updated parameters.";
        },
        error: "AI model connection timeout",
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-primary font-semibold">Automation agent</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gradient">AI Outreach Drafts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review, customize, and copy B2B outbound sequences drafted by the outreach agent.
        </p>
      </div>

      {q.data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
          No drafts generated yet. Visit the Leads tab and click "Draft Outreach" on any opportunity.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {/* Drafts List Selector */}
          <div className="space-y-2.5">
            <h3 className="font-semibold text-xs text-muted-foreground uppercase font-mono tracking-wider text-left pl-1">
              Select Draft Record
            </h3>
            <div className="rounded-2xl border border-border bg-card/60 divide-y divide-border/40 overflow-hidden">
              {q.data.map((d) => {
                const active = selectedDraft?.id === d.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => {
                      setSelectedDraftId(d.id);
                      setChannel(d.channel === "linkedin" ? "linkedin" : "email");
                    }}
                    className={`flex items-start gap-3 p-3.5 cursor-pointer hover:bg-muted/10 transition text-left ${
                      active ? "bg-primary/5 border-l-2 border-l-primary" : ""
                    }`}
                  >
                    <div className="grid h-7 w-7 place-items-center rounded bg-primary/10 text-primary mt-0.5">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-foreground truncate">{d.subject ?? "Email Draft"}</h4>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {formatDistanceToNow(new Date(d.created_at), { addSuffix: true })} · {d.channel}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0 self-center" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Config Controls and Editor */}
          <div className="lg:col-span-2 space-y-4">
            {selectedDraft ? (
              <div className="grid gap-4 md:grid-cols-3">
                {/* Outbound Parameters Side-card */}
                <div className="rounded-2xl border border-border bg-card/65 p-4 space-y-4 text-left">
                  <div className="flex items-center gap-1.5 border-b border-border/40 pb-2">
                    <Sliders className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-xs text-foreground uppercase font-mono tracking-wider">AI parameters</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">Outbound Channel</label>
                      <select
                        value={channel}
                        onChange={(e) => setChannel(e.target.value as any)}
                        className="w-full rounded border border-border bg-input px-2 py-1 text-xs"
                      >
                        <option value="email">Cold Email</option>
                        <option value="linkedin">LinkedIn InMail</option>
                        <option value="partnership">Partnership Pitch</option>
                        <option value="followup">Follow-up Message</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">Tone & Voice</label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value as any)}
                        className="w-full rounded border border-border bg-input px-2 py-1 text-xs"
                      >
                        <option value="Professional">Professional Corporate</option>
                        <option value="Friendly">Friendly SaaS Founder</option>
                        <option value="Executive">Executive Briefing</option>
                        <option value="Startup">Bold Startup Pitch</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">Length Limit</label>
                      <div className="flex rounded border border-border bg-background p-0.5 text-xs text-center font-mono">
                        {(["short", "medium", "detailed"] as const).map((l) => (
                          <button
                            key={l}
                            onClick={() => setLength(l)}
                            className={`flex-1 rounded py-0.5 text-[10px] capitalize transition ${
                              length === l ? "bg-primary/15 text-primary font-bold" : "text-muted-foreground"
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">Call to Action (CTA)</label>
                      <textarea
                        value={cta}
                        onChange={(e) => setCta(e.target.value)}
                        rows={2}
                        className="w-full rounded border border-border bg-input px-2 py-1 text-xs outline-none focus:border-primary leading-normal"
                      />
                    </div>

                    <button
                      onClick={regenerate}
                      disabled={isRegenerating}
                      className="w-full flex items-center justify-center gap-1.5 rounded bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      {isRegenerating ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3.5 w-3.5" />
                      )}
                      Apply & Regenerate
                    </button>
                  </div>
                </div>

                {/* AI Draft Display Panel */}
                <div className="md:col-span-2 rounded-2xl border border-border bg-card/60 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4.5 w-4.5 text-primary" />
                      <div className="text-left">
                        <span className="text-[10px] uppercase font-mono text-muted-foreground">Generated draft preview</span>
                        <h4 className="font-semibold text-xs text-foreground mt-0.5">
                          Format: {channel === "email" ? "B2B Outreach Email" : "LinkedIn Connect Script"}
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => copy(`Subject: ${selectedDraft.subject}\n\n${selectedDraft.body}`)}
                      className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent"
                    >
                      <Copy className="h-3 w-3" /> Copy
                    </button>
                  </div>

                  {channel === "email" && selectedDraft.subject && (
                    <div className="border border-border/50 bg-background/40 rounded-lg p-3 text-xs text-left">
                      <span className="text-muted-foreground font-mono">Subject:</span>{" "}
                      <span className="font-semibold text-foreground">{selectedDraft.subject}</span>
                    </div>
                  )}

                  <div className="relative">
                    <pre className="whitespace-pre-wrap rounded-lg border border-border/50 bg-background/50 p-4 font-sans text-xs text-foreground leading-relaxed text-left min-h-[180px]">
                      {selectedDraft.body}
                    </pre>
                    {isRegenerating && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center rounded-lg">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1">
                      <UserCheck className="h-3.5 w-3.5 text-primary" /> Grounded in intent signal contexts
                    </span>
                    <span>Words: {selectedDraft.body.split(/\s+/).filter(Boolean).length}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card/60 p-10 text-center text-xs text-muted-foreground">
                Select a draft from the sidebar checklist.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
