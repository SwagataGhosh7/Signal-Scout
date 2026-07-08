import React, { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import { collection, addDoc } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase";
import { scrapeLinkedInRealTime } from "@/lib/apify.server";

export function HackathonLeadGenTrigger() {
  const [keyword, setKeyword] = useState("CEO");
  const [location, setLocation] = useState("San Francisco");
  const [loading, setLoading] = useState(false);

  const startLeadGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call our Apify server function
      const realLeads = await scrapeLinkedInRealTime({ data: { keyword, location } });

      if (!realLeads || realLeads.length === 0) {
        toast.warning("Scraper finished, but no leads were found for this query.");
        setLoading(false);
        return;
      }

      const leadsRef = collection(firebaseDb, "pipedream_leads");
      
      let addedCount = 0;
      for (const lead of realLeads) {
        await addDoc(leadsRef, lead);
        addedCount++;
      }

      toast.success(`Successfully injected ${addedCount} real profiles from LinkedIn!`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Network error triggering pipeline.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-background border border-primary/20 p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        Trigger Real Profiles Pipeline (via Apify)
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
          {loading ? "Scraping Real-Time LinkedIn Profiles..." : "Start Apify Pipeline"}
        </button>
      </form>
    </div>
  );
}
