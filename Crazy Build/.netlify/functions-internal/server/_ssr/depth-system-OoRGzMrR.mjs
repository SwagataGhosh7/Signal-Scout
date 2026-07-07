import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/depth-system-OoRGzMrR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function TiltCard({ children, className, intensity = "default", disabled = false, ...props }) {
	const ref = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(false);
	const [tilt, setTilt] = (0, import_react.useState)({
		x: 0,
		y: 0,
		glowX: 0,
		glowY: 0
	});
	const [reducedMotion, setReducedMotion] = (0, import_react.useState)(false);
	const [isTouch, setIsTouch] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateReducedMotion = () => setReducedMotion(media.matches);
		updateReducedMotion();
		media.addEventListener?.("change", updateReducedMotion);
		const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
		const updateTouch = () => setIsTouch(touchQuery.matches);
		updateTouch();
		touchQuery.addEventListener?.("change", updateTouch);
		return () => {
			media.removeEventListener?.("change", updateReducedMotion);
			touchQuery.removeEventListener?.("change", updateTouch);
		};
	}, []);
	const maxTilt = (0, import_react.useMemo)(() => {
		switch (intensity) {
			case "showcase": return 8;
			case "dense": return 4;
			default: return 6;
		}
	}, [intensity]);
	const shouldTilt = !disabled && !reducedMotion && !isTouch;
	const handleMove = (event) => {
		if (!shouldTilt || !ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const rotateY = ((x / rect.width - .5) * maxTilt).toFixed(2);
		const rotateX = ((rect.height / 2 - y) / rect.height * maxTilt).toFixed(2);
		setTilt({
			x: Number(rotateX),
			y: Number(rotateY),
			glowX: x - rect.width / 2,
			glowY: y - rect.height / 2
		});
		setActive(true);
	};
	const handleLeave = () => {
		setActive(false);
		setTilt({
			x: 0,
			y: 0,
			glowX: 0,
			glowY: 0
		});
	};
	const transform = shouldTilt && active ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(0, -6px, 0)` : shouldTilt ? `rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)` : "translate3d(0, 0, 0)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("depth-tilt-card depth-tilt-card--" + intensity, className),
		onMouseMove: shouldTilt ? handleMove : void 0,
		onMouseEnter: () => shouldTilt && setActive(true),
		onMouseLeave: shouldTilt ? handleLeave : void 0,
		...props,
		style: {
			transform,
			["--tilt-glow-x"]: `${tilt.glowX}px`,
			["--tilt-glow-y"]: `${tilt.glowY}px`
		},
		children
	});
}
function DepthLayer({ children, className, level = "panel", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("depth-layer", `depth-layer--${level}`, className),
		...props,
		children
	});
}
function ParallaxField({ children, className }) {
	const [offset, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [reducedMotion, setReducedMotion] = (0, import_react.useState)(false);
	const [isTouch, setIsTouch] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateReducedMotion = () => setReducedMotion(media.matches);
		updateReducedMotion();
		media.addEventListener?.("change", updateReducedMotion);
		const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
		const updateTouch = () => setIsTouch(touchQuery.matches);
		updateTouch();
		touchQuery.addEventListener?.("change", updateTouch);
		return () => {
			media.removeEventListener?.("change", updateReducedMotion);
			touchQuery.removeEventListener?.("change", updateTouch);
		};
	}, []);
	const handleMove = (event) => {
		if (reducedMotion || isTouch) return;
		const rect = event.currentTarget.getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width - .5) * 4;
		const y = ((event.clientY - rect.top) / rect.height - .5) * 4;
		setOffset({
			x: -x,
			y: -y
		});
	};
	const handleLeave = () => setOffset({
		x: 0,
		y: 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("depth-parallax-field", className),
		onMouseMove: handleMove,
		onMouseLeave: handleLeave,
		style: {
			["--parallax-x"]: `${offset.x}px`,
			["--parallax-y"]: `${offset.y}px`
		},
		children
	});
}
//#endregion
export { cn as i, ParallaxField as n, TiltCard as r, DepthLayer as t };
