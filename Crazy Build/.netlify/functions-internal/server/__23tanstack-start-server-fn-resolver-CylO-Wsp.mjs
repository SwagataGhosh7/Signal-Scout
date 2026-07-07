//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CylO-Wsp.js
var manifest = {
	"0adde9f59c87ef328758ebaed6a26dc0e0c9dd7dcc9a33bf0b1f94fa22fbd861": {
		functionName: "generateOutreach_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"3945fd4eee79049bf4a4ba565eda69b2564fd29c7c3c0951f61e43c5f8f7b1e8": {
		functionName: "listTargets_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"3975930789e5863e3b3924b4a7919e7cef00b6761772c9acc4a487e7d22226bf": {
		functionName: "updateLeadStatus_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"44e348c8d02e7d5624e56d81a7ac37be88a96c00f9b4e907ae9eb2ffa54e1171": {
		functionName: "listDrafts_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"47c15f1df63254f74c0507f4ebf29e6fb75b773a5552bb01177d07aae60f777a": {
		functionName: "syncLeadToCrm_createServerFn_handler",
		importer: () => import("./_ssr/crm.functions-xhhbjCff.mjs")
	},
	"5008561f597b367bb8b3dc4156a69314d2ff92c5d4ec2615a45fd872eb3db448": {
		functionName: "crmStatus_createServerFn_handler",
		importer: () => import("./_ssr/crm.functions-xhhbjCff.mjs")
	},
	"511273ba4a616c33a3fc02a7e971e71c760ee7d36ad8fc34d675c902ba209ddb": {
		functionName: "generateReportSummary_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"57ced6ee7611bd5f7344fea8678cb4ae9b04ab64f498f66c134019ce46be98b0": {
		functionName: "listSignals_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"5cbfe9e676dd92d8a6d7dd259a5567987329c2609eda3ca5e209ce41206b7899": {
		functionName: "addTarget_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"641b15b59fd7e6fe2ef5de72abb30e9ae4e472a525364833167c5edc96f0906a": {
		functionName: "harvestSignals_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"87e9aa24a91928b73f724c2ff85d61f5df840a40f39128f2f80cdc5986084efd": {
		functionName: "saveReport_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"95122cc057e55eae343c4a7c4b36c49c1d7d1674bd849836c86931b959dbdff3": {
		functionName: "fetchReportData_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"9b742c4e37703b2c86f28bb4db9adcd214373e0514cd38380b6f0b385efcbdb7": {
		functionName: "deleteTarget_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"ed9b26d4654b2ca90dc290a59bebb43fd72592c21cdfa95a9e775e5da0a72122": {
		functionName: "dashboardStats_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"f6d8c1874e63fc47ccae2e6f6199fdb679fac6cda8f286220aaa14bbf2b50628": {
		functionName: "deleteReport_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"f9fd6fdb7773d2a6c78e064a058032eee6ecc5d0b9dbbe51ff922ec5e96d11e5": {
		functionName: "listReports_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	},
	"ffa7581e988648f994aac7eb400d14eabe425202c56cfefce554fd84597cd602": {
		functionName: "listLeads_createServerFn_handler",
		importer: () => import("./_ssr/signals.functions-DhwF_w2U.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
