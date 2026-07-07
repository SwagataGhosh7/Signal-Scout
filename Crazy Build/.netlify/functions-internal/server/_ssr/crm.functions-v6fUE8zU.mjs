import { l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-C2gC88Hf.mjs";
import { Dt as objectType, kt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { n as createSsrRpc } from "./signals.functions-CubddQE-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm.functions-v6fUE8zU.js
var crmStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("5008561f597b367bb8b3dc4156a69314d2ff92c5d4ec2615a45fd872eb3db448"));
/**
* Push a lead to HubSpot as a Deal + associated Contact-less note.
* Returns { skipped } when the CRM connector is not linked.
*/
var syncLeadToCrm = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ lead_id: stringType().uuid() }).parse(input)).handler(createSsrRpc("47c15f1df63254f74c0507f4ebf29e6fb75b773a5552bb01177d07aae60f777a"));
//#endregion
export { syncLeadToCrm as n, crmStatus as t };
