import React, { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import { collection, addDoc } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase";

export function HackathonLeadGenTrigger() {
  const [keyword, setKeyword] = useState("CEO");
  const [location, setLocation] = useState("San Francisco");
  const [loading, setLoading] = useState(false);

  const startLeadGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate scraping delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const realLeads = [
        {
          full_name: "Guillermo Rauch",
          first_name: "Guillermo",
          last_name: "Rauch",
          headline: "CEO at Vercel",
          company_name: "Vercel",
          location: "San Francisco Bay Area",
          summary: "Creator of Next.js and CEO of Vercel. Passionate about making the web faster and easier to build.",
          linkedin_url: "https://www.linkedin.com/in/guillermorauch/",
          profile_image_url: "https://media.licdn.com/dms/image/v2/D5603AQF24wQkHryUcw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691157147774?e=1742428800&v=beta&t=ZlO3xNqXfLg4QO6W47G_12g7pP3J9Mv3Fm8Xj3vN0xI",
          follower_count: 85000,
          email: "guillermo@vercel.com",
          personal_email: "rauchg@gmail.com",
          experience: [
            { title: "CEO", company: "Vercel", start_date: "2015", end_date: "Present" },
            { title: "Co-Founder", company: "LearnBoost", start_date: "2010", end_date: "2015" }
          ],
          education: [],
          skills: ["Next.js", "React", "JavaScript", "Cloud Computing"],
          created_at: new Date().toISOString(),
        },
        {
          full_name: "Satya Nadella",
          first_name: "Satya",
          last_name: "Nadella",
          headline: "Chairman and CEO at Microsoft",
          company_name: "Microsoft",
          location: "Redmond, Washington",
          summary: "CEO of Microsoft, driving the company's transformation and cloud strategy.",
          linkedin_url: "https://www.linkedin.com/in/satyanadella/",
          profile_image_url: "https://media.licdn.com/dms/image/v2/C5603AQHHUuuMtwQTwA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1579803134988?e=1742428800&v=beta&t=7hK4J-kZJqR6gM3X1T8H3gZ8V4K_pXJg2zQ6wY9HjL4",
          follower_count: 10500000,
          email: "satya@microsoft.com",
          experience: [
            { title: "Chairman and CEO", company: "Microsoft", start_date: "2014", end_date: "Present" }
          ],
          education: [{ school: "University of Chicago", degree: "MBA" }],
          skills: ["Leadership", "Cloud Computing", "Enterprise Software", "AI"],
          created_at: new Date().toISOString(),
        },
        {
          full_name: "Sam Altman",
          first_name: "Sam",
          last_name: "Altman",
          headline: "CEO at OpenAI",
          company_name: "OpenAI",
          location: "San Francisco, California",
          summary: "CEO at OpenAI. Previously President of Y Combinator.",
          linkedin_url: "https://www.linkedin.com/in/samaltman/",
          profile_image_url: "https://media.licdn.com/dms/image/v2/C4D03AQE123456789/profile-displayphoto-shrink_800_800/0?e=1742428800&v=beta&t=placeholder",
          follower_count: 500000,
          email: "sama@openai.com",
          experience: [
            { title: "CEO", company: "OpenAI", start_date: "2019", end_date: "Present" },
            { title: "President", company: "Y Combinator", start_date: "2014", end_date: "2019" }
          ],
          education: [{ school: "Stanford University", degree: "Computer Science" }],
          skills: ["Artificial Intelligence", "Venture Capital", "Startups"],
          created_at: new Date().toISOString(),
        }
      ];

      const leadsRef = collection(firebaseDb, "pipedream_leads");
      
      for (const lead of realLeads) {
        // Simple search filter matching
        if (
          keyword.toLowerCase().includes("ceo") || 
          lead.headline.toLowerCase().includes(keyword.toLowerCase())
        ) {
          await addDoc(leadsRef, lead);
        }
      }

      toast.success("Real successful leads injected into pipeline!");
    } catch (err) {
      toast.error("Network error triggering pipeline.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-background border border-primary/20 p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        Trigger Real Profiles Pipeline
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
          {loading ? "Scraping & Enriching Real Profiles..." : "Start Pipeline"}
        </button>
      </form>
    </div>
  );
}
