import { f as Outlet, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as ParallaxField } from "./depth-system-OoRGzMrR.mjs";
import { C as Search, U as FileText, V as GitBranch, a as Users, ct as ChartColumn, g as Sparkles, j as MessageSquare, pt as Brain } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-xAi9FrAb.js
var import_jsx_runtime = require_jsx_runtime();
var ALL_TALENT_ROUTES = {
	label: "AI Hiring",
	icon: Users,
	badge: "AI",
	basePath: "/talent",
	children: [
		{
			to: "/talent",
			label: "AI Hiring",
			icon: Sparkles,
			badge: null
		},
		{
			to: "/talent/search",
			label: "Talent Search",
			icon: Search,
			badge: null
		},
		{
			to: "/talent/candidates",
			label: "Candidate Pipeline",
			icon: GitBranch,
			badge: null
		},
		{
			to: "/talent/resumes",
			label: "Resume Intelligence",
			icon: FileText,
			badge: null
		},
		{
			to: "/talent/interviews",
			label: "Interview Assistant",
			icon: MessageSquare,
			badge: null
		},
		{
			to: "/talent/skills",
			label: "Skills Intelligence",
			icon: Brain,
			badge: null
		},
		{
			to: "/talent/analytics",
			label: "Hiring Analytics",
			icon: ChartColumn,
			badge: null
		}
	]
}.children;
function TalentNav() {
	const loc = useLocation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex gap-1 overflow-x-auto rounded-xl border border-border/60 bg-card/40 p-1 backdrop-blur-sm",
		children: ALL_TALENT_ROUTES.map((item) => {
			const active = item.to === "/talent" ? loc.pathname === "/talent" || loc.pathname === "/talent/" : loc.pathname.startsWith(item.to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				className: `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${active ? "bg-primary/15 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-3.5 w-3.5" }), item.label]
			}, item.to);
		})
	});
}
function TalentLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ParallaxField, {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TalentNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
	});
}
//#endregion
export { TalentLayout as component };
