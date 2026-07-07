import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Radar, T as Rocket, m as Target, pt as Brain, t as Zap, yt as Activity } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-CDJ_E4kF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-9I_wQOx5.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-mesh-light opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 grid-bg opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex items-center justify-between px-6 py-5 md:px-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold tracking-tight",
						children: "Signal Scout"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 animate-reveal-up stagger-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
							children: "Sign in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground glow hover:opacity-90 transition-all hover:scale-105 active:scale-95",
							children: "Get started"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto max-w-5xl px-6 py-20 text-center md:py-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs backdrop-blur animate-reveal-up stagger-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground font-mono",
							children: "Agentic AI · 5-stage signal pipeline"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 text-5xl font-bold tracking-tight md:text-7xl animate-reveal-up stagger-2",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient",
								children: "signal"
							}),
							" your ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden md:block" }),
							"pipeline was missing."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-reveal-up stagger-3",
						children: "Signal Scout deploys an autonomous agent swarm that watches LinkedIn, Twitter/X, funding news, hiring posts, product launches, and web changes — then prioritizes the opportunities you should act on right now."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap justify-center gap-3 animate-reveal-up stagger-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground glow hover:opacity-90 transition-all hover:scale-105 active:scale-95",
							children: "Start harvesting signals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#pipeline",
							className: "rounded-md border border-border bg-card/50 px-6 py-3 font-medium backdrop-blur transition-all hover:bg-accent hover:border-primary/50",
							children: "See the pipeline"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "pipeline",
				className: "relative z-10 mx-auto max-w-6xl px-6 py-16 animate-reveal-up stagger-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-primary font-mono",
						children: "Agentic workflow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl font-semibold md:text-4xl",
						children: "Five agents. One pipeline."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-5",
					children: [
						{
							icon: Radar,
							name: "Collect",
							desc: "Scrape LinkedIn, X, jobs, news, web."
						},
						{
							icon: Brain,
							name: "Analyze",
							desc: "Detect hiring, buying, partnership intent."
						},
						{
							icon: Target,
							name: "Prioritize",
							desc: "Score urgency & conversion potential."
						},
						{
							icon: Zap,
							name: "Automate",
							desc: "Draft outreach, create CRM entries."
						},
						{
							icon: Activity,
							name: "Intelligence",
							desc: "Heatmaps & conversion analytics."
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative rounded-2xl border border-border bg-card/50 p-5 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-card hover:-translate-y-1 hover:glow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors",
									children: ["0", i + 1]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-lg",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground leading-relaxed",
								children: s.desc
							})
						]
					}, s.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10 mx-auto max-w-6xl px-6 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: [
						{
							icon: Radar,
							title: "Always-on monitoring",
							body: "Add a target once. Agents scan continuously and surface fresh signals across every source."
						},
						{
							icon: Brain,
							title: "AI intent scoring",
							body: "Each signal is classified by intent, urgency, and conversion potential — 0 to 100."
						},
						{
							icon: Rocket,
							title: "Ready-to-send outreach",
							body: "Personalized email drafts generated in one click, grounded in the signal that triggered them."
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/40 p-6 backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 grid h-10 w-10 place-items-center rounded-lg bg-intent/20 text-intent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: f.body
							})
						]
					}, f.title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-8 text-center animate-reveal-up stagger-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/20 p-10 backdrop-blur glow transition-all hover:border-primary/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-semibold md:text-4xl",
							children: "Stop monitoring. Start closing."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-muted-foreground",
							children: "Deploy your first signal-harvesting agent in 60 seconds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/auth",
							className: "mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground glow hover:opacity-90 transition-all hover:scale-105 active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }), "Deploy agent"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative z-10 border-t border-border/50 py-8 text-center text-xs text-muted-foreground",
				children: "Signal Scout · Signals Harvesting Engine & Agentic AI Workflow System"
			})
		]
	});
}
//#endregion
export { Landing as component };
