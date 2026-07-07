import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn, r as TiltCard, t as DepthLayer } from "./depth-system-OoRGzMrR.mjs";
import { C as Search, D as Radar, N as Mail, P as LogOut, S as Send, U as FileText, at as ChevronRight, b as Settings, ct as ChartColumn, dt as Building2, ft as Briefcase, g as Sparkles, ht as ArrowUp, k as Network, m as Target, n as X, ot as ChevronLeft, r as Workflow, t as Zap, yt as Activity } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-BwKVtb3U.mjs";
import { t as ThemeToggle } from "./theme-toggle-CDJ_E4kF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-B14nDrKZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/app",
		label: "Dashboard",
		icon: Activity,
		badge: null
	},
	{
		to: "/targets",
		label: "Targets",
		icon: Target,
		badge: null
	},
	{
		to: "/signals",
		label: "Signal Feed",
		icon: Radar,
		badge: "Live"
	},
	{
		to: "/leads",
		label: "Leads",
		icon: Zap,
		badge: "Hot"
	},
	{
		to: "/outreach",
		label: "Outreach",
		icon: Mail,
		badge: null
	},
	{
		to: "/crm",
		label: "CRM Sync",
		icon: Building2,
		badge: null
	},
	{
		to: "/analytics",
		label: "Analytics",
		icon: ChartColumn,
		badge: null
	},
	{
		to: "/automation",
		label: "Automation",
		icon: Workflow,
		badge: null
	},
	{
		to: "/pipeline",
		label: "AI Pipeline",
		icon: Network,
		badge: "AI"
	},
	{
		to: "/hiring",
		label: "AI Hiring",
		icon: Briefcase,
		badge: "New"
	},
	{
		to: "/reports",
		label: "Reports",
		icon: FileText,
		badge: null
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings,
		badge: null
	}
];
function AppNav() {
	const loc = useLocation();
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (localStorage.getItem("sidebar_collapsed") === "true") setCollapsed(true);
	}, []);
	const toggleCollapse = () => {
		const next = !collapsed;
		setCollapsed(next);
		localStorage.setItem("sidebar_collapsed", String(next));
	};
	const signOut = async () => {
		await supabase.auth.signOut();
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
		level: "floating",
		className: `hidden md:flex flex-col border-r border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-300 ease-in-out shrink-0 sticky top-0 h-screen ${collapsed ? "w-16" : "w-64"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-16 items-center justify-between px-4 border-b border-border/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app",
					className: "flex items-center gap-2 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "h-4 w-4 animate-pulse" })
					}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-sm tracking-tight text-gradient whitespace-nowrap",
						children: "Signal Scout"
					})]
				}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: toggleCollapse,
					className: "rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
				})]
			}),
			!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						const event = new KeyboardEvent("keydown", {
							key: "k",
							metaKey: true,
							bubbles: true
						});
						window.dispatchEvent(event);
					},
					className: "flex w-full items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3 w-3" }), " Search (Ctrl+K)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "rounded bg-muted px-1.5 text-[10px] font-mono",
						children: "⌘K"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 space-y-0.5 px-2 py-3 overflow-y-auto",
				children: items.map((it) => {
					const active = loc.pathname.startsWith(it.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: it.to,
						className: `flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition ${active ? "bg-primary/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"}`,
						title: collapsed ? it.label : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: `h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}` }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: it.label
							})]
						}), !collapsed && it.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase ${it.badge === "Live" ? "bg-success/15 text-success border border-success/30" : it.badge === "Hot" ? "bg-destructive/15 text-destructive border border-destructive/30" : "bg-primary/15 text-primary border border-primary/30"}`,
							children: it.badge
						})]
					}, it.to);
				})
			}),
			!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-2 my-2 p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-xs text-muted-foreground flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-primary font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Agentic Co-Pilot" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] leading-relaxed",
					children: "AI Agents are scanning targets. Tap the bubble to talk."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border/40 p-2 space-y-1",
				children: [
					!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Theme"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
					}),
					collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex w-full items-center justify-center py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
					}),
					collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: toggleCollapse,
						className: "flex w-full items-center justify-center rounded-lg py-2 text-muted-foreground hover:bg-accent",
						title: "Expand menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4.5 w-4.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: signOut,
						className: `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition w-full ${collapsed ? "justify-center" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4.5 w-4.5 shrink-0" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out" })]
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthLayer, {
		level: "floating",
		className: "md:hidden flex flex-col w-full bg-card/40 backdrop-blur sticky top-0 z-20 border-b border-border/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-12 items-center justify-between px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "h-4 w-4 animate-pulse" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold tracking-tight text-gradient",
					children: "Signal Scout"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: signOut,
					className: "rounded-md p-1.5 text-muted-foreground hover:bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex gap-0.5 overflow-x-auto border-t border-border/60 px-1.5 py-1 bg-background/50 scrollbar-hide",
			children: items.map((it) => {
				const active = loc.pathname.startsWith(it.to);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: it.to,
					className: `flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition ${active ? "bg-primary/15 text-primary" : "text-muted-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.label })]
				}, it.to);
			})
		})]
	})] });
}
function AiAssistant() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([{
		sender: "ai",
		text: "Hello! I am your Signal Scout Co-Pilot. I watch over targets, score lead intent levels, and draft outreach scripts. What can I check for you today?"
	}]);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, open]);
	const handleSend = (textToSend) => {
		const query = (textToSend || input).trim();
		if (!query) return;
		setMessages((prev) => [...prev, {
			sender: "user",
			text: query
		}]);
		setInput("");
		setTimeout(() => {
			let response = "I'm checking the signal databases for that now. Let me know if you want me to queue a HubSpot sync.";
			const q = query.toLowerCase();
			if (q.includes("buying") || q.includes("intent")) response = "I have detected 3 companies with HIGH Buying Intent: Vercel ($40M Series C funding), Supabase (hiring sales engineers), and Stripe (integrating OpenAI models). I suggest drafting an Executive Outreach script for Vercel immediately.";
			else if (q.includes("hiring")) response = "Supabase has posted 4 new positions for 'Sales Engineer' and 'Enterprise Solutions Architect' on LinkedIn. This indicates strong hiring intent and structural scaling. Would you like me to draft an outreach note targeting their Head of Sales?";
			else if (q.includes("outreach") || q.includes("email") || q.includes("script")) response = "Sure, I have already prepared email templates in the 'Outreach' page. I recommend using the 'Friendly' tone when pitching startups or 'Executive' tone for Series C entities.";
			else if (q.includes("summary") || q.includes("scans") || q.includes("today")) response = "Signal Scout agents completed 14 target scans today. They harvested 8 new signals (4 hiring, 2 buying, 2 product updates). Average opportunity score calculated: 78%.";
			setMessages((prev) => [...prev, {
				sender: "ai",
				text: response
			}]);
		}, 1e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-5 right-5 z-40",
		children: [!open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen(true),
			className: "depth-float flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition duration-200 glow",
			title: "Open AI Co-Pilot",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 animate-pulse" })
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TiltCard, {
			intensity: "showcase",
			className: "w-80 sm:w-96 h-[450px] rounded-2xl overflow-hidden flex flex-col justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-primary/10 border-b border-border/40 px-4 py-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-primary font-semibold text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 animate-bounce" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Signal Scout Co-Pilot" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-success pulse-dot" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						className: "rounded p-1 text-muted-foreground hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 space-y-3",
					children: [messages.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex ${m.sender === "user" ? "justify-end" : "justify-start"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-2xl px-3 py-2 text-xs leading-normal max-w-[80%] text-left ${m.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border border-border"}`,
							children: m.text
						})
					}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
				}),
				messages.length === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 py-1 flex flex-col gap-1.5 items-start",
					children: [
						"Identify companies with buying intent",
						"List today's hiring signals",
						"What is the best time to email Vercel?"
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => handleSend(s),
						className: "rounded-full border border-border bg-background hover:bg-accent px-3 py-1 text-[10px] text-muted-foreground text-left max-w-full truncate",
						children: s
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						handleSend();
					},
					className: "border-t border-border/50 px-3 py-2 flex items-center gap-2 bg-background/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: "Ask about target signals, intent, CRM...",
						className: "flex-1 bg-transparent text-xs text-foreground outline-none py-1 placeholder:text-muted-foreground"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !input.trim(),
						className: "rounded bg-primary p-1.5 text-primary-foreground hover:opacity-90 disabled:opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3 w-3" })
					})]
				})
			]
		})]
	});
}
function ScrollToTop() {
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const scrollArea = document.getElementById("main-scroll-area");
		if (!scrollArea) return;
		const toggleVisibility = () => {
			if (scrollArea.scrollTop > 300) setIsVisible(true);
			else setIsVisible(false);
		};
		scrollArea.addEventListener("scroll", toggleVisibility);
		return () => scrollArea.removeEventListener("scroll", toggleVisibility);
	}, []);
	const scrollToTop = () => {
		const scrollArea = document.getElementById("main-scroll-area");
		if (scrollArea) scrollArea.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: scrollToTop,
		"aria-label": "Scroll to top",
		className: cn("fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background", isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-5 w-5" })
	});
}
function Layout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col md:flex-row min-h-screen bg-background text-foreground relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-y-auto px-2 py-3 md:px-5 md:py-6 relative",
				id: "main-scroll-area",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiAssistant, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollToTop, {})
		]
	});
}
//#endregion
export { Layout as component };
