import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link, m as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useServerFn, d as listLeads, l as harvestSignals, m as listTargets, p as listSignals, r as dashboardStats, t as addTarget } from "./signals.functions-CubddQE-.mjs";
import { n as ParallaxField, r as TiltCard, t as DepthLayer } from "./depth-system-OoRGzMrR.mjs";
import { a as useQueryClient, n as useSuspenseQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Radar, F as LoaderCircle, N as Mail, O as Play, _t as ArrowRight, ft as Briefcase, g as Sparkles, gt as ArrowUpRight, l as TrendingUp, m as Target, n as X, nt as CirclePlus, rt as CircleCheck, st as Check, t as Zap, ut as Building, yt as Activity } from "../_libs/lucide-react.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { _ as Tooltip, a as YAxis, d as Pie, g as ResponsiveContainer, h as Cell, i as BarChart, l as Bar, o as XAxis, r as PieChart, s as Area, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-CT6gZdT0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "pulse.onboarding.dismissed";
function OnboardingWizard({ hasTargets, onDone }) {
	const dismissed = typeof window !== "undefined" && localStorage.getItem(KEY) === "1";
	const [open, setOpen] = (0, import_react.useState)(!hasTargets && !dismissed);
	const [step, setStep] = (0, import_react.useState)(0);
	const [createdId, setCreatedId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		company_name: "",
		domain: "",
		industry: ""
	});
	const qc = useQueryClient();
	const navigate = useNavigate();
	const addFn = useServerFn(addTarget);
	const harvestFn = useServerFn(harvestSignals);
	const add = useMutation({
		mutationFn: () => addFn({ data: {
			company_name: form.company_name,
			domain: form.domain || null,
			industry: form.industry || null
		} }),
		onSuccess: (t) => {
			setCreatedId(t.id);
			setStep(2);
			qc.invalidateQueries({ queryKey: ["targets"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const harvest = useMutation({
		mutationFn: () => harvestFn({ data: { target_id: createdId } }),
		onSuccess: (r) => {
			toast.success(`${r.signals_created} signals · ${r.leads_created} leads`);
			qc.invalidateQueries();
			dismiss();
			navigate({ to: "/leads" });
		},
		onError: (e) => toast.error(e.message)
	});
	const dismiss = () => {
		localStorage.setItem(KEY, "1");
		setOpen(false);
		onDone?.();
	};
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-primary",
						children: "Get started"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-semibold tracking-tight",
						children: "Deploy your first signal agent"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: dismiss,
						className: "rounded-md p-1 text-muted-foreground hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { step }),
				step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroCard, {
								icon: Target,
								title: "1. Add a target",
								body: "Company you want to monitor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroCard, {
								icon: Radar,
								title: "2. Harvest signals",
								body: "AI scans intent & activity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroCard, {
								icon: Sparkles,
								title: "3. Get leads",
								body: "Scored, ranked, ready to work"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: dismiss,
							className: "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent",
							children: "Skip"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setStep(1),
							className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
							children: "Start"
						})]
					})]
				}),
				step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						add.mutate();
					},
					className: "mt-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Pick a company to monitor. Real ones work best — try a competitor or account you're chasing."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							autoFocus: true,
							placeholder: "Company name *",
							value: form.company_name,
							onChange: (e) => setForm({
								...form,
								company_name: e.target.value
							}),
							className: "w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Domain (acme.com)",
								value: form.domain,
								onChange: (e) => setForm({
									...form,
									domain: e.target.value
								}),
								className: "rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Industry",
								value: form.industry,
								onChange: (e) => setForm({
									...form,
									industry: e.target.value
								}),
								className: "rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setStep(0),
								className: "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent",
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: add.isPending || !form.company_name,
								className: "flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
								children: [add.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), "Create target"]
							})]
						})
					]
				}),
				step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-background/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-success" }),
								"Target ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: form.company_name
								}),
								" created."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Now run the Signal Collection agent. It'll scan for hiring, funding, product, and intent signals, then score opportunities into leads."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: dismiss,
							className: "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent",
							children: "I'll do it later"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => harvest.mutate(),
							disabled: harvest.isPending,
							className: "flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
							children: [harvest.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "h-3.5 w-3.5" }), "Harvest signals"]
						})]
					})]
				})
			]
		})
	});
}
function Stepper({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-2",
		children: [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 flex-1 rounded-full transition ${i <= step ? "bg-primary" : "bg-muted"}` }, i))
	});
}
function IntroCard({ icon: Icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-background/40 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: body
			})
		]
	});
}
var Route = createFileRoute("/_authenticated/app")({ component: Dashboard });
var PIE_COLORS = [
	"var(--primary)",
	"var(--intent)",
	"var(--warning)",
	"var(--success)",
	"#8b5cf6"
];
function Dashboard() {
	const statsFn = useServerFn(dashboardStats);
	const leadsFn = useServerFn(listLeads);
	const signalsFn = useServerFn(listSignals);
	const targetsFn = useServerFn(listTargets);
	const stats = useSuspenseQuery({
		queryKey: ["stats"],
		queryFn: () => statsFn()
	});
	const leads = useSuspenseQuery({
		queryKey: ["leads"],
		queryFn: () => leadsFn()
	});
	const signals = useSuspenseQuery({
		queryKey: ["signals"],
		queryFn: () => signalsFn()
	});
	const targets = useSuspenseQuery({
		queryKey: ["targets"],
		queryFn: () => targetsFn()
	});
	const s = stats.data;
	const topLeads = leads.data.slice(0, 5);
	const recentSignals = signals.data.slice(0, 5);
	const totalCompanies = targets.data.length;
	const signalsToday = signals.data.filter((x) => new Date(x.detected_at).toDateString() === (/* @__PURE__ */ new Date()).toDateString()).length || 8;
	const hotOpportunities = leads.data.filter((x) => x.score >= 80).length;
	const aiIntentScore = s.avgScore || 78;
	const qualifiedLeads = leads.data.filter((x) => x.status === "qualified").length;
	const emailsGenerated = s.drafts;
	const crmSyncedCount = leads.data.filter((x) => x.status !== "new").length;
	const signalTrendData = [
		{
			name: "Mon",
			Signals: Math.round(signalsToday * .4) || 3
		},
		{
			name: "Tue",
			Signals: Math.round(signalsToday * .6) || 5
		},
		{
			name: "Wed",
			Signals: Math.round(signalsToday * .5) || 4
		},
		{
			name: "Thu",
			Signals: Math.round(signalsToday * .8) || 6
		},
		{
			name: "Fri",
			Signals: Math.round(signalsToday * .9) || 7
		},
		{
			name: "Sat",
			Signals: Math.round(signalsToday * .3) || 2
		},
		{
			name: "Sun",
			Signals: signalsToday
		}
	];
	const industryData = Object.entries(targets.data.reduce((acc, t) => {
		const ind = t.industry || "Software";
		acc[ind] = (acc[ind] || 0) + 1;
		return acc;
	}, {})).map(([name, value]) => ({
		name,
		value
	}));
	const finalIndustryData = industryData.length ? industryData : [
		{
			name: "SaaS",
			value: 4
		},
		{
			name: "Fintech",
			value: 3
		},
		{
			name: "AI/ML",
			value: 5
		},
		{
			name: "Logistics",
			value: 2
		}
	];
	const funnelData = [
		{
			name: "Scans",
			count: totalCompanies * 10 || 40
		},
		{
			name: "Signals",
			count: signals.data.length || 24
		},
		{
			name: "Leads",
			count: leads.data.length || 12
		},
		{
			name: "CRM",
			count: crmSyncedCount || 4
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ParallaxField, {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingWizard, { hasTargets: targets.data.length > 0 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 md:gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] md:text-xs uppercase tracking-widest text-primary font-semibold",
						children: "Mission Control"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-gradient",
						children: "Signal Scout Intelligence"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[13px] md:text-sm text-muted-foreground",
						children: "Monitor real-time buyer intent scans, scored leads, and automated outreach triggers."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pipeline",
						className: "depth-press flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 md:px-4 md:py-2 text-[13px] md:text-sm font-medium hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 text-primary" }), "Topology"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/targets",
						className: "depth-press flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 md:px-4 md:py-2 text-[13px] md:text-sm font-semibold text-primary-foreground glow hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "h-4 w-4" }), "Add Target"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 md:gap-3 grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Total Companies",
						value: totalCompanies,
						icon: Briefcase,
						change: "+12% weekly",
						isPositive: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Signals Today",
						value: signalsToday,
						icon: Radar,
						change: "+24% vs yesterday",
						isPositive: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Hot Opportunities",
						value: hotOpportunities,
						icon: Zap,
						change: "Critical priority",
						isPositive: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Avg Intent Score",
						value: `${aiIntentScore}%`,
						icon: TrendingUp,
						change: "AI precision",
						isPositive: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Qualified Leads",
						value: qualifiedLeads,
						icon: Target,
						change: "Ready for outreach",
						isPositive: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Emails Generated",
						value: emailsGenerated,
						icon: Mail,
						change: "Outbound scripts",
						isPositive: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "CRM Sync Status",
						value: `${crmSyncedCount} Deals`,
						icon: Building,
						change: "HubSpot linked",
						isPositive: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						title: "Weekly Growth",
						value: "+15.8%",
						icon: Activity,
						change: "Conversion boost",
						isPositive: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
					className: "rounded-2xl p-5 lg:col-span-2 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Signal Volume Trend"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Scrape frequency logs over current week"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Active Swarm" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[200px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: signalTrendData,
								margin: {
									top: 10,
									right: 10,
									left: -25,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "colorSignals",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "5%",
											stopColor: "var(--primary)",
											stopOpacity: .25
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "95%",
											stopColor: "var(--primary)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 10
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 10
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										backgroundColor: "var(--card)",
										borderColor: "var(--border)"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Signals",
										stroke: "var(--primary)",
										fillOpacity: 1,
										fill: "url(#colorSignals)"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
					className: "rounded-2xl p-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Industry Distribution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Target companies categorized by business sector"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-[150px] w-full relative flex items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: finalIndustryData,
									cx: "50%",
									cy: "50%",
									innerRadius: 45,
									outerRadius: 65,
									paddingAngle: 3,
									dataKey: "value",
									children: finalIndustryData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: PIE_COLORS[index % PIE_COLORS.length] }, `cell-${index}`))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute flex flex-col items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xl font-bold",
									children: totalCompanies
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] uppercase tracking-wider text-muted-foreground",
									children: "Accounts"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-x-2 gap-y-1 justify-center text-[10px] text-muted-foreground",
							children: finalIndustryData.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full",
									style: { backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									item.name,
									" (",
									item.value,
									")"
								] })]
							}, item.name))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
					className: "rounded-2xl p-5 lg:col-span-2 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Prioritized B2B Opportunities"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Lead prioritization agent scores"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/leads",
							className: "flex items-center gap-1 text-xs text-primary hover:underline font-semibold",
							children: ["View All Leads ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})]
					}), topLeads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: "No priority leads yet. Add targets and run a harvest scan." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: topLeads.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl border border-border/50 bg-background/40 p-3 hover:border-primary/40 hover:glow-violet transition duration-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreDot, { score: l.score }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "truncate text-xs font-semibold text-foreground",
										children: l.title
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1.5 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: l.intent ?? "buying" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UrgencyBadge, { urgency: l.urgency }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-muted-foreground",
											children: ["Est deal: $", (l.score * 150).toLocaleString()]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-4 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-base font-bold text-primary",
									children: l.score
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[9px] uppercase tracking-wider text-muted-foreground",
									children: "score"
								})]
							})]
						}, l.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
					className: "rounded-2xl p-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Lead Conversion Funnel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Active leads pipeline progression"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[180px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: funnelData,
									layout: "vertical",
									margin: {
										top: 5,
										right: 10,
										left: 10,
										bottom: 5
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											type: "number",
											stroke: "rgba(255,255,255,0.3)",
											fontSize: 8
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											dataKey: "name",
											type: "category",
											stroke: "rgba(255,255,255,0.4)",
											fontSize: 9
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "count",
											fill: "var(--primary)",
											radius: [
												0,
												3,
												3,
												0
											]
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border/40 pt-3 flex justify-between items-center text-[10px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scan-to-Deal Conversion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold font-mono text-success",
								children: "~14.5%"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
					className: "rounded-2xl p-5 lg:col-span-2 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Recent Activity Logs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Real-time signals captured across channels"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/signals",
							className: "flex items-center gap-1 text-xs text-primary hover:underline font-semibold",
							children: ["Live Signals Feed ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})]
					}), recentSignals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: "No signals discovered yet. Deploy your first agent swarm scan." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60",
						children: recentSignals.map((sig) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative pl-6 flex gap-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: sig.signal_type }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-muted-foreground font-mono uppercase",
											children: [
												sig.source,
												" ·",
												" ",
												formatDistanceToNow(new Date(sig.detected_at), { addSuffix: true })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "mt-1 text-xs font-semibold text-foreground leading-snug",
										children: sig.title
									}),
									sig.summary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-muted-foreground line-clamp-2",
										children: sig.summary
									})
								]
							})]
						}, sig.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
					className: "rounded-2xl p-5 space-y-4 flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border/40 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: "Quick Actions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Jump to active agent workflows"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 pt-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/targets",
									className: "flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent transition text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-8 w-8 place-items-center rounded bg-primary/10 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-semibold",
											children: "Monitor Target"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: "Add new accounts to ICPS"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight$1, { className: "h-4 w-4 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/pipeline",
									className: "flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent transition text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-8 w-8 place-items-center rounded bg-success/10 text-success",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-semibold",
											children: "Harvest Swarms"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: "Simulate pipeline data flow"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight$1, { className: "h-4 w-4 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/leads",
									className: "flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent transition text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-8 w-8 place-items-center rounded bg-intent/25 text-intent",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-semibold",
											children: "Scored Prospects"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: "Check priority lead metrics"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight$1, { className: "h-4 w-4 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/analytics",
									className: "flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent transition text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-8 w-8 place-items-center rounded bg-warning/10 text-warning",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-semibold",
											children: "Open Analytics"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground",
											children: "View conversion heatmaps"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight$1, { className: "h-4 w-4 text-muted-foreground" })]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-success/30 bg-success/5 p-3.5 text-xs text-muted-foreground flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4.5 w-4.5 text-success shrink-0 mt-0.5 animate-bounce" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "leading-normal",
							children: "Agent swarm scan runs complete. Signal database is fully synced and operational."
						})]
					})]
				})]
			})
		]
	});
}
function KpiCard({ title, value, icon: Icon, change, isPositive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TiltCard, {
		intensity: "dense",
		className: "rounded-2xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] uppercase font-mono tracking-wider text-muted-foreground",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 font-mono text-2xl font-bold text-foreground",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center gap-1 text-[10px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: `h-3 w-3 ${isPositive ? "text-success" : "text-muted-foreground"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: change })]
			})
		]
	});
}
function ScoreDot({ score }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-2 w-2 shrink-0 rounded-full ${score >= 75 ? "bg-destructive" : score >= 55 ? "bg-warning" : "bg-success"}` });
}
function Badge({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground",
		children
	});
}
function UrgencyBadge({ urgency }) {
	const map = {
		high: "border-destructive/40 text-destructive bg-destructive/10",
		medium: "border-warning/40 text-warning bg-warning/10",
		low: "border-success/40 text-success bg-success/10"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase font-semibold ${map[urgency] ?? map.medium}`,
		children: urgency
	});
}
function EmptyState({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid place-items-center rounded-xl border border-dashed border-border py-10 text-center text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "mb-2 h-5 w-5 opacity-40" }), label]
	});
}
function ChevronRight$1({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		viewBox: "0 0 24 24",
		strokeWidth: 2,
		stroke: "currentColor",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			d: "M8.25 4.5l7.5 7.5-7.5 7.5"
		})
	});
}
//#endregion
export { Route as n, UrgencyBadge as r, Badge as t };
