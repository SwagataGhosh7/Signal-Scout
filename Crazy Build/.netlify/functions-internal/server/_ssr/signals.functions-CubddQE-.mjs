import { o as __toESM } from "../_runtime.mjs";
import { O as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CylO-Wsp.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-C2gC88Hf.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { At as unionType, Dt as objectType, Et as numberType, Ot as recordType, Tt as enumType, jt as unknownType, kt as stringType, wt as arrayType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signals.functions-CubddQE-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listTargets = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("3945fd4eee79049bf4a4ba565eda69b2564fd29c7c3c0951f61e43c5f8f7b1e8"));
var addTarget = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	company_name: stringType().min(1).max(120),
	domain: stringType().max(120).optional().nullable(),
	industry: stringType().max(80).optional().nullable(),
	notes: stringType().max(2e3).optional().nullable()
}).parse(input)).handler(createSsrRpc("5cbfe9e676dd92d8a6d7dd259a5567987329c2609eda3ca5e209ce41206b7899"));
var deleteTarget = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("9b742c4e37703b2c86f28bb4db9adcd214373e0514cd38380b6f0b385efcbdb7"));
var listSignals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("57ced6ee7611bd5f7344fea8678cb4ae9b04ab64f498f66c134019ce46be98b0"));
var listLeads = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("ffa7581e988648f994aac7eb400d14eabe425202c56cfefce554fd84597cd602"));
var updateLeadStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	status: enumType([
		"new",
		"contacted",
		"qualified",
		"won",
		"lost"
	])
}).parse(input)).handler(createSsrRpc("3975930789e5863e3b3924b4a7919e7cef00b6761772c9acc4a487e7d22226bf"));
var harvestSignals = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ target_id: stringType().uuid() }).parse(input)).handler(createSsrRpc("641b15b59fd7e6fe2ef5de72abb30e9ae4e472a525364833167c5edc96f0906a"));
var generateOutreach = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ lead_id: stringType().uuid() }).parse(input)).handler(createSsrRpc("0adde9f59c87ef328758ebaed6a26dc0e0c9dd7dcc9a33bf0b1f94fa22fbd861"));
var listDrafts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("44e348c8d02e7d5624e56d81a7ac37be88a96c00f9b4e907ae9eb2ffa54e1171"));
var fetchReportData = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ template: stringType().min(1) }).parse(input)).handler(createSsrRpc("95122cc057e55eae343c4a7c4b36c49c1d7d1674bd849836c86931b959dbdff3"));
var generateReportSummary = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ payload: objectType({
	title: stringType(),
	reportType: stringType(),
	stats: recordType(unionType([stringType(), numberType()])),
	tableRows: arrayType(recordType(unknownType())).optional().default([])
}).passthrough() }).parse(input)).handler(createSsrRpc("511273ba4a616c33a3fc02a7e971e71c760ee7d36ad8fc34d675c902ba209ddb"));
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
}).parse(input)).handler(createSsrRpc("87e9aa24a91928b73f724c2ff85d61f5df840a40f39128f2f80cdc5986084efd"));
var listReports = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("f9fd6fdb7773d2a6c78e064a058032eee6ecc5d0b9dbbe51ff922ec5e96d11e5"));
var deleteReport = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("f6d8c1874e63fc47ccae2e6f6199fdb679fac6cda8f286220aaa14bbf2b50628"));
var dashboardStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("ed9b26d4654b2ca90dc290a59bebb43fd72592c21cdfa95a9e775e5da0a72122"));
//#endregion
export { useServerFn as _, deleteTarget as a, generateReportSummary as c, listLeads as d, listReports as f, updateLeadStatus as g, saveReport as h, deleteReport as i, harvestSignals as l, listTargets as m, createSsrRpc as n, fetchReportData as o, listSignals as p, dashboardStats as r, generateOutreach as s, addTarget as t, listDrafts as u };
