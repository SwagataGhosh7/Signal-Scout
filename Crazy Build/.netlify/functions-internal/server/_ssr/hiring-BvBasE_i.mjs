import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as ParallaxField, r as TiltCard, t as DepthLayer } from "./depth-system-OoRGzMrR.mjs";
import { B as GraduationCap, C as Search, J as Download, M as MapPin, U as FileText, Y as DollarSign, a as Users, et as Clock3, ft as Briefcase, g as Sparkles, gt as ArrowUpRight, j as MessageSquare, l as TrendingUp, pt as Brain, rt as CircleCheck, t as Zap, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { _ as Tooltip, a as YAxis, f as PolarAngleAxis, g as ResponsiveContainer, i as BarChart, l as Bar, m as PolarGrid, n as RadarChart, o as XAxis, p as PolarRadiusAxis, s as Area, t as AreaChart, u as Radar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hiring-BvBasE_i.js
var import_jsx_runtime = require_jsx_runtime();
var candidatePool = [
	{
		id: 1,
		name: "Maya Patel",
		role: "Senior React Engineer",
		location: "Remote · US",
		match: 96,
		scoreLabel: "Excellent",
		experience: "7 yrs",
		skills: [
			"React",
			"TypeScript",
			"LLM",
			"GraphQL"
		],
		summary: "Led AI-assisted product teams and shipped multilingual onboarding flows."
	},
	{
		id: 2,
		name: "Daniel Kim",
		role: "LLM Engineer",
		location: "New York · Hybrid",
		match: 92,
		scoreLabel: "Excellent",
		experience: "6 yrs",
		skills: [
			"Python",
			"PyTorch",
			"RAG",
			"LangChain"
		],
		summary: "Built production retrieval pipelines and evaluation harnesses for enterprise copilots."
	},
	{
		id: 3,
		name: "Sofia Alvarez",
		role: "AI Researcher",
		location: "San Francisco · On-site",
		match: 88,
		scoreLabel: "Strong",
		experience: "8 yrs",
		skills: [
			"ML",
			"Transformers",
			"Research",
			"Publishing"
		],
		summary: "Published benchmark work on multimodal reasoning and open-source model evals."
	}
];
var recommendationCards = [
	{
		title: "Best Fit",
		detail: "Maya Patel aligns with product-led AI engineering and strong React leadership."
	},
	{
		title: "Fastest Learner",
		detail: "Sofia Alvarez shows rapid model experimentation velocity and strong mentorship signals."
	},
	{
		title: "Future Leader",
		detail: "Daniel Kim combines deep LLM systems knowledge with strong cross-functional influence."
	}
];
var skillDistribution = [
	{
		name: "React",
		value: 72
	},
	{
		name: "Python",
		value: 68
	},
	{
		name: "LLMs",
		value: 81
	},
	{
		name: "Cloud",
		value: 57
	},
	{
		name: "Data",
		value: 64
	}
];
var readinessProfile = [
	{
		subject: "Tech",
		score: 92
	},
	{
		subject: "Leadership",
		score: 84
	},
	{
		subject: "Communication",
		score: 88
	},
	{
		subject: "Growth",
		score: 90
	},
	{
		subject: "Culture",
		score: 78
	}
];
var interviewQuestions = [
	{
		type: "Technical",
		question: "Design a retrieval layer that keeps LLM answers grounded with real-time product data."
	},
	{
		type: "Behavioral",
		question: "Describe how you handled a difficult cross-functional launch with unclear ownership."
	},
	{
		type: "LLM",
		question: "How would you evaluate prompt quality, hallucination rate, and tool-call reliability?"
	}
];
var hiringTrend = [
	{
		month: "Apr",
		reviewed: 24,
		shortlisted: 10
	},
	{
		month: "May",
		reviewed: 38,
		shortlisted: 16
	},
	{
		month: "Jun",
		reviewed: 46,
		shortlisted: 22
	},
	{
		month: "Jul",
		reviewed: 58,
		shortlisted: 31
	}
];
function HiringPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] text-primary",
						children: "Enterprise Talent Intelligence"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-semibold tracking-tight",
						children: "AI Talent Intelligence & Hiring Agent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: "Discover, evaluate, and prioritize elite candidates with authorized data sources, Gemini 3 Flash scoring, and recruiter-ready interview plans."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Authorized data only · Gemini 3 Flash analysis" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						title: "Candidates Reviewed",
						value: "128",
						hint: "+18 this week",
						icon: Users,
						accent: "text-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						title: "Average Match Score",
						value: "91.4",
						hint: "Across active roles",
						icon: TrendingUp,
						accent: "text-success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						title: "Top Skills",
						value: "LLMs / React",
						hint: "Most in-demand",
						icon: Brain,
						accent: "text-intent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						title: "Hiring Funnel",
						value: "31",
						hint: "Shortlisted this month",
						icon: Briefcase,
						accent: "text-warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ParallaxField, {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
						className: "rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "AI Talent Search"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Run role-aware talent queries with skills, experience, salary, and location filters."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									"Senior React Developer",
									"LLM Engineer",
									"AI Researcher",
									"Prompt Engineer"
								].map((query) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-full border border-border bg-background/50 px-3 py-1 text-[11px] text-muted-foreground transition hover:bg-accent",
									children: query
								}, query))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-col gap-3 rounded-xl border border-border/70 bg-background/50 p-3 lg:flex-row lg:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 items-center gap-2 rounded-lg border border-border/70 bg-background/70 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: "Senior React Developer",
									readOnly: true,
									className: "w-full bg-transparent text-sm text-foreground outline-none"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, { label: "Remote" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, { label: "7+ yrs" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, { label: "$180k+" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, { label: "LLM / React" })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 xl:grid-cols-[1.5fr_0.9fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
							className: "rounded-2xl p-5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold",
									children: "Candidate Pipeline"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Ranked candidates with AI match scoring, skill fit, and growth potential."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary",
									children: "Top 10 Ranked"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: candidatePool.map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TiltCard, {
									intensity: "dense",
									className: "rounded-2xl border border-border/60 bg-background/40 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-semibold text-foreground",
														children: candidate.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-success",
														children: candidate.scoreLabel
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-sm text-muted-foreground",
													children: candidate.role
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-2 flex flex-wrap gap-2 text-[10px] text-muted-foreground",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), candidate.location]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-3 w-3" }), candidate.experience]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-3 w-3" }), "$185k"]
														})
													]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-border/70 bg-card/60 px-3 py-2 text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
													children: "AI Match"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-mono text-xl font-semibold text-primary",
													children: candidate.match
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm text-muted-foreground",
											children: candidate.summary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 flex flex-wrap gap-2",
											children: candidate.skills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[10px] text-foreground",
												children: skill
											}, skill))
										})
									]
								}, candidate.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
							className: "rounded-2xl p-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-semibold",
										children: "AI Recommendations"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Signals that matter when recruiters decide who to advance."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: recommendationCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/70 bg-background/50 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-sm font-semibold text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }), card.title]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: card.detail
										})]
									}, card.title))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-primary/20 bg-primary/10 p-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 font-semibold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-primary" }), "Suggested action"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2",
										children: "Schedule interviews with Maya and Daniel this afternoon and prepare a structured LLM evaluation kit."
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 xl:grid-cols-[1.1fr_0.9fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
							className: "rounded-2xl p-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-semibold",
										children: "Resume Intelligence"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Upload a PDF or DOCX to extract, summarize, and compare against the role."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "rounded-full border border-border bg-background/50 px-3 py-1 text-[11px] text-muted-foreground transition hover:bg-accent",
										children: "Upload Resume"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-dashed border-border/70 bg-background/50 p-4 text-center text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto mb-2 h-6 w-6 text-primary" }), "Drag a resume here or use the upload action to extract insights instantly."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 md:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/70 bg-background/50 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
											children: "Summary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-foreground",
											children: "Strong product engineering profile with leadership, stable delivery history, and proven ML experimentation."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/70 bg-background/50 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
											children: "Missing Skills"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-foreground",
											children: "Fine-tune on distributed systems, search ranking, and enterprise deployment experience."
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
							className: "rounded-2xl p-5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold",
									children: "Interview Assistant"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Generate technical, behavioral, and LLM-specific questions instantly."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-primary" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: interviewQuestions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/70 bg-background/50 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
										children: item.type
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-foreground",
										children: item.question
									})]
								}, item.type))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 xl:grid-cols-[1.1fr_0.9fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
							className: "rounded-2xl p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold",
									children: "Hiring Analytics"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Monitor candidate volume, shortlist velocity, and skill demand over time."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4 text-muted-foreground" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 h-60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
										data: hiringTrend,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "month",
												stroke: "rgba(255,255,255,0.4)",
												fontSize: 10
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "rgba(255,255,255,0.4)",
												fontSize: 10
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: "reviewed",
												stroke: "var(--primary)",
												fill: "rgba(99,102,241,0.18)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: "shortlisted",
												stroke: "var(--success)",
												fill: "rgba(16,185,129,0.16)"
											})
										]
									})
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
							className: "rounded-2xl p-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-semibold",
										children: "Skills Intelligence"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "A quick view of the strongest emerging skill clusters."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4 text-primary" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-56",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
											data: skillDistribution,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													dataKey: "name",
													stroke: "rgba(255,255,255,0.45)",
													fontSize: 10
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													stroke: "rgba(255,255,255,0.45)",
													fontSize: 10
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
													dataKey: "value",
													radius: [
														6,
														6,
														0,
														0
													],
													fill: "var(--primary)"
												})
											]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/70 bg-background/50 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
										children: "Readiness Profile"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 h-40",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
											width: "100%",
											height: "100%",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
												data: readinessProfile,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "rgba(255,255,255,0.12)" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
														dataKey: "subject",
														tick: {
															fontSize: 10,
															fill: "rgba(255,255,255,0.7)"
														}
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
														angle: 30,
														domain: [0, 100],
														tick: false
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
														dataKey: "score",
														stroke: "var(--primary)",
														fill: "rgba(99,102,241,0.25)"
													})
												]
											})
										})
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
						className: "rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "AI Copilot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Ask the recruiter assistant for ranking, comparisons, interview plans, or resume summaries."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-full border border-border bg-background/50 px-3 py-1 text-[11px] text-muted-foreground",
								children: "Example prompts: “Find the best LLM Engineer”"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: [
									"Find the best LLM Engineer",
									"Compare Candidate A vs Candidate B",
									"Generate interview questions",
									"Summarize this resume"
								].map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex w-full items-center justify-between rounded-xl border border-border/70 bg-background/50 px-3 py-2 text-left text-sm text-foreground transition hover:bg-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: prompt }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" })]
								}, prompt))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/20 bg-primary/10 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
									children: "Current Recommendation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-foreground",
									children: "Maya Patel is the best fit for the hiring mandate based on React leadership, strong AI product experience, and strong communication signals."
								})]
							})]
						})]
					})
				]
			})
		]
	});
}
function MetricCard({ title, value, hint, icon: Icon, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TiltCard, {
		intensity: "dense",
		className: "rounded-2xl border border-border/60 bg-card/50 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `rounded-lg bg-background/60 p-2 ${accent}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 font-mono text-2xl font-semibold text-foreground",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: hint
			})
		]
	});
}
function FilterChip({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground",
		children: label
	});
}
//#endregion
export { HiringPage as component };
