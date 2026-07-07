import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-C2gC88Hf.mjs";
import { Dt as objectType, kt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-TAUNrjZd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm.functions-xhhbjCff.js
var GATEWAY = "https://connector-gateway.lovable.dev/hubspot";
function crmHeaders() {
	const lovable = process.env.LOVABLE_API_KEY;
	const hubspot = process.env.HUBSPOT_API_KEY;
	if (!lovable || !hubspot) return null;
	return {
		Authorization: `Bearer ${lovable}`,
		"X-Connection-Api-Key": hubspot,
		"Content-Type": "application/json"
	};
}
var crmStatus_createServerFn_handler = createServerRpc({
	id: "5008561f597b367bb8b3dc4156a69314d2ff92c5d4ec2615a45fd872eb3db448",
	name: "crmStatus",
	filename: "src/lib/crm.functions.ts"
}, (opts) => crmStatus.__executeServer(opts));
var crmStatus = createServerFn({ method: "GET" }).handler(crmStatus_createServerFn_handler, async () => {
	return { connected: Boolean(process.env.HUBSPOT_API_KEY && process.env.LOVABLE_API_KEY) };
});
var syncLeadToCrm_createServerFn_handler = createServerRpc({
	id: "47c15f1df63254f74c0507f4ebf29e6fb75b773a5552bb01177d07aae60f777a",
	name: "syncLeadToCrm",
	filename: "src/lib/crm.functions.ts"
}, (opts) => syncLeadToCrm.__executeServer(opts));
var syncLeadToCrm = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ lead_id: stringType().uuid() }).parse(input)).handler(syncLeadToCrm_createServerFn_handler, async ({ data, context }) => {
	const headers = crmHeaders();
	if (!headers) return {
		skipped: true,
		reason: "crm_not_connected"
	};
	const { data: lead, error } = await context.supabase.from("leads").select("*, targets(company_name, domain, industry)").eq("id", data.lead_id).single();
	if (error || !lead) throw new Error(error?.message ?? "Lead not found");
	const target = lead.targets;
	const dealBody = { properties: {
		dealname: lead.title,
		pipeline: "default",
		dealstage: "appointmentscheduled",
		amount: String(lead.score * 100),
		description: `${lead.rationale ?? ""}\n\nIntent: ${lead.intent ?? "unknown"} · Urgency: ${lead.urgency}`
	} };
	const dealRes = await fetch(`${GATEWAY}/crm/v3/objects/deals`, {
		method: "POST",
		headers,
		body: JSON.stringify(dealBody)
	});
	const dealJson = await dealRes.json();
	if (!dealRes.ok) throw new Error(`HubSpot deal create failed [${dealRes.status}]: ${JSON.stringify(dealJson)}`);
	if (target?.company_name) {
		const compBody = { properties: {
			name: target.company_name,
			domain: target.domain ?? void 0,
			industry: target.industry ?? void 0
		} };
		await fetch(`${GATEWAY}/crm/v3/objects/companies`, {
			method: "POST",
			headers,
			body: JSON.stringify(compBody)
		}).catch(() => null);
	}
	return {
		skipped: false,
		deal_id: dealJson.id
	};
});
//#endregion
export { crmStatus_createServerFn_handler, syncLeadToCrm_createServerFn_handler };
