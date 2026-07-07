import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useServerFn, r as dashboardStats } from "./signals.functions-CubddQE-.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { $ as Clock, gt as ArrowUpRight, l as TrendingUp, lt as Calendar, t as Zap, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { _ as Tooltip, a as YAxis, c as CartesianGrid, d as Pie, f as PolarAngleAxis, g as ResponsiveContainer, h as Cell, i as BarChart, l as Bar, m as PolarGrid, n as RadarChart, o as XAxis, p as PolarRadiusAxis, r as PieChart, s as Area, t as AreaChart, u as Radar, v as Legend } from "../_libs/recharts+[...].mjs";
import { t as Badge } from "./app-CT6gZdT0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-BhavG8pC.js
var import_jsx_runtime = require_jsx_runtime();
var SIGNAL_TREND_DATA = [
	{
		date: "06/30",
		LinkedIn: 12,
		Twitter: 5,
		News: 8,
		Jobs: 15
	},
	{
		date: "07/01",
		LinkedIn: 18,
		Twitter: 9,
		News: 12,
		Jobs: 22
	},
	{
		date: "07/02",
		LinkedIn: 15,
		Twitter: 7,
		News: 14,
		Jobs: 19
	},
	{
		date: "07/03",
		LinkedIn: 24,
		Twitter: 14,
		News: 16,
		Jobs: 32
	},
	{
		date: "07/04",
		LinkedIn: 30,
		Twitter: 18,
		News: 22,
		Jobs: 45
	},
	{
		date: "07/05",
		LinkedIn: 45,
		Twitter: 24,
		News: 28,
		Jobs: 58
	},
	{
		date: "07/06",
		LinkedIn: 62,
		Twitter: 35,
		News: 38,
		Jobs: 74
	}
];
var INTENT_DISTR = [
	{
		name: "Buying",
		value: 38,
		color: "var(--primary)"
	},
	{
		name: "Hiring",
		value: 27,
		color: "var(--intent)"
	},
	{
		name: "Expansion",
		value: 18,
		color: "var(--warning)"
	},
	{
		name: "Partnership",
		value: 12,
		color: "var(--success)"
	},
	{
		name: "Creator",
		value: 5,
		color: "#a855f7"
	}
];
var FUNNEL_DATA = [
	{
		stage: "Harvester Scans",
		count: 240,
		loss: 0
	},
	{
		stage: "Intent Identified",
		count: 180,
		loss: 25
	},
	{
		stage: "Leads Prioritized",
		count: 120,
		loss: 33
	},
	{
		stage: "Outreach Sent",
		count: 75,
		loss: 37
	},
	{
		stage: "Deals Closed",
		count: 22,
		loss: 70
	}
];
var PIPELINE_VELOCITY = [
	{
		name: "LinkedIn Scans",
		score: 85
	},
	{
		name: "Crunchbase Funding",
		score: 92
	},
	{
		name: "Twitter Hiring",
		score: 70
	},
	{
		name: "Company Jobs",
		score: 88
	},
	{
		name: "Press releases",
		score: 65
	}
];
function AnalyticsPage() {
	const statsFn = useServerFn(dashboardStats);
	const s = useQuery({
		queryKey: ["stats"],
		queryFn: () => statsFn()
	}).data;
	const heatmapGrid = Array.from({ length: 7 }, (_, day) => Array.from({ length: 12 }, (_, hour) => {
		const base = (day * 3 + hour * 2) % 10;
		return base > 7 ? "bg-primary/90 text-primary-foreground" : base > 4 ? "bg-primary/50 text-primary-foreground" : base > 2 ? "bg-primary/20" : "bg-muted/10";
	}));
	const days = [
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat",
		"Sun"
	];
	const hours = [
		"9AM",
		"10AM",
		"11AM",
		"12PM",
		"1PM",
		"2PM",
		"3PM",
		"4PM",
		"5PM",
		"6PM",
		"7PM",
		"8PM"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-primary",
						children: "Intelligence & Reports"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-semibold tracking-tight",
						children: "Intelligence Analytics"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Monitor pipeline velocity, signals conversion rate, and revenue forecast intelligence."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Last 7 Days (Jul 2026)" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground uppercase font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Conversion Ratio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-success" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-3xl font-bold",
									children: "18.4%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-success font-mono font-semibold flex items-center",
									children: ["+2.3% ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-2.5 w-2.5" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Ratio of Scans to Qualified Leads"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground uppercase font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pipeline Velocity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-3xl font-bold",
									children: "3.2 days"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-success font-mono font-semibold flex items-center",
									children: ["-1.1d ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-2.5 w-2.5" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Time from Signal to Outreach draft"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground uppercase font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Est. Pipeline Value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-intent" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-3xl font-bold",
									children: ["$", ((s?.leads ?? 12) * 1500).toLocaleString()]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-primary font-mono font-semibold flex items-center",
									children: ["+14% ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-2.5 w-2.5" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Est. B2B deal size from priority scores"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground uppercase font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Agent Confidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-success" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-3xl font-bold",
									children: "94.8%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-success font-mono font-semibold flex items-center",
									children: "+0.5%"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Precision of AI intent scoring"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 lg:col-span-2 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-sm",
							children: "Harvested Signal Volumes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Volume counts grouped by channel sources"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Active" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[260px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: SIGNAL_TREND_DATA,
								margin: {
									top: 10,
									right: 10,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "colorLk",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "5%",
											stopColor: "var(--primary)",
											stopOpacity: .3
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "95%",
											stopColor: "var(--primary)",
											stopOpacity: 0
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "colorTw",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "5%",
											stopColor: "var(--intent)",
											stopOpacity: .3
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "95%",
											stopColor: "var(--intent)",
											stopOpacity: 0
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "rgba(255,255,255,0.05)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "date",
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 10
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 10
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										backgroundColor: "var(--card)",
										borderColor: "var(--border)",
										color: "#fff"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
										iconSize: 8,
										wrapperStyle: {
											fontSize: 10,
											paddingTop: 10
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "LinkedIn",
										stroke: "var(--primary)",
										fillOpacity: 1,
										fill: "url(#colorLk)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Jobs",
										stroke: "var(--intent)",
										fillOpacity: 1,
										fill: "url(#colorTw)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "News",
										stroke: "var(--warning)",
										fillOpacity: 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Twitter",
										stroke: "var(--success)",
										fillOpacity: 0
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-sm",
							children: "Intent Distribution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Classified B2B signals by intent type"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-[210px] w-full relative flex items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: INTENT_DISTR,
									cx: "50%",
									cy: "50%",
									innerRadius: 60,
									outerRadius: 80,
									paddingAngle: 3,
									dataKey: "value",
									children: INTENT_DISTR.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: entry.color }, `cell-${index}`))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute flex flex-col items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-2xl font-bold",
									children: s?.leads ?? 12
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase tracking-widest",
									children: "Leads"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-x-3 gap-y-1.5 justify-center text-[10px]",
							children: INTENT_DISTR.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2 w-2 rounded-full",
									style: { backgroundColor: x.color }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground capitalize",
									children: [
										x.name,
										" (",
										x.value,
										"%)"
									]
								})]
							}, x.name))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-sm",
						children: "Lead Conversion Funnel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Active leads progress through stages"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[240px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: FUNNEL_DATA,
								layout: "vertical",
								margin: {
									top: 10,
									right: 10,
									left: 30,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "rgba(255,255,255,0.05)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 10
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										dataKey: "stage",
										type: "category",
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 10
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "count",
										fill: "var(--primary)",
										radius: [
											0,
											4,
											4,
											0
										],
										children: FUNNEL_DATA.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: index % 2 === 0 ? "var(--primary)" : "var(--intent)" }, `cell-${index}`))
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-sm",
							children: "Best Outreach Heatmap"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Optimal connection times based on agent signals"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Recommended" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 pt-2",
						children: [days.map((day, dIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 text-[10px] text-muted-foreground font-semibold",
								children: day
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 grid grid-cols-12 gap-1",
								children: heatmapGrid[dIdx].map((cls, hIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-4.5 rounded-[3px] transition hover:scale-110 cursor-pointer ${cls}`,
									title: `Optimal density for ${day} ${hours[hIdx]}`
								}, hIdx))
							})]
						}, day)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-[9px] text-muted-foreground pt-3 px-1 border-t border-border/40 mt-3 font-mono",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), " Hours: 9 AM - 8 PM"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quiet" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-sm bg-primary/20" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-sm bg-primary/50" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-sm bg-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Optimal Outreach" })
								]
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/60 p-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-sm",
					children: "Signal Confidence Profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "AI precision scores per signal channel provider"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[260px] w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
							cx: "50%",
							cy: "50%",
							outerRadius: "80%",
							data: PIPELINE_VELOCITY,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "rgba(255,255,255,0.05)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
									dataKey: "name",
									stroke: "rgba(255,255,255,0.5)",
									fontSize: 10
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
									angle: 30,
									domain: [0, 100],
									stroke: "rgba(255,255,255,0.3)",
									fontSize: 8
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
									name: "Confidence score",
									dataKey: "score",
									stroke: "var(--primary)",
									fill: "var(--primary)",
									fillOpacity: .25
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})
							]
						})
					})
				})]
			})
		]
	});
}
//#endregion
export { AnalyticsPage as component };
