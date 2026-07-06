import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider, requireLovableApiKey } from "./ai-gateway.server";
import { createGroqProvider, GROQ_MODEL } from "./groq.server";

const MODEL = "google/gemini-3-flash-preview";
const HARVEST_MODEL = GROQ_MODEL;

function extractJsonPayload(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = (fenced?.[1] ?? text).trim();
  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return candidate.slice(firstBrace, lastBrace + 1);
  }

  return candidate;
}

// ---------- Targets ----------

export const listTargets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("targets")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const addTarget = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        company_name: z.string().min(1).max(120),
        domain: z.string().max(120).optional().nullable(),
        industry: z.string().max(80).optional().nullable(),
        notes: z.string().max(2000).optional().nullable(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("targets")
      .insert({
        user_id: context.userId,
        company_name: data.company_name,
        domain: data.domain ?? null,
        industry: data.industry ?? null,
        notes: data.notes ?? null,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteTarget = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("targets").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Signals + Leads ----------

export const listSignals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("signals")
      .select("*")
      .order("detected_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("leads")
      .select("*")
      .order("score", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "contacted", "qualified", "won", "lost"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("leads")
      .update({ status: data.status, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Harvest signals via AI ----------

const SignalSchema = z.object({
  signals: z.array(
    z.object({
      signal_type: z.string(),
      title: z.string(),
      summary: z.string(),
      source: z.string(),
      intent: z.string(),
      urgency: z.string(),
      score: z.number(),
      rationale: z.string(),
    }),
  ),
});

export const harvestSignals = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ target_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    // Load target
    const { data: target, error: tErr } = await context.supabase
      .from("targets")
      .select("*")
      .eq("id", data.target_id)
      .single();
    if (tErr || !target) throw new Error(tErr?.message || "Target not found");

    let model;
    try {
      const groq = createGroqProvider();
      model = groq(HARVEST_MODEL);
    } catch {
      const gateway = createLovableAiGatewayProvider(requireLovableApiKey());
      model = gateway(MODEL);
    }

    const prompt = `You are a B2B sales-intelligence agent. Simulate a signal-harvesting scan for the company below and return 5-8 plausible, realistic BUYING/HIRING/PARTNERSHIP signals that a growth team would care about right now.

Company: ${target.company_name}
Domain: ${target.domain ?? "unknown"}
Industry: ${target.industry ?? "unknown"}
Notes: ${target.notes ?? "none"}

For each signal:
- signal_type: one of hiring | funding | product_launch | leadership_change | social | website_change | partnership | expansion
- title: short headline
- summary: 1-2 sentence description of what happened
- source: one of linkedin | twitter | news | jobs | web
- intent: one of buying | hiring | partnership | expansion | creator
- urgency: low | medium | high
- score: 0-100 opportunity score (higher = hotter)
- rationale: 1 sentence why this matters to a seller

Be realistic and specific. Vary types, urgencies, and scores.
Return ONLY valid JSON with this shape:
{"signals":[{"signal_type":"hiring","title":"","summary":"","source":"jobs","intent":"hiring","urgency":"high","score":90,"rationale":""}]}`;

    let parsed: z.infer<typeof SignalSchema>;
    try {
      const { text } = await generateText({
        model,
        prompt,
      });
      const cleaned = extractJsonPayload(text);
      parsed = SignalSchema.parse(JSON.parse(cleaned));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`AI harvest failed: ${msg}`);
    }

    // Insert signals
    const signalRows = parsed.signals.map((s) => ({
      user_id: context.userId,
      target_id: target.id,
      signal_type: s.signal_type,
      title: s.title,
      summary: s.summary,
      source: s.source,
      intent: s.intent,
      raw: { urgency: s.urgency, score: s.score, rationale: s.rationale } as unknown as never,
    }));

    const { data: insertedSignals, error: sErr } = await context.supabase
      .from("signals")
      .insert(signalRows)
      .select();
    if (sErr) throw new Error(sErr.message);

    // Create one lead per high-value cluster (score >= 60)
    const leadRows = parsed.signals
      .map((s, i) => ({ s, id: insertedSignals?.[i]?.id }))
      .filter((x) => x.s.score >= 55 && x.id)
      .map((x) => ({
        user_id: context.userId,
        target_id: target.id,
        title: `${target.company_name}: ${x.s.title}`,
        rationale: x.s.rationale,
        score: Math.round(x.s.score),
        urgency: x.s.urgency,
        intent: x.s.intent,
        signal_ids: [x.id!],
      }));

    if (leadRows.length > 0) {
      const { error: lErr } = await context.supabase.from("leads").insert(leadRows);
      if (lErr) throw new Error(lErr.message);
    }

    await context.supabase
      .from("targets")
      .update({ last_harvested_at: new Date().toISOString() })
      .eq("id", target.id);

    return { signals_created: signalRows.length, leads_created: leadRows.length };
  });

// ---------- Outreach ----------

const OutreachSchema = z.object({
  subject: z.string(),
  body: z.string(),
});

export const generateOutreach = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ lead_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: lead } = await context.supabase
      .from("leads")
      .select("*, targets(company_name, industry, domain)")
      .eq("id", data.lead_id)
      .single();
    if (!lead) throw new Error("Lead not found");

    // Outreach uses Groq (fast, low-latency) via the user-provided GROQ_API_KEY
    let model;
    try {
      const groq = createGroqProvider();
      model = groq(GROQ_MODEL);
    } catch {
      const gateway = createLovableAiGatewayProvider(requireLovableApiKey());
      model = gateway(MODEL);
    }

    const target = (lead as { targets?: { company_name?: string; industry?: string; domain?: string } })
      .targets;

    const prompt = `Write a concise, high-signal cold outreach email for a B2B sales rep.

Company: ${target?.company_name ?? "the target"}
Industry: ${target?.industry ?? "unknown"}
Opportunity: ${lead.title}
Why now: ${lead.rationale}
Detected intent: ${lead.intent}
Urgency: ${lead.urgency}

Rules:
- Under 90 words in the body
- Reference the specific signal naturally
- One clear call to action (15-min chat)
- Friendly, not salesy
- No hype words ("revolutionary", "game-changer")

Return ONLY valid JSON with this shape:
{"subject":"","body":""}`;

    let parsed: z.infer<typeof OutreachSchema>;
    try {
      const { text } = await generateText({
        model,
        prompt,
      });
      const cleaned = extractJsonPayload(text);
      parsed = OutreachSchema.parse(JSON.parse(cleaned));
    } catch {
      parsed = {
        subject: `Quick idea for ${target?.company_name ?? "you"}`,
        body: "I can help you turn this signal into a simple outreach note if you want to review it.",
      };
    }

    const { data: draft, error } = await context.supabase
      .from("outreach_drafts")
      .insert({
        user_id: context.userId,
        lead_id: lead.id,
        channel: "email",
        subject: parsed.subject,
        body: parsed.body,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    if (lead.status === "new") {
      await context.supabase.from("leads").update({ status: "contacted" }).eq("id", lead.id);
    }

    return draft;
  });

export const listDrafts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("outreach_drafts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

// ---------- Dashboard stats ----------

export const dashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [t, s, l, d] = await Promise.all([
      context.supabase.from("targets").select("id", { count: "exact", head: true }),
      context.supabase.from("signals").select("id", { count: "exact", head: true }),
      context.supabase.from("leads").select("id, score, urgency, intent, status"),
      context.supabase.from("outreach_drafts").select("id", { count: "exact", head: true }),
    ]);
    const leads = l.data ?? [];
    const avgScore = leads.length ? Math.round(leads.reduce((a, b) => a + b.score, 0) / leads.length) : 0;
    const highUrgency = leads.filter((x) => x.urgency === "high").length;
    const byIntent: Record<string, number> = {};
    leads.forEach((x) => {
      if (x.intent) byIntent[x.intent] = (byIntent[x.intent] ?? 0) + 1;
    });
    return {
      targets: t.count ?? 0,
      signals: s.count ?? 0,
      leads: leads.length,
      drafts: d.count ?? 0,
      avgScore,
      highUrgency,
      byIntent,
    };
  });
