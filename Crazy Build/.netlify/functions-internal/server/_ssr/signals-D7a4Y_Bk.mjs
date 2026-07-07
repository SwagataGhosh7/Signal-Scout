import { o as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useServerFn, p as listSignals } from "./signals.functions-CubddQE-.mjs";
import { r as TiltCard, t as DepthLayer } from "./depth-system-OoRGzMrR.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Search, H as Funnel, _ as SlidersVertical, c as TriangleAlert, lt as Calendar, n as X, pt as Brain, s as UserCheck, t as Zap } from "../_libs/lucide-react.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { r as UrgencyBadge } from "./app-CT6gZdT0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signals-D7a4Y_Bk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"all",
	"hiring",
	"buying",
	"expansion",
	"funding",
	"product_launch",
	"partnership",
	"leadership_change",
	"technology_adoption",
	"creator_collaboration",
	"website_update"
];
var SOURCES = [
	"all",
	"linkedin",
	"twitter",
	"news",
	"jobs",
	"web",
	"crunchbase",
	"blogs",
	"github",
	"producthunt"
];
function SignalsPage() {
	const fn = useServerFn(listSignals);
	const q = useSuspenseQuery({
		queryKey: ["signals"],
		queryFn: () => fn()
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [selectedSource, setSelectedSource] = (0, import_react.useState)("all");
	const [drawerSignalId, setDrawerSignalId] = (0, import_react.useState)(null);
	const filtered = q.data.filter((s) => {
		const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.summary && s.summary.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = selectedCategory === "all" || s.signal_type === selectedCategory;
		const matchesSource = selectedSource === "all" || s.source && s.source.toLowerCase() === selectedSource;
		return matchesSearch && matchesCategory && matchesSource;
	});
	const selectedSignal = q.data.find((s) => s.id === drawerSignalId);
	const getAnalysisDetails = (sig) => {
		const raw = sig.raw;
		const score = raw?.score ?? 75;
		const urgency = raw?.urgency ?? "medium";
		const rationale = raw?.rationale ?? "Target company is scaling rapidly and needs automated support solutions.";
		const isHiring = sig.signal_type === "hiring";
		return {
			buyingIntent: sig.signal_type === "funding" ? 92 : isHiring ? 70 : 80,
			hiringIntent: isHiring ? 95 : 55,
			expansionIntent: sig.signal_type === "expansion" ? 90 : 60,
			partnershipIntent: sig.signal_type === "partnership" ? 85 : 50,
			confidence: 94,
			urgency,
			opportunityScore: score,
			rationale,
			strategy: `Reference the recent ${sig.signal_type} trigger immediately. Focus on outbound pipeline expansion & cost efficiency options.`,
			bestTime: "Tuesday mornings (10:00 AM - 11:30 AM EST)",
			persona: "VP Growth / Sales Operations Director",
			risk: "Budget approvals might stall due to recent tech adoption cycles."
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-primary font-semibold",
						children: "Intent analysis agent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-semibold tracking-tight text-gradient",
						children: "Signals Feed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Monitor real-time company events, buying intent logs, and recommended outbound strategies."
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/60 p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Search signals by company, headlines, or keywords...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full rounded-lg border border-border bg-input pl-10 pr-4 py-2.5 text-xs outline-none focus:border-primary"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[10px] text-muted-foreground uppercase font-mono tracking-wider flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3 w-3" }), " Filter by Source Channel"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: SOURCES.map((src) => {
								const active = selectedSource === src;
								const count = src === "all" ? q.data.length : q.data.filter((s) => s.source && s.source.toLowerCase() === src).length;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedSource(src),
									className: `rounded-full border px-3 py-1 text-[11px] font-medium transition ${active ? "border-primary bg-primary/10 text-primary" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "capitalize",
											children: src
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9px] opacity-70 font-bold font-mono",
											children: [
												"(",
												count,
												")"
											]
										})
									]
								}, src);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[10px] text-muted-foreground uppercase font-mono tracking-wider flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-3 w-3" }), " Filter by Signal Category"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: CATEGORIES.map((cat) => {
								const active = selectedCategory === cat;
								const count = cat === "all" ? q.data.length : q.data.filter((s) => s.signal_type === cat).length;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedCategory(cat),
									className: `rounded-full border px-3 py-1 text-[11px] font-medium transition ${active ? "border-intent bg-intent/15 text-intent" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "capitalize",
											children: cat.replace("_", " ")
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9px] opacity-70 font-bold font-mono",
											children: [
												"(",
												count,
												")"
											]
										})
									]
								}, cat);
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `lg:col-span-2 space-y-2.5 transition-all duration-300`,
					children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground",
						children: "No matching signals discovered. Try adjusting search queries or source categories."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border bg-card/60 divide-y divide-border/40 overflow-hidden",
						children: filtered.map((sig) => {
							const analysis = getAnalysisDetails(sig);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TiltCard, {
								intensity: "dense",
								onClick: () => setDrawerSignalId(sig.id),
								className: `flex items-start gap-4 p-4.5 cursor-pointer hover:bg-muted/10 transition duration-150 ${drawerSignalId === sig.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1 text-left",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary",
														children: sig.signal_type.replace("_", " ")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full border border-intent/30 bg-intent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-intent",
														children: sig.intent ?? "buying"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] text-muted-foreground font-mono",
														children: [
															sig.source,
															" ·",
															" ",
															formatDistanceToNow(new Date(sig.detected_at), { addSuffix: true })
														]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "mt-2 text-xs font-semibold text-foreground leading-snug",
												children: sig.title
											}),
											sig.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2",
												children: sig.summary
											}),
											analysis.rationale && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex items-center gap-1 text-[10px] text-primary/80 font-mono",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"AI Reason: ",
													analysis.rationale.slice(0, 70),
													"..."
												] })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right shrink-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-2xl font-bold text-primary",
												children: analysis.opportunityScore
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[9px] uppercase tracking-widest text-muted-foreground",
												children: "score"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { urgency: analysis.urgency })
											})
										]
									})
								]
							}, sig.id);
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthLayer, {
					className: `rounded-2xl p-5 space-y-5 lg:sticky lg:top-6 transition-all duration-300 ${selectedSignal ? "opacity-100 scale-100" : "opacity-50 scale-95 pointer-events-none"}`,
					children: selectedSignal ? (() => {
						const details = getAnalysisDetails(selectedSignal);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between border-b border-border/40 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-sm",
										children: "Intent Analysis"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground uppercase font-mono",
										children: ["Signal ID: ", selectedSignal.id.slice(0, 8)]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setDrawerSignalId(null),
									className: "rounded bg-muted p-1 text-muted-foreground hover:bg-accent hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[10px] text-muted-foreground uppercase font-mono tracking-wider",
									children: "AI Intent Breakdown"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
											label: "Buying Intent",
											value: details.buyingIntent,
											color: "bg-primary"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
											label: "Hiring Intent",
											value: details.hiringIntent,
											color: "bg-intent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
											label: "Expansion Intent",
											value: details.expansionIntent,
											color: "bg-warning"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
											label: "Partnership Opportunity",
											value: details.partnershipIntent,
											color: "bg-success"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3.5 pt-3 border-t border-border/40 text-left text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3.5 w-3.5 text-primary" }), " Recommended Strategy"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-muted-foreground leading-relaxed",
										children: details.strategy
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-3.5 w-3.5 text-primary" }), " Decision Maker Persona"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-foreground font-semibold",
										children: details.persona
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3.5 pt-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-primary" }), " Best Outreach Time"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-foreground text-[11px] font-medium leading-tight",
											children: details.bestTime
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-3.5 w-3.5 text-primary" }), " Confidence Index"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-foreground text-sm font-mono font-bold text-success",
											children: [details.confidence, "% Precision"]
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 text-warning" }), " AI Risk analysis"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-muted-foreground leading-relaxed bg-warning/5 border border-warning/15 p-2 rounded-lg text-[11px]",
											children: details.risk
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-border/40 pt-4 flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/outreach",
									className: "w-full flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 text-center",
									children: "Generate Outreach Script"
								})
							})
						] });
					})() : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center py-20 text-xs text-muted-foreground",
						children: "Select any harvested signal in the feed to inspect the intent analysis model."
					})
				})]
			})
		]
	});
}
function ProgressBar({ label, value, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-[11px] mb-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-mono text-foreground font-semibold",
			children: [value, "%"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full rounded-full ${color}`,
			style: { width: `${value}%` }
		})
	})] });
}
//#endregion
export { SignalsPage as component };
