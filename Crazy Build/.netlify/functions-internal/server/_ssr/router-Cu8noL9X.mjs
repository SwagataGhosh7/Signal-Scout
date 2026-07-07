import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as DepthLayer } from "./depth-system-OoRGzMrR.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { C as Search, D as Radar, N as Mail, Q as Command, U as FileText, b as Settings, ct as ChartColumn, dt as Building2, g as Sparkles, m as Target, r as Workflow, t as Zap, yt as Activity } from "../_libs/lucide-react.mjs";
import { n as Route$17 } from "./app-CT6gZdT0.mjs";
import { t as supabase } from "./client-BwKVtb3U.mjs";
import { t as ThemeProvider } from "./theme-provider-vKK-mT73.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cu8noL9X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-wIeQSvpq.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function CommandPalette() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const down = (e) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((o) => !o);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);
	if (!open) return null;
	const runCommand = (action) => {
		action();
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-background/80 p-4 pt-[15vh] backdrop-blur-sm",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthLayer, {
			level: "floating",
			className: "w-full max-w-lg rounded-2xl overflow-hidden",
			onClick: (e) => e.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				label: "Search Command Palette",
				className: "flex flex-col h-[300px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center border-b border-border/50 px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4.5 w-4.5 text-muted-foreground mr-2 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
							autoFocus: true,
							placeholder: "Search actions, dashboards, or resources...",
							className: "w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
						className: "flex-1 overflow-y-auto p-2 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
								className: "py-6 text-center text-xs text-muted-foreground",
								children: "No results found."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Group, {
								heading: "Navigation",
								className: "text-[10px] text-muted-foreground uppercase font-mono px-2 py-1.5 font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/app" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }), " Go to Dashboard"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/targets" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }), " Target Accounts Management"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/signals" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "h-4 w-4" }), " Live Signals Feed"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/leads" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }), " AI-Scored Leads"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/outreach" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " Outreach Draft Scripts"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Group, {
								heading: "Integrations & Analytics",
								className: "text-[10px] text-muted-foreground uppercase font-mono px-2 py-1.5 font-bold pt-3 border-t border-border/30 mt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/crm" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }), " CRM Integration Boards"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/analytics" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4" }), " Open Analytics & Heatmaps"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/automation" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "h-4 w-4" }), " Visual Automation Builder"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/pipeline" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " AI Agentic Pipeline Diagram"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/reports" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), " Executive Data Exports"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
										onSelect: () => runCommand(() => navigate({ to: "/settings" })),
										className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }), " Project Preferences & Settings"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border/50 bg-background/50 px-3.5 py-2 flex items-center justify-between text-[10px] text-muted-foreground font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "h-3 w-3" }), " Press Esc to close"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Use ↑↓ to navigate, Enter to select" })]
					})
				]
			})
		})
	});
}
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const router = useRouter();
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const checkInitialSession = async () => {
			const { data: { session } } = await supabase.auth.getSession();
			if (!mounted) return;
			if (session) {
				setSession(session);
				setUser(session.user);
				setLoading(false);
				console.log("[AuthProvider] initial session:", session);
				console.log("[AuthProvider] Session exists on startup -> navigating to /app");
				router.navigate({
					to: "/app",
					replace: true
				}).then((res) => console.log("[AuthProvider] Startup redirect navigation success:", res)).catch((e) => console.warn("[AuthProvider] Startup redirect navigation failed:", e));
			} else {
				setSession(null);
				setUser(null);
				setLoading(false);
				console.log("[AuthProvider] initial session: null");
			}
		};
		checkInitialSession();
		const { data: sub } = supabase.auth.onAuthStateChange((event, sessionArg) => {
			console.log("[AuthProvider] onAuthStateChange event:", event, "session:", sessionArg);
			setSession(sessionArg ?? null);
			setUser(sessionArg?.user ?? null);
			setLoading(false);
			router.invalidate();
			if (event === "SIGNED_IN") {
				console.log("[AuthProvider] SIGNED_IN -> navigating to /app");
				router.navigate({
					to: "/app",
					replace: true
				}).then((res) => console.log("[AuthProvider] AuthState SIGNED_IN navigation success:", res)).catch((e) => console.warn("[AuthProvider] SIGNED_IN navigate error:", e));
			}
			if (event === "SIGNED_OUT") {
				console.log("[AuthProvider] SIGNED_OUT -> navigating to /auth");
				router.navigate({
					to: "/auth",
					replace: true
				}).then((res) => console.log("[AuthProvider] AuthState SIGNED_OUT navigation success:", res)).catch((e) => console.warn("[AuthProvider] SIGNED_OUT navigate error:", e));
			}
		});
		return () => {
			mounted = false;
			try {
				sub.subscription.unsubscribe();
			} catch {}
		};
	}, [router]);
	const login = async (email, password) => {
		setLoading(true);
		const res = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (res.error) {
			console.error("[AuthProvider] login error", res.error);
			setLoading(false);
		} else {
			console.log("[AuthProvider] login success", res.data.session);
			setSession(res.data.session ?? null);
			setUser(res.data.session?.user ?? null);
			setLoading(false);
		}
		return res;
	};
	const signup = async (email, password, options) => {
		setLoading(true);
		const res = await supabase.auth.signUp({
			email,
			password,
			options
		});
		if (res.error) {
			console.error("[AuthProvider] signup error", res.error);
			setLoading(false);
		} else {
			console.log("[AuthProvider] signup success", res.data.user);
			if (res.data.session) {
				setSession(res.data.session);
				setUser(res.data.session.user);
			} else if (res.data.user) setUser(res.data.user);
			setLoading(false);
		}
		return res;
	};
	const logout = async () => {
		setLoading(true);
		await supabase.auth.signOut();
		setUser(null);
		setSession(null);
		setLoading(false);
		console.log("[AuthProvider] logout complete");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			session,
			loading,
			login,
			logout,
			signup
		},
		children
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-gradient",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Signal lost"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for isn't in our feed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
						children: "Return to base"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Transmission interrupted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try refreshing the feed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Signal Scout — Agentic AI Workflow System" },
			{
				name: "description",
				content: "Signal Scout deploys autonomous agents to harvest buying, hiring, funding, and creator signals in real-time to automate B2B outreach."
			},
			{
				property: "og:title",
				content: "Signal Scout — Agentic AI Workflow System"
			},
			{
				property: "og:description",
				content: "AI signal harvesting for sales & growth teams."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,100..900;1,100..900&family=Unbounded:wght@200..900&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	const router = useRouter();
	const routerState = router.state;
	(0, import_react.useEffect)(() => {
		const checkStartupAuth = async () => {
			const { data: { session } } = await supabase.auth.getSession();
			console.log("[Root] startup session check:", session ?? null);
			console.log("[Debug Logs] === Startup ===");
			console.log("[Debug Logs] Current URL on startup:", window.location.href);
			console.log("[Debug Logs] Current Session on startup:", session);
			console.log("[Debug Logs] Authenticated User on startup:", session?.user ?? null);
			console.log("[Debug Logs] Router State on startup:", routerState);
			console.log("[Debug Logs] ===============");
			if (session) {
				console.log("[Root] Redirecting to /app immediately on startup...");
				router.navigate({
					to: "/app",
					replace: true
				}).then((res) => console.log("[Root] Startup redirect Navigation Result: success", res)).catch((err) => console.error("[Root] Startup redirect Navigation Result: failed", err));
			}
		};
		checkStartupAuth();
	}, []);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			console.log("[Debug Logs] Router State Changed");
			console.log("[Debug Logs] Current URL:", window.location.href);
			console.log("[Debug Logs] Current Session:", session);
			console.log("[Debug Logs] Authenticated User:", session?.user ?? null);
			console.log("[Debug Logs] Router State:", routerState);
		});
	}, [routerState]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, {
			defaultTheme: "dark",
			storageKey: "signal-scout-theme",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-screen items-center justify-center bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" })
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-right",
					richColors: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {})
			] })
		})
	});
}
var BASE_URL = "";
var Route$15 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[{
		path: "/",
		changefreq: "weekly",
		priority: "1.0"
	}].map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$14 = () => import("./auth-CDdRcEe6.mjs");
