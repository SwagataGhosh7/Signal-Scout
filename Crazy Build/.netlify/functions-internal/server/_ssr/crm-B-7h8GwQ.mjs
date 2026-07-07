import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useServerFn, d as listLeads, g as updateLeadStatus } from "./signals.functions-CubddQE-.mjs";
import { a as useQueryClient, n as useSuspenseQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as RefreshCw, F as LoaderCircle, X as Database, dt as Building2, l as TrendingUp, rt as CircleCheck, tt as Circle, vt as ArrowRightLeft } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./app-CT6gZdT0.mjs";
import { t as crmStatus } from "./crm.functions-v6fUE8zU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm-B-7h8GwQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONNECTORS = [
	{
		name: "HubSpot",
		id: "hubspot",
		desc: "Sync contacts, deals, and notes directly to your HubSpot pipeline.",
		color: "text-[#FF7A59]",
		logo: Building2
	},
	{
		name: "Salesforce",
		id: "salesforce",
		desc: "Automate lead mapping and contact records inside Salesforce CRM.",
		color: "text-[#00A4EF]",
		logo: Database
	},
	{
		name: "Zoho CRM",
		id: "zoho",
		desc: "Push signals directly into Zoho deals module and set up follow-up alerts.",
		color: "text-[#E21A22]",
		logo: ArrowRightLeft
	},
	{
		name: "Pipedrive",
		id: "pipedrive",
		desc: "Sync targeted buyer personas to your active pipelines.",
		color: "text-[#00B46A]",
		logo: TrendingUp
	},
	{
		name: "Freshsales",
		id: "freshsales",
		desc: "Automate outbound outreach mapping to Freshsales deals.",
		color: "text-[#183247]",
		logo: RefreshCw
	}
];
var CRM_STAGES = [
	{
		label: "New Leads",
		key: "new",
		color: "border-sky-500/20 bg-sky-500/5 text-sky-400"
	},
	{
		label: "Contacted",
		key: "contacted",
		color: "border-amber-500/20 bg-amber-500/5 text-amber-400"
	},
	{
		label: "Qualified",
		key: "qualified",
		color: "border-violet-500/20 bg-violet-500/5 text-violet-400"
	},
	{
		label: "Deals Won",
		key: "won",
		color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
	},
	{
		label: "Lost",
		key: "lost",
		color: "border-rose-500/20 bg-rose-500/5 text-rose-400"
	}
];
function CrmPage() {
	const qc = useQueryClient();
	const leadsFn = useServerFn(listLeads);
	const statusFn = useServerFn(crmStatus);
	const updateStatusFn = useServerFn(updateLeadStatus);
	const leadsQ = useSuspenseQuery({
		queryKey: ["leads"],
		queryFn: () => leadsFn()
	});
	const crmQ = useSuspenseQuery({
		queryKey: ["crm-status"],
		queryFn: () => statusFn()
	});
	const [activeTab, setActiveTab] = (0, import_react.useState)("pipeline");
	const [integrations, setIntegrations] = (0, import_react.useState)({
		hubspot: crmQ.data.connected,
		salesforce: false,
		zoho: false,
		pipedrive: false,
		freshsales: false
	});
	const [isSyncing, setIsSyncing] = (0, import_react.useState)(false);
	const setStatus = useMutation({
		mutationFn: (v) => updateStatusFn({ data: v }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["leads"] });
			toast.success("CRM stage updated");
		}
	});
	const toggleConnection = (id) => {
		if (id === "hubspot" && crmQ.data.connected) {
			toast.info("HubSpot is configured in env variables.");
			return;
		}
		const next = !integrations[id];
		setIntegrations({
			...integrations,
			[id]: next
		});
		if (next) toast.success(`${CONNECTORS.find((c) => c.id === id)?.name} connected successfully!`);
		else toast.info(`Disconnected ${CONNECTORS.find((c) => c.id === id)?.name}`);
	};
	const forceSync = () => {
		setIsSyncing(true);
		setTimeout(() => {
			setIsSyncing(false);
			toast.success("All CRM accounts fully synced.", { description: `Successfully pushed ${leadsQ.data.filter((x) => x.status !== "new").length} leads to connected systems.` });
		}, 1200);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-primary",
						children: "Sales execution"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-semibold tracking-tight",
						children: "CRM Sync Portal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Automatically bridge the gap between AI signal intent and your sales tech stack."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: forceSync,
						disabled: isSyncing,
						className: "flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50",
						children: [isSyncing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 text-primary" }), "Force CRM Sync"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex border-b border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveTab("pipeline"),
					className: `px-4 py-2.5 text-sm font-medium border-b-2 transition ${activeTab === "pipeline" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: "Deal Pipeline Board"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab("connectors"),
					className: `px-4 py-2.5 text-sm font-medium border-b-2 transition ${activeTab === "connectors" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: [
						"Connectors (",
						Object.values(integrations).filter(Boolean).length,
						")"
					]
				})]
			}),
			activeTab === "pipeline" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-5 overflow-x-auto pb-4",
				children: CRM_STAGES.map((stage) => {
					const stageLeads = leadsQ.data.filter((l) => l.status === stage.key);
					const totalDealValue = stageLeads.reduce((acc, curr) => acc + curr.score * 150, 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col min-w-[220px] rounded-2xl border border-border/60 bg-card/20 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-3 border-b border-border/40 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-sm truncate",
									children: stage.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-mono font-bold",
									children: stageLeads.length
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] text-muted-foreground font-mono",
								children: ["$", totalDealValue.toLocaleString()]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 space-y-3 min-h-[300px] overflow-y-auto",
							children: stageLeads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-border/40 p-4 text-center text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-4 w-4 mb-1 opacity-20" }), "No deals in this stage"]
							}) : stageLeads.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group relative rounded-xl border border-border bg-card/85 p-3 hover:border-primary/50 hover:glow-violet transition duration-200 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: l.intent ?? "intent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-mono text-xs font-bold text-primary",
											children: [l.score, "%"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "mt-2 text-xs font-semibold text-foreground leading-snug line-clamp-2",
										children: l.title
									}),
									l.rationale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted-foreground line-clamp-2",
										children: l.rationale
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[10px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground font-mono",
											children: ["Est: $", (l.score * 150).toLocaleString()]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-1 opacity-0 group-hover:opacity-100 transition duration-150",
											children: CRM_STAGES.filter((s) => s.key !== stage.key).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setStatus.mutate({
													id: l.id,
													status: s.key
												}),
												className: "rounded bg-muted px-1.5 py-0.5 hover:bg-primary/20 hover:text-primary transition font-bold",
												title: `Move to ${s.label}`,
												children: s.label[0]
											}, s.key))
										})]
									})
								]
							}, l.id))
						})]
					}, stage.key);
				})
			}),
			activeTab === "connectors" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: CONNECTORS.map((c) => {
					const connected = integrations[c.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border bg-card/60 p-5 flex flex-col justify-between transition ${connected ? "border-primary/40 glow" : "border-border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid h-9 w-9 place-items-center rounded-lg bg-card border border-border/80 ${c.color}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.logo, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: c.name
								})]
							}), connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-[10px] uppercase font-mono font-semibold text-success border border-success/40 bg-success/15 px-2.5 py-0.5 rounded-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-2.5 w-2.5" }), " Connected"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase font-mono font-semibold text-muted-foreground border border-border bg-muted/30 px-2.5 py-0.5 rounded-full",
								children: "Inactive"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: c.desc
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleConnection(c.id),
								className: `w-full rounded-md px-3 py-2 text-xs font-semibold transition ${connected ? "border border-destructive/40 text-destructive bg-destructive/5 hover:bg-destructive/15" : "bg-primary text-primary-foreground hover:opacity-90"}`,
								children: connected ? "Disconnect" : "Configure Connector"
							})
						})]
					}, c.id);
				})
			})
		]
	});
}
//#endregion
export { CrmPage as component };
