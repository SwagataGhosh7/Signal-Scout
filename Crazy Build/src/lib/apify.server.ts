import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Demo profile pool — 40 diverse profiles across industries & seniority levels
// ---------------------------------------------------------------------------
const DEMO_POOL = [
  { first: "James", last: "Mitchell", company: "Acme Corp", title: "CEO", industry: "SaaS", followers: 4820 },
  { first: "Sarah", last: "Thompson", company: "Nexus Solutions", title: "VP of Sales", industry: "FinTech", followers: 3210 },
  { first: "David", last: "Chen", company: "TechBridge Inc", title: "CTO", industry: "AI", followers: 6740 },
  { first: "Emily", last: "Rodriguez", company: "Vertex Capital", title: "Managing Director", industry: "Venture Capital", followers: 5190 },
  { first: "Michael", last: "Okafor", company: "PrimePath Ltd", title: "Head of Growth", industry: "E-commerce", followers: 2880 },
  { first: "Priya", last: "Sharma", company: "BlueWave Analytics", title: "Chief Data Officer", industry: "Analytics", followers: 3990 },
  { first: "Lucas", last: "Fernandez", company: "Ironclad Software", title: "Founder & CEO", industry: "DevTools", followers: 7200 },
  { first: "Amara", last: "Nwosu", company: "GreenPath Energy", title: "Director of Partnerships", industry: "CleanTech", followers: 2450 },
  { first: "Oliver", last: "Bauer", company: "Stratix GmbH", title: "VP Engineering", industry: "Enterprise Software", followers: 3100 },
  { first: "Mei", last: "Tanaka", company: "PacificAI", title: "Chief Product Officer", industry: "AI/ML", followers: 5880 },
  { first: "Hassan", last: "Al-Rashid", company: "Orion Ventures", title: "General Partner", industry: "VC", followers: 8100 },
  { first: "Isabella", last: "Russo", company: "Luminary Media", title: "Chief Marketing Officer", industry: "Media", followers: 4350 },
  { first: "Ethan", last: "Park", company: "Cascade Systems", title: "Head of Product", industry: "SaaS", followers: 2670 },
  { first: "Fatima", last: "Malik", company: "NovaBuild", title: "Co-Founder & COO", industry: "PropTech", followers: 3780 },
  { first: "Noah", last: "Williams", company: "Pinnacle Health", title: "CEO", industry: "HealthTech", followers: 5490 },
  { first: "Ava", last: "Johnson", company: "QuantumLeap AI", title: "VP of Business Development", industry: "AI", followers: 4020 },
  { first: "Liam", last: "O'Brien", company: "Crestline Capital", title: "Investment Director", industry: "Private Equity", followers: 6300 },
  { first: "Zara", last: "Ahmed", company: "ClearPath Tech", title: "Director of Engineering", industry: "DevOps", followers: 2900 },
  { first: "Carlos", last: "Mendez", company: "Solaris Payments", title: "Founder & CTO", industry: "FinTech", followers: 4500 },
  { first: "Yuna", last: "Kim", company: "BrightMind EdTech", title: "Chief Growth Officer", industry: "EdTech", followers: 3200 },
  { first: "Benjamin", last: "Clarke", company: "Hyperion Logistics", title: "VP Operations", industry: "Supply Chain", followers: 2100 },
  { first: "Aisha", last: "Diallo", company: "Ember Studio", title: "Creative Director", industry: "Design", followers: 5700 },
  { first: "Felix", last: "Müller", company: "DataForge AG", title: "CEO", industry: "Data Infrastructure", followers: 4890 },
  { first: "Sofia", last: "Petrov", company: "NorthStar Robotics", title: "CTO", industry: "Robotics", followers: 3640 },
  { first: "Rajan", last: "Patel", company: "Apogee Capital", title: "Founding Partner", industry: "VC", followers: 7800 },
  { first: "Leila", last: "Hosseini", company: "Meridian Legal Tech", title: "CEO", industry: "LegalTech", followers: 2980 },
  { first: "Marcus", last: "Reed", company: "Drift Commerce", title: "Head of Sales", industry: "E-commerce", followers: 3420 },
  { first: "Camille", last: "Dupont", company: "Luxe Brand Co", title: "CMO", industry: "Luxury Retail", followers: 6100 },
  { first: "Tariq", last: "Hassan", company: "SecureNet Systems", title: "CISO", industry: "Cybersecurity", followers: 4250 },
  { first: "Nadia", last: "Volkov", company: "ArcticCloud", title: "VP Product", industry: "Cloud Infrastructure", followers: 3050 },
  { first: "Derek", last: "Stone", company: "Ironwood Analytics", title: "Chief Revenue Officer", industry: "SaaS", followers: 5320 },
  { first: "Ingrid", last: "Larsen", company: "NordicSaaS", title: "Founder & CEO", industry: "HR Tech", followers: 4670 },
  { first: "Kwame", last: "Asante", company: "AgriTech Africa", title: "CEO", industry: "AgriTech", followers: 3890 },
  { first: "Valentina", last: "Cruz", company: "Soleil Biotech", title: "Chief Scientific Officer", industry: "Biotech", followers: 2730 },
  { first: "Jordan", last: "Lee", company: "Mindful AI", title: "Co-Founder & CPO", industry: "Mental Health Tech", followers: 5010 },
  { first: "Ananya", last: "Krishnan", company: "Kaleidoscope Data", title: "Head of Data Science", industry: "Analytics", followers: 3560 },
  { first: "Patrick", last: "Nguyen", company: "Velo Mobility", title: "CTO", industry: "Mobility", followers: 4100 },
  { first: "Simone", last: "Abreu", company: "Pulse Fintech", title: "VP Growth", industry: "FinTech", followers: 2840 },
  { first: "Aaron", last: "Fischer", company: "Lighthouse Security", title: "CEO", industry: "Cybersecurity", followers: 6450 },
  { first: "Yemi", last: "Adeyemi", company: "PayStack Africa", title: "Director of Partnerships", industry: "Payments", followers: 3270 },
];

