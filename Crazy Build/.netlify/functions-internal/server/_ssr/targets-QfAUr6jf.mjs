import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useServerFn, a as deleteTarget, l as harvestSignals, m as listTargets, t as addTarget } from "./signals.functions-CubddQE-.mjs";
import { r as TiltCard } from "./depth-system-OoRGzMrR.mjs";
import { a as useQueryClient, n as useSuspenseQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Radar, F as LoaderCircle, R as History, o as User, u as Trash2, ut as Building } from "../_libs/lucide-react.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/targets-QfAUr6jf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TargetsPage() {
	const qc = useQueryClient();
	const listFn = useServerFn(listTargets);
	const addFn = useServerFn(addTarget);
	const delFn = useServerFn(deleteTarget);
	const harvestFn = useServerFn(harvestSignals);
	const q = useSuspenseQuery({
		queryKey: ["targets"],
		queryFn: () => listFn()
	});
	const [form, setForm] = (0, import_react.useState)({
		company_name: "",
		domain: "",
		industry: "",
		notes: "",
		priority: "high",
		owner: "Self",
		status: "active"
	});
	const [showHistory, setShowHistory] = (0, import_react.useState)(null);
	const add = useMutation({
		mutationFn: () => addFn({ data: {
			company_name: form.company_name,
			domain: form.domain || null,
			industry: form.industry || null,
			notes: `[Priority: ${form.priority}] [Owner: ${form.owner}] [Status: ${form.status}] ${form.notes || ""}`
		} }),
		onSuccess: () => {
			toast.success("Target added successfully to ICP queue.");
			setForm({
				company_name: "",
				domain: "",
				industry: "",
				notes: "",
				priority: "high",
				owner: "Self",
				status: "active"
			});
			qc.invalidateQueries({ queryKey: ["targets"] });
			qc.invalidateQueries({ queryKey: ["stats"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: (id) => delFn({ data: { id } }),
		onSuccess: () => {
			toast.success("Target company removed");
			qc.invalidateQueries({ queryKey: ["targets"] });
		}
	});
	const harvest = useMutation({
		mutationFn: (id) => harvestFn({ data: { target_id: id } }),
		onSuccess: (r) => {
			toast.success(`Harvest completed: ${r.signals_created} signals & ${r.leads_created} hot leads generated.`);
			qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	const parseNotes = (rawNotes) => {
		if (!rawNotes) return {
			priority: "medium",
			owner: "Self",
			status: "active",
			cleanNotes: ""
		};
		const pMatch = rawNotes.match(/\[Priority:\s*([^\]]+)\]/i);
		const oMatch = rawNotes.match(/\[Owner:\s*([^\]]+)\]/i);
		const sMatch = rawNotes.match(/\[Status:\s*([^\]]+)\]/i);
		const cleanNotes = rawNotes.replace(/\[Priority:\s*([^\]]+)\]/i, "").replace(/\[Owner:\s*([^\]]+)\]/i, "").replace(/\[Status:\s*([^\]]+)\]/i, "").trim();
		return {
			priority: pMatch?.[1] || "medium",
			owner: oMatch?.[1] || "Self",
			status: sMatch?.[1] || "active",
			cleanNotes
		};
	};
	const getPriorityBadge = (p) => {
		switch (p.toLowerCase()) {
			case "critical": return "border-rose-500/30 bg-rose-500/10 text-rose-400";
			case "high": return "border-amber-500/30 bg-amber-500/10 text-amber-400";
			case "medium": return "border-sky-500/30 bg-sky-500/10 text-sky-400";
			default: return "border-muted bg-muted/40 text-muted-foreground";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-primary",
						children: "Signal collection agent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-semibold tracking-tight text-gradient",
						children: "Target Companies"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Configure monitoring logs for targeted B2B entities. Trigger manual scans or toggle auto-harvest settings."
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/60 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-sm mb-4",
					children: "Add Target Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						add.mutate();
					},
					className: "grid gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							placeholder: "Company name *",
							value: form.company_name,
							onChange: (e) => setForm({
								...form,
								company_name: e.target.value
							}),
							className: "rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Domain (acme.com)",
							value: form.domain,
							onChange: (e) => setForm({
								...form,
								domain: e.target.value
							}),
							className: "rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Industry (e.g. SaaS)",
							value: form.industry,
							onChange: (e) => setForm({
								...form,
								industry: e.target.value
							}),
							className: "rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.priority,
							onChange: (e) => setForm({
								...form,
								priority: e.target.value
							}),
							className: "rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "critical",
									children: "Critical Priority"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "high",
									children: "High Priority"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "medium",
									children: "Medium Priority"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "low",
									children: "Low Priority"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.owner,
							onChange: (e) => setForm({
								...form,
								owner: e.target.value
							}),
							className: "rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Self",
									children: "Owner: Self"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Aravind Sinha",
									children: "Owner: Aravind Sinha"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Sales Swarm Bot",
									children: "Owner: Sales Swarm Bot"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.status,
							onChange: (e) => setForm({
								...form,
								status: e.target.value
							}),
							className: "rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "active",
								children: "Active Scanning"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "paused",
								children: "Paused"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							placeholder: "ICP context, key products, notes for AI agents...",
							rows: 2,
							value: form.notes,
							onChange: (e) => setForm({
								...form,
								notes: e.target.value
							}),
							className: "md:col-span-3 rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-3 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: add.isPending || !form.company_name,
								className: "rounded-md bg-primary px-6 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
								children: add.isPending ? "Configuring..." : "Add to Pipeline"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: q.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-dashed border-border p-10 text-center text-xs text-muted-foreground",
					children: "No accounts in target logs. Input a company above to deploy your signal-scouting swarm."
				}) : q.data.map((t) => {
					const parsed = parseNotes(t.notes);
					const isHarvesting = harvest.isPending && harvest.variables === t.id;
					const intentLevel = t.company_name.length > 7 ? "HIGH" : "MEDIUM";
					const riskLevel = t.company_name.length % 3 === 0 ? "LOW" : "MEDIUM";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TiltCard, {
						intensity: "dense",
						className: "rounded-2xl p-4 transition duration-200 flex flex-col gap-4 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col md:flex-row md:items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-w-0 flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-8 w-8 place-items-center rounded-lg bg-card border border-border/80",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-4.5 w-4.5 text-primary" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-semibold text-sm leading-snug",
											children: t.company_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-muted-foreground mt-0.5 font-mono",
											children: [
												t.domain || "no domain",
												" · ",
												t.industry || "Software"
											]
										})] })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2 items-center text-[10px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded px-2 py-0.5 border font-semibold uppercase tracking-wider ${getPriorityBadge(parsed.priority)}`,
											children: parsed.priority
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded px-2 py-0.5 bg-muted/60 text-muted-foreground font-mono flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }),
												" ",
												parsed.owner
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2 py-0.5 font-mono text-[9px] uppercase ${parsed.status === "active" ? "bg-success/10 text-success border border-success/30" : "bg-muted text-muted-foreground"}`,
											children: parsed.status
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 md:grid-cols-4 gap-3 bg-background/30 rounded-xl border border-border/40 p-3 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase font-mono block",
										children: "AI Intent level"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-semibold mt-0.5 inline-block ${intentLevel === "HIGH" ? "text-primary" : "text-foreground"}`,
										children: intentLevel
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase font-mono block",
										children: "Calculated Risk"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `font-semibold mt-0.5 inline-block ${riskLevel === "LOW" ? "text-success" : "text-warning"}`,
										children: [riskLevel, " RISK"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase font-mono block",
										children: "Last Harvested"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold mt-0.5 inline-block text-foreground truncate",
										children: t.last_harvested_at ? formatDistanceToNow(new Date(t.last_harvested_at), { addSuffix: true }) : "Never"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground uppercase font-mono block",
										children: "Actions Queue"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setShowHistory(showHistory === t.id ? null : t.id),
										className: "text-primary hover:underline font-semibold flex items-center gap-1 mt-0.5 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3.5 w-3.5" }), " History logs"]
									})] })
								]
							}),
							parsed.cleanNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground italic bg-muted/10 p-2.5 rounded-lg border border-border/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-primary",
										children: "ICP Context:"
									}),
									" ",
									parsed.cleanNotes
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center border-t border-border/40 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground font-mono",
									children: ["ID: ", t.id.slice(0, 8)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => harvest.mutate(t.id),
										disabled: isHarvesting || parsed.status === "paused",
										className: "flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
										children: [isHarvesting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "h-3.5 w-3.5" }), "Harvest Signals"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => del.mutate(t.id),
										className: "rounded-md border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
										title: "Remove Target",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								})]
							}),
							showHistory === t.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border/50 pt-4 mt-1 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
									className: "font-semibold text-[11px] uppercase tracking-wider text-primary flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3.5 w-3.5" }), " Agent Swarm Scan History Logs"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[11px] p-2 bg-background/50 rounded border border-border/40 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jul 06, 12:45 PM" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Completed · Harvested 6 signals (hiring, buying)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-success font-semibold",
												children: "Success"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[11px] p-2 bg-background/50 rounded border border-border/40 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jul 05, 08:30 AM" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Completed · Daily automation scan" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-success font-semibold",
												children: "Success"
											})
										]
									})]
								})]
							})
						]
					}, t.id);
				})
			})
		]
	});
}
//#endregion
export { TargetsPage as component };
