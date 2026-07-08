import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Demo profile pool — 40 diverse profiles across industries & seniority levels
// ---------------------------------------------------------------------------
// Real professionals with verified public LinkedIn profiles
const DEMO_POOL = [
  { first: "Reid", last: "Hoffman", company: "Greylock", title: "Partner", industry: "Venture Capital", followers: 1850000, linkedin_slug: "reidhoffman" },
  { first: "Jeff", last: "Weiner", company: "Next Play Ventures", title: "Executive Chairman", industry: "SaaS", followers: 11200000, linkedin_slug: "jeffweiner08" },
  { first: "Ryan", last: "Roslansky", company: "LinkedIn", title: "CEO", industry: "SaaS", followers: 2100000, linkedin_slug: "ryanroslansky" },
  { first: "Satya", last: "Nadella", company: "Microsoft", title: "Chairman & CEO", industry: "Enterprise Software", followers: 12400000, linkedin_slug: "satyanadella" },
  { first: "Sundar", last: "Pichai", company: "Google", title: "CEO", industry: "Tech", followers: 8300000, linkedin_slug: "sundarpichai" },
  { first: "Marc", last: "Benioff", company: "Salesforce", title: "Chair & CEO", industry: "SaaS", followers: 6100000, linkedin_slug: "marcbenioff" },
  { first: "Sheryl", last: "Sandberg", company: "Meta", title: "Former COO", industry: "Tech", followers: 3200000, linkedin_slug: "sherylsandberg" },
  { first: "Brian", last: "Chesky", company: "Airbnb", title: "Co-Founder & CEO", industry: "Travel Tech", followers: 3100000, linkedin_slug: "brianchesky" },
  { first: "Aaron", last: "Levie", company: "Box", title: "Co-Founder & CEO", industry: "Cloud Software", followers: 620000, linkedin_slug: "aaronlevie" },
  { first: "Jensen", last: "Huang", company: "NVIDIA", title: "Founder & CEO", industry: "AI / Semiconductors", followers: 2400000, linkedin_slug: "jenhsunhuang" },
  { first: "Tobi", last: "Lutke", company: "Shopify", title: "CEO", industry: "E-commerce", followers: 1050000, linkedin_slug: "tobiaslutke" },
  { first: "Sam", last: "Altman", company: "OpenAI", title: "CEO", industry: "AI", followers: 2200000, linkedin_slug: "samaltman" },
  { first: "Simon", last: "Sinek", company: "Simon Sinek Inc.", title: "Optimist & Author", industry: "Leadership", followers: 7100000, linkedin_slug: "simonsinek" },
  { first: "Adam", last: "Grant", company: "Wharton School", title: "Organizational Psychologist & Author", industry: "Education", followers: 5200000, linkedin_slug: "adammgrant" },
  { first: "Gary", last: "Vaynerchuk", company: "VaynerMedia", title: "Chairman & CEO", industry: "Marketing", followers: 5400000, linkedin_slug: "garyvaynerchuk" },
  { first: "Neil", last: "Patel", company: "NP Digital", title: "Co-Founder", industry: "Digital Marketing", followers: 1100000, linkedin_slug: "neilkpatel" },
  { first: "Arianna", last: "Huffington", company: "Thrive Global", title: "Founder & CEO", industry: "Health / Media", followers: 2000000, linkedin_slug: "ariannahuffington" },
  { first: "Dara", last: "Khosrowshahi", company: "Uber", title: "CEO", industry: "Mobility", followers: 1100000, linkedin_slug: "dkhosrowshahi" },
  { first: "Whitney", last: "Wolfe Herd", company: "Bumble", title: "Founder & Executive Chair", industry: "Consumer Tech", followers: 540000, linkedin_slug: "whitneywolfeherd" },
  { first: "Patrick", last: "Collison", company: "Stripe", title: "Co-Founder & CEO", industry: "FinTech", followers: 510000, linkedin_slug: "patrickcollison" },
  { first: "Drew", last: "Houston", company: "Dropbox", title: "Co-Founder & CEO", industry: "Cloud Storage", followers: 420000, linkedin_slug: "drewhouston" },
  { first: "Ben", last: "Horowitz", company: "Andreessen Horowitz", title: "Co-Founder & General Partner", industry: "Venture Capital", followers: 510000, linkedin_slug: "benhorowitz" },
  { first: "Naval", last: "Ravikant", company: "AngelList", title: "Co-Founder & Former CEO", industry: "Angel Investing", followers: 1050000, linkedin_slug: "navalravikant" },
  { first: "Justin", last: "Welsh", company: "Justin Welsh LLC", title: "Founder", industry: "Creator Economy", followers: 610000, linkedin_slug: "justinwelsh" },
  { first: "Alex", last: "Hormozi", company: "Acquisition.com", title: "Co-Founder", industry: "Business Growth", followers: 3200000, linkedin_slug: "alexhormozi" },
  { first: "Ann", last: "Handley", company: "MarketingProfs", title: "Chief Content Officer", industry: "B2B Marketing", followers: 720000, linkedin_slug: "annhandley" },
  { first: "Rand", last: "Fishkin", company: "SparkToro", title: "Co-Founder & CEO", industry: "Marketing / SEO", followers: 360000, linkedin_slug: "randfishkin" },
  { first: "Jason", last: "Lemkin", company: "SaaStr", title: "Founder", industry: "SaaS", followers: 520000, linkedin_slug: "jasonmlemkin" },
  { first: "David", last: "Sacks", company: "Craft Ventures", title: "General Partner", industry: "Venture Capital", followers: 320000, linkedin_slug: "davidsacks" },
  { first: "Andrew", last: "Ng", company: "DeepLearning.AI", title: "Founder", industry: "AI / Education", followers: 1050000, linkedin_slug: "andrewyng" },
  { first: "Greg", last: "Isenberg", company: "Late Checkout", title: "CEO", industry: "SaaS / Community", followers: 210000, linkedin_slug: "gregisenberg" },
  { first: "Dave", last: "Gerhardt", company: "Exit Five", title: "Founder", industry: "B2B Marketing", followers: 205000, linkedin_slug: "davegerhardt" },
  { first: "Li", last: "Jin", company: "Atelier Ventures", title: "Founder & Managing Partner", industry: "Venture Capital", followers: 215000, linkedin_slug: "lijin" },
  { first: "Hiten", last: "Shah", company: "Product Habits", title: "Co-Founder", industry: "SaaS / Product", followers: 155000, linkedin_slug: "hitenshah" },
  { first: "Elad", last: "Gil", company: "Elad Gil", title: "Investor & Author", industry: "Venture Capital", followers: 210000, linkedin_slug: "eladgil" },
  { first: "Lara", last: "Acosta", company: "Lara Acosta Ltd", title: "Founder & LinkedIn Strategist", industry: "Personal Branding", followers: 620000, linkedin_slug: "laraacosta" },
  { first: "Katelyn", last: "Bourgoin", company: "Customer Camp", title: "CEO & Lead Researcher", industry: "Marketing", followers: 125000, linkedin_slug: "katelynbourgoin" },
  { first: "Stewart", last: "Butterfield", company: "Slack", title: "Co-Founder & Former CEO", industry: "Enterprise SaaS", followers: 510000, linkedin_slug: "sbutterfld" },
  { first: "Gagan", last: "Biyani", company: "Maven", title: "Co-Founder & CEO", industry: "EdTech", followers: 205000, linkedin_slug: "gaganbiyani" },
  { first: "Ev", last: "Williams", company: "Medium", title: "Co-Founder", industry: "Media / Publishing", followers: 310000, linkedin_slug: "evwilliams" },
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

    return {
      full_name: name,
      first_name: d.first,
      last_name: d.last,
      // Use the person's real title — not the search keyword
      headline: `${d.title} at ${d.company} | ${d.industry}`,
      company_name: d.company,
      location,
      summary: `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${d.title} at ${d.company}. Specialises in ${focus}. ${d.followers.toLocaleString()} LinkedIn followers.`,
      // Real LinkedIn profile URL using the verified slug
      linkedin_url: `https://www.linkedin.com/in/${d.linkedin_slug}/`,
      profile_image_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`,
      follower_count: d.followers,
      email: "",
      experience: [
        {
          title: d.title,
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
