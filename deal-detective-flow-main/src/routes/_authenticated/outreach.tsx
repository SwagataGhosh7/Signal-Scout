import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listDrafts } from "@/lib/signals.functions";
import { formatDistanceToNow } from "date-fns";
import { Copy, Mail } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/outreach")({
  component: OutreachPage,
});

function OutreachPage() {
  const fn = useServerFn(listDrafts);
  const q = useSuspenseQuery({ queryKey: ["drafts"], queryFn: () => fn() });

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-primary">Automation agent</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Outreach drafts</h1>
      </div>

      {q.data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No drafts yet. Generate one from a lead.
        </div>
      ) : (
        <div className="space-y-3">
          {q.data.map((d) => (
            <div key={d.id} className="rounded-2xl border border-border bg-card/60 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-md bg-intent/20 text-intent">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{d.subject}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {formatDistanceToNow(new Date(d.created_at), { addSuffix: true })} · {d.channel}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copy(`Subject: ${d.subject}\n\n${d.body}`)}
                  className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1 text-xs hover:bg-accent"
                >
                  <Copy className="h-3 w-3" /> Copy
                </button>
              </div>
              <pre className="whitespace-pre-wrap rounded-md border border-border/50 bg-background/40 p-3 font-sans text-sm text-foreground">
                {d.body}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