// In-memory set of indices already returned this session
const usedIndices = new Set<number>();

// Infer industry context from keyword for richer summaries
function inferContext(keyword: string): { adjective: string; focus: string } {
  const kw = keyword.toLowerCase();
  if (kw.includes("ceo") || kw.includes("founder") || kw.includes("president"))
    return { adjective: "visionary", focus: "company strategy, fundraising, and executive leadership" };
  if (kw.includes("cto") || kw.includes("engineering") || kw.includes("tech"))
    return { adjective: "technically driven", focus: "engineering culture, system architecture, and product delivery" };
  if (kw.includes("cmo") || kw.includes("marketing") || kw.includes("brand"))
    return { adjective: "creative", focus: "brand positioning, demand generation, and go-to-market strategy" };
  if (kw.includes("cfo") || kw.includes("finance") || kw.includes("financial"))
    return { adjective: "financially astute", focus: "financial planning, fundraising, and investor relations" };
  if (kw.includes("sales") || kw.includes("revenue") || kw.includes("business development"))
    return { adjective: "results-oriented", focus: "revenue growth, enterprise sales, and strategic partnerships" };
  if (kw.includes("product") || kw.includes("cpo"))
    return { adjective: "product-led", focus: "product roadmap, user research, and cross-functional execution" };
  if (kw.includes("data") || kw.includes("analytics") || kw.includes("ai") || kw.includes("ml"))
    return { adjective: "data-driven", focus: "AI/ML systems, analytics platforms, and data strategy" };
  if (kw.includes("vp") || kw.includes("director") || kw.includes("head of"))
    return { adjective: "strategic", focus: "team leadership, operational excellence, and growth initiatives" };
  return { adjective: "accomplished", focus: "driving growth and building high-performing teams" };
}

function generateDemoProfiles(keyword: string, location: string, count = 6) {
  // Use the full keyword as the role title so it matches the search filter exactly
  const searchedRole = keyword.trim() || "Professional";
  const { adjective, focus } = inferContext(keyword);

  // If we've used all profiles, reset the pool
  if (usedIndices.size >= DEMO_POOL.length) {
    usedIndices.clear();
  }

  // Get available (not-yet-shown) indices
  const available = DEMO_POOL
    .map((_, i) => i)
    .filter((i) => !usedIndices.has(i));

  // Fisher-Yates shuffle of available indices
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  // Pick `count` from the front
  const picked = available.slice(0, count);
  picked.forEach((i) => usedIndices.add(i));

  return picked.map((idx) => {
    const d = DEMO_POOL[idx];
    const name = `${d.first} ${d.last}`;
    // Slug includes role for realism: linkedin.com/in/james-mitchell-ceo
    const roleSlug = searchedRole.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const slug = `${d.first.toLowerCase()}-${d.last.toLowerCase()}-${roleSlug}`;

    return {
      full_name: name,
      first_name: d.first,
      last_name: d.last,
      // Title matches exactly what was searched, company from pool
      headline: `${searchedRole} at ${d.company} | ${d.industry} · ${location}`,
      company_name: d.company,
      location,
      summary: `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${searchedRole} at ${d.company} based in ${location}. Specialises in ${focus}. ${d.followers.toLocaleString()} followers on LinkedIn.`,
      linkedin_url: `https://linkedin.com/in/${slug}`,
      profile_image_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`,
      follower_count: d.followers,
      email: "",
      experience: [
        {
          title: searchedRole,
          company: d.company,
          location,
          duration: `${Math.floor(Math.random() * 5) + 1} yr${Math.random() > 0.5 ? "s" : ""} · ${location}`,
        },
      ],
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
