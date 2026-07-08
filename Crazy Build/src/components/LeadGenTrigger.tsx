import React, { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { toast } from "sonner";

// Replace this with the Webhook URL Pipedream gives you
const PIPEDREAM_WEBHOOK_URL = "https://eodztq0j67zuypr.m.pipedream.net";

export function HackathonLeadGenTrigger() {
  const [keyword, setKeyword] = useState("Sales Manager");
  const [location, setLocation] = useState("San Francisco");
  const [loading, setLoading] = useState(false);

  const startLeadGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(PIPEDREAM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, location }),
      });

      if (res.ok) {
        toast.success("Lead generation job triggered! Watch Firebase for new documents.");
      } else {
        toast.error("Webhook failed.");
      }
    } catch (err) {
      toast.error("Network error triggering webhook.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-background border border-primary/20 p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        Live Demo: Trigger Lead Gen
      </h3>
      <form onSubmit={startLeadGen} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Keyword</label>
            <input
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Location</label>
            <input
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:scale-[1.02]"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Scraping & Enriching..." : "Start Pipeline"}
        </button>
      </form>
    </div>
  );
}
