import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function generateDemoProfiles(keyword: string, location: string) {
  const roles = keyword.split(" ").slice(0, 2).join(" ") || "Professional";
  const demos = [
    { first: "James", last: "Mitchell", company: "Acme Corp" },
    { first: "Sarah", last: "Thompson", company: "Nexus Solutions" },
    { first: "David", last: "Chen", company: "TechBridge Inc" },
    { first: "Emily", last: "Rodriguez", company: "Vertex Capital" },
    { first: "Michael", last: "Okafor", company: "PrimePath Ltd" },
    { first: "Priya", last: "Sharma", company: "BlueWave Analytics" },
  ];

  return demos.map((d) => {
    const name = `${d.first} ${d.last}`;
    return {
      full_name: name,
      first_name: d.first,
      last_name: d.last,
      headline: `${roles} at ${d.company}`,
      company_name: d.company,
      location,
      summary: `Experienced ${roles.toLowerCase()} based in ${location} with a strong track record in the industry.`,
      linkedin_url: `https://linkedin.com/in/${d.first.toLowerCase()}-${d.last.toLowerCase()}`,
      profile_image_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      follower_count: Math.floor(Math.random() * 5000) + 500,
      email: "",
      experience: [],
      education: [],
      skills: [],
      created_at: new Date().toISOString(),
      is_demo: true,
    };
  });
}

export const scrapeLinkedInRealTime = createServerFn({ method: "POST" })
  .validator(
    z.object({
      keyword: z.string(),
      location: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const googleApiKey = process.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY || "";
    const googleCseId = process.env.VITE_GOOGLE_CSE_ID || process.env.GOOGLE_CSE_ID || "";

    if (!googleApiKey || !googleCseId) {
      console.warn("Missing Google Search credentials — returning demo data.");
      return generateDemoProfiles(data.keyword, data.location);
    }

    const searchQuery = `site:linkedin.com/in/ ${data.keyword} ${data.location}`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCseId}&q=${encodeURIComponent(searchQuery)}&num=10`;

    try {
      console.log("Triggering Google Custom Search with query:", searchQuery);
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(
          `Google Search API error (${response.status}) — returning demo data.\n${errorText}`
        );
        return generateDemoProfiles(data.keyword, data.location);
      }

      const result = await response.json();
      const items = result.items || [];

      console.log(`Google Search completed. Found ${items.length} items.`);

      if (items.length === 0) {
        console.warn("No results from Google Custom Search — returning demo data.");
        return generateDemoProfiles(data.keyword, data.location);
      }

      return items.map((item: any) => {
        const titleParts = item.title.split(" - ");
        const name = titleParts[0]?.replace(" | LinkedIn", "") || "LinkedIn User";
        const headline = titleParts[1] || "Professional";

        return {
          full_name: name,
          first_name: name.split(" ")[0] || "",
          last_name: name.split(" ").slice(1).join(" ") || "",
          headline,
          company_name: "Check LinkedIn Profile",
          location: data.location,
          summary: item.snippet || "",
          linkedin_url: item.link || "",
          profile_image_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
          follower_count: Math.floor(Math.random() * 5000),
          email: "",
          experience: [],
          education: [],
          skills: [],
          created_at: new Date().toISOString(),
          is_demo: false,
        };
      });
    } catch (err: any) {
      console.error("Google scraping failed — returning demo data:", err);
      return generateDemoProfiles(data.keyword, data.location);
    }
  });
