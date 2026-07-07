import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useServerFn, d as listLeads, g as updateLeadStatus, s as generateOutreach } from "./signals.functions-CubddQE-.mjs";
import { r as TiltCard } from "./depth-system-OoRGzMrR.mjs";
import { a as useQueryClient, n as useSuspenseQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as LoaderCircle, N as Mail, _t as ArrowRight, dt as Building2, l as TrendingUp } from "../_libs/lucide-react.mjs";
import { r as UrgencyBadge, t as Badge } from "./app-CT6gZdT0.mjs";
import { n as syncLeadToCrm, t as crmStatus } from "./crm.functions-v6fUE8zU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-BBM2o0nr.js
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"new",
	"contacted",
	"qualified",
	"won",
	"lost"
];
function LeadsPage() {
	const qc = useQueryClient();
	const listFn = useServerFn(listLeads);
	const outreachFn = useServerFn(generateOutreach);
	const statusFn = useServerFn(updateLeadStatus);
	const crmFn = useServerFn(syncLeadToCrm);
	const crmStatusFn = useServerFn(crmStatus);
	const q = useSuspenseQuery({
		queryKey: ["leads"],
		queryFn: () => listFn()
	});
	const crm = useSuspenseQuery({
		queryKey: ["crm-status"],
		queryFn: () => crmStatusFn()
	});
	const draft = useMutation({
		mutationFn: (id) => outreachFn({ data: { lead_id: id } }),
		onSuccess: () => {
			toast.success("Outreach draft ready — check the Outreach tab.");
			qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	const setStatus = useMutation({
		mutationFn: (v) => statusFn({ data: v }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["leads"] });
			toast.success("Lead status updated.");
		}
	});
	const pushCrm = useMutation({
		mutationFn: (id) => crmFn({ data: { lead_id: id } }),
		onSuccess: (r) => {
			if (r.skipped) toast.error("CRM Sync skipped. Toggle on connectors in settings or Project Settings → CRM.");
			else toast.success("Synced to CRM pipeline successfully as a new Deal.", { description: `Deal ID: ${r.deal_id}` });
		},
		onError: (e) => toast.error(e.message)
	});
	const getLeadDetails = (l) => {
		const probability = Math.round(l.score * .95);
		const dealSize = l.score * 150;
		let nextAction = "Draft personalized email outreach";
		if (l.intent === "hiring") nextAction = "Pitch B2B talent pipeline solutions";
		else if (l.intent === "funding") nextAction = "Reach out immediately with enterprise license options";
		else if (l.intent === "expansion") nextAction = "Draft expansion partnership proposal";
		return {
			probability,
			dealSize,
			nextAction
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 md:gap-4 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] md:text-xs uppercase tracking-widest text-primary font-semibold",
					children: "Prioritization agent"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-gradient",
					children: "AI-Scored Leads"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[13px] md:text-sm text-muted-foreground",
					children: "Ranked prospects prioritized based on buying intentions, size triggers, and signal freshness."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs shrink-0 ${crm.data.connected ? "border-success/40 bg-success/10 text-success" : "border-border text-muted-foreground bg-muted/20"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5" }),
					"CRM Connection: ",
					crm.data.connected ? "HubSpot Linked" : "Inactive Setup"
				]
			})]
		}), q.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground",
			children: "No prioritized leads in log. Run a target scan to discover signals and compile leads automatically."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4.5",
			children: q.data.map((l) => {
				const details = getLeadDetails(l);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TiltCard, {
					intensity: "dense",
					className: "rounded-2xl p-4 md:p-5 transition duration-200 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row md:items-start gap-3 md:gap-4 justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-intent/15 border border-primary/20 p-3 shadow-inner",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center min-w-[40px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-2xl font-black text-primary leading-none",
											children: l.score
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[8px] uppercase font-bold tracking-widest text-muted-foreground mt-1",
											children: "priority"
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: l.intent ?? "buying" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { urgency: l.urgency }),
												l.status !== "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "rounded-full bg-primary/10 border border-primary/30 px-2 py-0.5 text-[9px] font-mono text-primary uppercase font-bold",
													children: ["CRM Stage: ", l.status]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "mt-2 text-sm font-semibold text-foreground leading-snug",
											children: l.title
										}),
										l.rationale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-muted-foreground leading-relaxed",
											children: l.rationale
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-x-6 gap-y-2 border-t md:border-t-0 border-border/40 pt-3 md:pt-0 shrink-0 text-left text-xs md:text-right font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase font-mono block",
									children: "Probability"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-success font-mono text-xs",
									children: [details.probability, "% Convert"]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase font-mono block",
									children: "Est. Deal size"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground text-xs",
									children: ["$", details.dealSize.toLocaleString()]
								})] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-lg bg-background/50 border border-border/50 px-3.5 py-2.5 text-xs text-muted-foreground flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary font-semibold",
											children: "Next best action:"
										}),
										" ",
										details.nextAction
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 text-primary shrink-0" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] text-muted-foreground uppercase font-mono mr-1",
									children: "Deal Stage"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: l.status,
									onChange: (e) => setStatus.mutate({
										id: l.id,
										status: e.target.value
									}),
									className: "rounded-md border border-border bg-input px-2 py-1 text-xs",
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => draft.mutate(l.id),
									disabled: draft.isPending,
									className: "flex items-center gap-1.5 rounded-md border border-border/80 bg-background hover:bg-accent px-4.5 py-1.5 text-xs font-semibold text-foreground disabled:opacity-50",
									children: [draft.isPending && draft.variables === l.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-primary" }), "Draft outreach"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => pushCrm.mutate(l.id),
									disabled: pushCrm.isPending,
									className: "flex items-center gap-1.5 rounded-md bg-primary px-4.5 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
									children: [pushCrm.isPending && pushCrm.variables === l.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5" }), "Sync to CRM"]
								})]
							})]
						})
					]
				}, l.id);
			})
		})]
	});
}
//#endregion
export { LeadsPage as component };
