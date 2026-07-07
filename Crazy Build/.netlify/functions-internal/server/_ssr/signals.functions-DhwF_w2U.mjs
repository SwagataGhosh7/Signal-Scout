import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-C2gC88Hf.mjs";
import { At as unionType, Dt as objectType, Et as numberType, Ot as recordType, Tt as enumType, jt as unknownType, kt as stringType, wt as arrayType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-TAUNrjZd.mjs";
import { t as generateText } from "../_libs/ai.mjs";
import { t as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signals.functions-DhwF_w2U.js
function createLovableAiGatewayProvider(lovableApiKey) {
	return createOpenAICompatible({
		name: "lovable",
		baseURL: "https://ai.gateway.lovable.dev/v1",
		headers: {
			"Lovable-API-Key": lovableApiKey,
			"X-Lovable-AIG-SDK": "vercel-ai-sdk"
		}
	});
}
function requireLovableApiKey() {
	const key = process.env.LOVABLE_API_KEY || process.env.VITE_LOVABLE_API_KEY || process.env.LOVABLE_AI_API_KEY;
	if (!key) throw new Error("LOVABLE_API_KEY is not configured. Add LOVABLE_API_KEY (or VITE_LOVABLE_API_KEY) to your environment before harvesting signals.");
	return key;
}
function createGroqProvider() {
	const key = process.env.GROQ_API_KEY;
	if (!key) throw new Error("GROQ_API_KEY is not configured");
	return createOpenAICompatible({
		name: "groq",
		baseURL: "https://api.groq.com/openai/v1",
		headers: { Authorization: `Bearer ${key}` }
	});
}
var GROQ_MODEL = "llama-3.3-70b-versatile";
var MODEL = "google/gemini-3-flash-preview";
var HARVEST_MODEL = GROQ_MODEL;
async function getReportModel() {
	try {
		return createGroqProvider()(GROQ_MODEL);
	} catch {
		return createLovableAiGatewayProvider(requireLovableApiKey())(MODEL);
	}
}
function extractJsonPayload(text) {
	const candidate = (text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] ?? text).trim();
	const firstBrace = candidate.indexOf("{");
	const lastBrace = candidate.lastIndexOf("}");
	if (firstBrace !== -1 && lastBrace > firstBrace) return candidate.slice(firstBrace, lastBrace + 1);
	return candidate;
}
var listTargets_createServerFn_handler = createServerRpc({
	id: "3945fd4eee79049bf4a4ba565eda69b2564fd29c7c3c0951f61e43c5f8f7b1e8",
	name: "listTargets",
	filename: "src/lib/signals.functions.ts"
}, (opts) => listTargets.__executeServer(opts));
var listTargets = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listTargets_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("targets").select("*").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var addTarget_createServerFn_handler = createServerRpc({
	id: "5cbfe9e676dd92d8a6d7dd259a5567987329c2609eda3ca5e209ce41206b7899",
	name: "addTarget",
	filename: "src/lib/signals.functions.ts"
}, (opts) => addTarget.__executeServer(opts));
var addTarget = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	company_name: stringType().min(1).max(120),
	domain: stringType().max(120).optional().nullable(),
	industry: stringType().max(80).optional().nullable(),
	notes: stringType().max(2e3).optional().nullable()
}).parse(input)).handler(addTarget_createServerFn_handler, async ({ data, context }) => {
	const { data: row, error } = await context.supabase.from("targets").insert({
		user_id: context.userId,
		company_name: data.company_name,
		domain: data.domain ?? null,
		industry: data.industry ?? null,
		notes: data.notes ?? null
	}).select().single();
	if (error) throw new Error(error.message);
	return row;
});
var deleteTarget_createServerFn_handler = createServerRpc({
	id: "9b742c4e37703b2c86f28bb4db9adcd214373e0514cd38380b6f0b385efcbdb7",
	name: "deleteTarget",
	filename: "src/lib/signals.functions.ts"
}, (opts) => deleteTarget.__executeServer(opts));
var deleteTarget = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(deleteTarget_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("targets").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var listSignals_createServerFn_handler = createServerRpc({
	id: "57ced6ee7611bd5f7344fea8678cb4ae9b04ab64f498f66c134019ce46be98b0",
	name: "listSignals",
	filename: "src/lib/signals.functions.ts"
}, (opts) => listSignals.__executeServer(opts));
var listSignals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listSignals_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("signals").select("*").order("detected_at", { ascending: false }).limit(200);
	if (error) throw new Error(error.message);
	return data ?? [];
});
var listLeads_createServerFn_handler = createServerRpc({
	id: "ffa7581e988648f994aac7eb400d14eabe425202c56cfefce554fd84597cd602",
	name: "listLeads",
	filename: "src/lib/signals.functions.ts"
}, (opts) => listLeads.__executeServer(opts));
var listLeads = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listLeads_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("leads").select("*").order("score", { ascending: false }).limit(200);
	if (error) throw new Error(error.message);
	return data ?? [];
});
var updateLeadStatus_createServerFn_handler = createServerRpc({
	id: "3975930789e5863e3b3924b4a7919e7cef00b6761772c9acc4a487e7d22226bf",
	name: "updateLeadStatus",
	filename: "src/lib/signals.functions.ts"
}, (opts) => updateLeadStatus.__executeServer(opts));
var updateLeadStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	status: enumType([
		"new",
		"contacted",
		"qualified",
		"won",
		"lost"
	])
}).parse(input)).handler(updateLeadStatus_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("leads").update({
		status: data.status,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var SignalSchema = objectType({ signals: arrayType(objectType({
	signal_type: stringType(),
	title: stringType(),
	summary: stringType(),
	source: stringType(),
	intent: stringType(),
	urgency: stringType(),
	score: numberType(),
	rationale: stringType()
})) });
var harvestSignals_createServerFn_handler = createServerRpc({
	id: "641b15b59fd7e6fe2ef5de72abb30e9ae4e472a525364833167c5edc96f0906a",
	name: "harvestSignals",
	filename: "src/lib/signals.functions.ts"
}, (opts) => harvestSignals.__executeServer(opts));
var harvestSignals = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ target_id: stringType().uuid() }).parse(input)).handler(harvestSignals_createServerFn_handler, async ({ data, context }) => {
	const { data: target, error: tErr } = await context.supabase.from("targets").select("*").eq("id", data.target_id).single();
	if (tErr || !target) throw new Error(tErr?.message || "Target not found");
	let model;
	try {
		model = createGroqProvider()(HARVEST_MODEL);
	} catch {
		model = createLovableAiGatewayProvider(requireLovableApiKey())(MODEL);
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
	let parsed;
	try {
		const { text } = await generateText({
			model,
			prompt
		});
		const cleaned = extractJsonPayload(text);
		parsed = SignalSchema.parse(JSON.parse(cleaned));
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		throw new Error(`AI harvest failed: ${msg}`);
	}
	const signalRows = parsed.signals.map((s) => ({
		user_id: context.userId,
		target_id: target.id,
		signal_type: s.signal_type,
		title: s.title,
		summary: s.summary,
		source: s.source,
		intent: s.intent,
		raw: {
			urgency: s.urgency,
			score: s.score,
			rationale: s.rationale
		}
	}));
	const { data: insertedSignals, error: sErr } = await context.supabase.from("signals").insert(signalRows).select();
	if (sErr) throw new Error(sErr.message);
	const leadRows = parsed.signals.map((s, i) => ({
		s,
		id: insertedSignals?.[i]?.id
	})).filter((x) => x.s.score >= 55 && x.id).map((x) => ({
		user_id: context.userId,
		target_id: target.id,
		title: `${target.company_name}: ${x.s.title}`,
		rationale: x.s.rationale,
		score: Math.round(x.s.score),
		urgency: x.s.urgency,
		intent: x.s.intent,
		signal_ids: [x.id]
	}));
	if (leadRows.length > 0) {
		const { error: lErr } = await context.supabase.from("leads").insert(leadRows);
		if (lErr) throw new Error(lErr.message);
	}
	await context.supabase.from("targets").update({ last_harvested_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", target.id);
	return {
		signals_created: signalRows.length,
		leads_created: leadRows.length
	};
});
var OutreachSchema = objectType({
	subject: stringType(),
	body: stringType()
});
var generateOutreach_createServerFn_handler = createServerRpc({
	id: "0adde9f59c87ef328758ebaed6a26dc0e0c9dd7dcc9a33bf0b1f94fa22fbd861",
	name: "generateOutreach",
	filename: "src/lib/signals.functions.ts"
}, (opts) => generateOutreach.__executeServer(opts));
var generateOutreach = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ lead_id: stringType().uuid() }).parse(input)).handler(generateOutreach_createServerFn_handler, async ({ data, context }) => {
	const { data: lead } = await context.supabase.from("leads").select("*, targets(company_name, industry, domain)").eq("id", data.lead_id).single();
	if (!lead) throw new Error("Lead not found");
	let model;
	try {
		model = createGroqProvider()(GROQ_MODEL);
	} catch {
		model = createLovableAiGatewayProvider(requireLovableApiKey())(MODEL);
	}
	const target = lead.targets;
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
	let parsed;
	try {
		const { text } = await generateText({
			model,
			prompt
		});
		const cleaned = extractJsonPayload(text);
		parsed = OutreachSchema.parse(JSON.parse(cleaned));
	} catch {
		parsed = {
			subject: `Quick idea for ${target?.company_name ?? "you"}`,
			body: "I can help you turn this signal into a simple outreach note if you want to review it."
		};
	}
	const { data: draft, error } = await context.supabase.from("outreach_drafts").insert({
		user_id: context.userId,
		lead_id: lead.id,
		channel: "email",
		subject: parsed.subject,
		body: parsed.body
	}).select().single();
	if (error) throw new Error(error.message);
	if (lead.status === "new") await context.supabase.from("leads").update({ status: "contacted" }).eq("id", lead.id);
	return draft;
});
var listDrafts_createServerFn_handler = createServerRpc({
	id: "44e348c8d02e7d5624e56d81a7ac37be88a96c00f9b4e907ae9eb2ffa54e1171",
	name: "listDrafts",
	filename: "src/lib/signals.functions.ts"
}, (opts) => listDrafts.__executeServer(opts));
var listDrafts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listDrafts_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("outreach_drafts").select("*").order("created_at", { ascending: false }).limit(50);
	if (error) throw new Error(error.message);
	return data ?? [];
});
var REPORT_TEMPLATE_TYPES = {
	"Weekly Executive Digest": "Summary",
	"Monthly Intent Analytics": "Analysis",
	"Harvested Signals Audit Trail": "Data Log",
	"Prioritized B2B Leads Sheet": "Leads",
	"Sales Outreach Performance": "Performance"
};
var fetchReportData_createServerFn_handler = createServerRpc({
	id: "95122cc057e55eae343c4a7c4b36c49c1d7d1674bd849836c86931b959dbdff3",
	name: "fetchReportData",
	filename: "src/lib/signals.functions.ts"
}, (opts) => fetchReportData.__executeServer(opts));
var fetchReportData = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ template: stringType().min(1) }).parse(input)).handler(fetchReportData_createServerFn_handler, async ({ data, context }) => {
	const [targetsRes, signalsRes, leadsRes, draftsRes] = await Promise.all([
		context.supabase.from("targets").select("id, company_name, industry, domain, created_at, last_harvested_at, notes").order("created_at", { ascending: false }),
		context.supabase.from("signals").select("id, title, summary, signal_type, source, intent, detected_at, target_id").order("detected_at", { ascending: false }).limit(200),
		context.supabase.from("leads").select("id, title, score, urgency, intent, status, created_at, target_id").order("score", { ascending: false }).limit(200),
		context.supabase.from("outreach_drafts").select("id, subject, channel, created_at, lead_id").order("created_at", { ascending: false }).limit(200)
	]);
	if (targetsRes.error) throw new Error(targetsRes.error.message);
	if (signalsRes.error) throw new Error(signalsRes.error.message);
	if (leadsRes.error) throw new Error(leadsRes.error.message);
	if (draftsRes.error) throw new Error(draftsRes.error.message);
	const targets = targetsRes.data ?? [];
	const signals = signalsRes.data ?? [];
	const leads = leadsRes.data ?? [];
	const drafts = draftsRes.data ?? [];
	const avgScore = leads.length ? Math.round(leads.reduce((sum, lead) => sum + (lead.score ?? 0), 0) / leads.length) : 0;
	const highUrgency = leads.filter((lead) => lead.urgency === "high").length;
	const qualifiedLeads = leads.filter((lead) => lead.status === "qualified").length;
	const byIntent = {};
	leads.forEach((lead) => {
		if (lead.intent) byIntent[lead.intent] = (byIntent[lead.intent] ?? 0) + 1;
	});
	let tableRows = [];
	switch (data.template) {
		case "Weekly Executive Digest":
			tableRows = signals.slice(0, 20).map((signal) => ({
				title: signal.title,
				type: signal.signal_type,
				intent: signal.intent,
				source: signal.source,
				detected_at: signal.detected_at
			}));
			break;
		case "Monthly Intent Analytics":
			tableRows = leads.slice(0, 20).map((lead) => ({
				title: lead.title,
				score: lead.score,
				urgency: lead.urgency,
				intent: lead.intent,
				status: lead.status,
				created_at: lead.created_at
			}));
			break;
		case "Harvested Signals Audit Trail":
			tableRows = signals.slice(0, 50).map((signal) => ({
				title: signal.title,
				summary: signal.summary,
				type: signal.signal_type,
				source: signal.source,
				intent: signal.intent,
				detected_at: signal.detected_at
			}));
			break;
		case "Prioritized B2B Leads Sheet":
			tableRows = leads.slice(0, 50).map((lead) => ({
				title: lead.title,
				score: lead.score,
				urgency: lead.urgency,
				intent: lead.intent,
				status: lead.status,
				created_at: lead.created_at
			}));
			break;
		case "Sales Outreach Performance":
			tableRows = drafts.slice(0, 40).map((draft) => ({
				subject: draft.subject,
				channel: draft.channel,
				created_at: draft.created_at,
				lead_id: draft.lead_id
			}));
			break;
		default:
			tableRows = signals.slice(0, 20).map((signal) => ({
				title: signal.title,
				type: signal.signal_type,
				source: signal.source,
				intent: signal.intent
			}));
			break;
	}
	return {
		title: data.template,
		reportType: REPORT_TEMPLATE_TYPES[data.template] ?? "Summary",
		generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		stats: {
			targets: targets.length,
			signals: signals.length,
			leads: leads.length,
			drafts: drafts.length,
			avgScore,
			highUrgency,
			qualifiedLeads,
			topIntent: Object.entries(byIntent).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "n/a"
		},
		tableRows
	};
});
var generateReportSummary_createServerFn_handler = createServerRpc({
	id: "511273ba4a616c33a3fc02a7e971e71c760ee7d36ad8fc34d675c902ba209ddb",
	name: "generateReportSummary",
	filename: "src/lib/signals.functions.ts"
}, (opts) => generateReportSummary.__executeServer(opts));
var generateReportSummary = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ payload: objectType({
	title: stringType(),
	reportType: stringType(),
	stats: recordType(unionType([stringType(), numberType()])),
	tableRows: arrayType(recordType(unknownType())).optional().default([])
}).passthrough() }).parse(input)).handler(generateReportSummary_createServerFn_handler, async ({ data, context }) => {
	const payload = data.payload;
	const prompt = `Write a concise executive-summary paragraph for a B2B sales reporting deck. Use the metrics below as facts and keep it professional, specific, and forward-looking.\n\nTemplate: ${payload.title}\nType: ${payload.reportType}\nStats: ${JSON.stringify(payload.stats)}\nRows: ${JSON.stringify(payload.tableRows.slice(0, 8))}\n\nReturn one short paragraph with 3-5 sentences.`;
	try {
		const { text } = await generateText({
			model: await getReportModel(),
			prompt
		});
		return { summary: text.replace(/\s+/g, " ").trim() || fallbackSummary(payload) };
	} catch {
		return { summary: fallbackSummary(payload) };
	}
});
function fallbackSummary(payload) {
	return `The ${payload.title.toLowerCase()} report highlights ${payload.stats.targets ?? 0} tracked targets, ${payload.stats.signals ?? 0} harvested signals, ${payload.stats.leads ?? 0} active leads, and ${payload.stats.drafts ?? 0} outreach drafts. The current momentum suggests the pipeline is progressing steadily, with ${payload.stats.avgScore ?? 0} average lead score and ${payload.stats.highUrgency ?? 0} high-urgency opportunities to prioritize. Next steps should focus on follow-up, qualification, and conversion sequencing.`;
}
var saveReport_createServerFn_handler = createServerRpc({
	id: "87e9aa24a91928b73f724c2ff85d61f5df840a40f39128f2f80cdc5986084efd",
	name: "saveReport",
	filename: "src/lib/signals.functions.ts"
}, (opts) => saveReport.__executeServer(opts));
var saveReport = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	title: stringType().min(1),
	report_type: stringType().min(1),
	format: enumType([
		"PDF",
		"CSV",
		"Excel"
	]),
	file_name: stringType().min(1),
	file_size: stringType().min(1),
	download_url: stringType().nullable().optional(),
	status: stringType().optional().default("ready")
}).parse(input)).handler(saveReport_createServerFn_handler, async ({ data, context }) => {
	const { data: row, error } = await context.supabase.from("reports").insert({
		user_id: context.userId,
		title: data.title,
		report_type: data.report_type,
		format: data.format,
		file_name: data.file_name,
		file_size: data.file_size,
		download_url: data.download_url ?? null,
		status: data.status
	}).select().single();
	if (error) {
		console.error("[saveReport] Supabase insert failed:", error);
		throw new Error(`${error.code ?? "SUPABASE_ERROR"}: ${error.message}`);
	}
	return row;
});
var listReports_createServerFn_handler = createServerRpc({
	id: "f9fd6fdb7773d2a6c78e064a058032eee6ecc5d0b9dbbe51ff922ec5e96d11e5",
	name: "listReports",
	filename: "src/lib/signals.functions.ts"
}, (opts) => listReports.__executeServer(opts));
var listReports = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listReports_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("reports").select("*").eq("user_id", context.userId).order("created_at", { ascending: false });
	if (error) {
		console.error("[listReports] Supabase select failed:", error);
		throw new Error(`${error.code ?? "SUPABASE_ERROR"}: ${error.message}`);
	}
	return data ?? [];
});
var deleteReport_createServerFn_handler = createServerRpc({
	id: "f6d8c1874e63fc47ccae2e6f6199fdb679fac6cda8f286220aaa14bbf2b50628",
	name: "deleteReport",
	filename: "src/lib/signals.functions.ts"
}, (opts) => deleteReport.__executeServer(opts));
var deleteReport = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(deleteReport_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("reports").delete().eq("id", data.id).eq("user_id", context.userId);
	if (error) {
		console.error("[deleteReport] Supabase delete failed:", error);
		throw new Error(`${error.code ?? "SUPABASE_ERROR"}: ${error.message}`);
	}
	return { ok: true };
});
var dashboardStats_createServerFn_handler = createServerRpc({
	id: "ed9b26d4654b2ca90dc290a59bebb43fd72592c21cdfa95a9e775e5da0a72122",
	name: "dashboardStats",
	filename: "src/lib/signals.functions.ts"
}, (opts) => dashboardStats.__executeServer(opts));
var dashboardStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(dashboardStats_createServerFn_handler, async ({ context }) => {
	const [t, s, l, d] = await Promise.all([
		context.supabase.from("targets").select("id", {
			count: "exact",
			head: true
		}),
		context.supabase.from("signals").select("id", {
			count: "exact",
			head: true
		}),
		context.supabase.from("leads").select("id, score, urgency, intent, status"),
		context.supabase.from("outreach_drafts").select("id", {
			count: "exact",
			head: true
		})
	]);
	const leads = l.data ?? [];
	const avgScore = leads.length ? Math.round(leads.reduce((a, b) => a + b.score, 0) / leads.length) : 0;
	const highUrgency = leads.filter((x) => x.urgency === "high").length;
	const byIntent = {};
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
		byIntent
	};
});
//#endregion
export { addTarget_createServerFn_handler, dashboardStats_createServerFn_handler, deleteReport_createServerFn_handler, deleteTarget_createServerFn_handler, fetchReportData_createServerFn_handler, generateOutreach_createServerFn_handler, generateReportSummary_createServerFn_handler, harvestSignals_createServerFn_handler, listDrafts_createServerFn_handler, listLeads_createServerFn_handler, listReports_createServerFn_handler, listSignals_createServerFn_handler, listTargets_createServerFn_handler, saveReport_createServerFn_handler, updateLeadStatus_createServerFn_handler };