var Route$14 = createFileRoute("/auth")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./route-B14nDrKZ.mjs");
var Route$13 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data: { session }, error } = await supabase.auth.getSession();
		console.log("[RouteGuard] getSession result:", {
			session,
			error
		});
		console.log("[Debug Logs] === RouteGuard ===");
		console.log("[Debug Logs] Current URL in RouteGuard:", window.location.href);
		console.log("[Debug Logs] Current Session in RouteGuard:", session);
		console.log("[Debug Logs] Authenticated User in RouteGuard:", session?.user ?? null);
		console.log("[Debug Logs] ==================");
		if (error || !session) {
			console.warn("[RouteGuard] No valid session — redirecting to /auth");
			console.log("[Debug Logs] Navigation Result: redirecting to /auth");
			throw redirect({ to: "/auth" });
		}
		console.log("[RouteGuard] Session valid for user:", session.user.email);
		return { user: session.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./routes-9I_wQOx5.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./targets-QfAUr6jf.mjs");
var Route$11 = createFileRoute("/_authenticated/targets")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./signals-D7a4Y_Bk.mjs");
var Route$10 = createFileRoute("/_authenticated/signals")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./settings-Djt0StzU.mjs");
var Route$9 = createFileRoute("/_authenticated/settings")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./reports-DKeNoVca.mjs");
var Route$8 = createFileRoute("/_authenticated/reports")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./pipeline-NM0K8Gqx.mjs");
var Route$7 = createFileRoute("/_authenticated/pipeline")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./outreach-lLB6Zcnu.mjs");
var Route$6 = createFileRoute("/_authenticated/outreach")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./leads-BBM2o0nr.mjs");
var Route$5 = createFileRoute("/_authenticated/leads")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./hiring-BvBasE_i.mjs");
var Route$4 = createFileRoute("/_authenticated/hiring")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./crm-B-7h8GwQ.mjs");
var Route$3 = createFileRoute("/_authenticated/crm")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./automation-6nEFegIw.mjs");
var Route$2 = createFileRoute("/_authenticated/automation")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./analytics-BhavG8pC.mjs");
var Route$1 = createFileRoute("/_authenticated/analytics")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./route-xAi9FrAb.mjs");
var Route = createFileRoute("/_authenticated/talent")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var SitemapDotxmlRoute = Route$15.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$16
});
var AuthRoute = Route$14.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$16
});
var AuthenticatedRouteRoute = Route$13.update({
	id: "/_authenticated",
	getParentRoute: () => Route$16
});
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var AuthenticatedTargetsRoute = Route$11.update({
	id: "/targets",
	path: "/targets",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSignalsRoute = Route$10.update({
	id: "/signals",
	path: "/signals",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$9.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReportsRoute = Route$8.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPipelineRoute = Route$7.update({
	id: "/pipeline",
	path: "/pipeline",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOutreachRoute = Route$6.update({
	id: "/outreach",
	path: "/outreach",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLeadsRoute = Route$5.update({
	id: "/leads",
	path: "/leads",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedHiringRoute = Route$4.update({
	id: "/hiring",
	path: "/hiring",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCrmRoute = Route$3.update({
	id: "/crm",
	path: "/crm",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAutomationRoute = Route$2.update({
	id: "/automation",
	path: "/automation",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAppRoute = Route$17.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAnalyticsRoute = Route$1.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedTalentRouteRoute: Route.update({
		id: "/talent",
		path: "/talent",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedAnalyticsRoute,
	AuthenticatedAppRoute,
	AuthenticatedAutomationRoute,
	AuthenticatedCrmRoute,
	AuthenticatedHiringRoute,
	AuthenticatedLeadsRoute,
	AuthenticatedOutreachRoute,
	AuthenticatedPipelineRoute,
	AuthenticatedReportsRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSignalsRoute,
	AuthenticatedTargetsRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	SitemapDotxmlRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
