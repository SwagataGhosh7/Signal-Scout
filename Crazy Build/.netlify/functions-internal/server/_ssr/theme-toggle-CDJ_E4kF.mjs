import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Moon, h as Sun } from "../_libs/lucide-react.mjs";
import { n as useTheme } from "./theme-provider-vKK-mT73.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-CDJ_E4kF.js
var import_jsx_runtime = require_jsx_runtime();
function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
		className: "relative grid h-9 w-9 place-items-center rounded-md border border-border bg-card/50 text-muted-foreground backdrop-blur transition-all hover:bg-accent hover:text-foreground hover:glow",
		"aria-label": "Toggle theme",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })]
	});
}
//#endregion
export { ThemeToggle as t };
