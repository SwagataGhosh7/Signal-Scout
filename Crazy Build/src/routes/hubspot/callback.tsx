import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { exchangeHubspotCode } from "@/lib/crm.functions";

export const Route = createFileRoute("/hubspot/callback")({
  component: HubspotCallbackPage,
});

function HubspotCallbackPage() {
  const exchangeFn = useServerFn(exchangeHubspotCode);
  const [status, setStatus] = useState("Connecting HubSpot...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const authError = params.get("error");

    if (authError) {
      setError(authError);
      setStatus("HubSpot authorization was cancelled or failed.");
      toast.error("HubSpot authorization failed.");
      window.setTimeout(() => window.location.assign("/crm"), 1500);
      return;
    }

    if (!code) {
      setError("No authorization code was returned by HubSpot.");
      setStatus("HubSpot did not return an authorization code.");
      toast.error("HubSpot did not return an authorization code.");
      window.setTimeout(() => window.location.assign("/crm"), 1500);
      return;
    }

    void (async () => {
      try {
        const result = await exchangeFn({ data: { code, state: params.get("state") ?? undefined } });
        if (result.connected) {
          setStatus("HubSpot connected successfully.");
          toast.success("HubSpot connected successfully.");
          window.setTimeout(() => window.location.assign("/crm"), 800);
        } else {
          setError(result.error ?? "HubSpot could not be connected.");
          setStatus("HubSpot connection failed.");
          toast.error(result.error ?? "HubSpot connection failed.");
          window.setTimeout(() => window.location.assign("/crm"), 1500);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setStatus("HubSpot connection failed.");
        toast.error(message);
        window.setTimeout(() => window.location.assign("/crm"), 1500);
      }
    })();
  }, [exchangeFn]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card/80 p-6 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          {error ? (
            <AlertCircle className="h-10 w-10 text-destructive" />
          ) : (
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          )}
        </div>
        <h1 className="text-xl font-semibold">{error ? "HubSpot connection issue" : "Connecting HubSpot"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{status}</p>
        {error ? (
          <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            Waiting for HubSpot to confirm access...
          </div>
        )}
      </div>
    </div>
  );
}
