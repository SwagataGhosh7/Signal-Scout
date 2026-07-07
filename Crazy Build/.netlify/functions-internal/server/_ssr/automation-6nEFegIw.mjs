import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Radar, L as Info, N as Mail, O as Play, R as History, _t as ArrowRight, d as ToggleRight, dt as Building2, f as ToggleLeft, pt as Brain, t as Zap, x as Settings2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/automation-6nEFegIw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INITIAL_NODES = [
	{
		id: "scantargets",
		label: "Signal Scraped",
		icon: Radar,
		enabled: true,
		desc: "Agent swarm scrapes LinkedIn, jobs, news and X daily.",
		config: {
			freq: "Daily",
			min_confidence: 70
		}
	},
	{
		id: "geminianalyze",
		label: "Intent Analysis Agent",
		icon: Brain,
		enabled: true,
		desc: "Gemini models evaluate intent categories & urgency.",
		config: {
			model: "Gemini 3.5 Flash",
			buying_intent: true,
			hiring_intent: true
		}
	},
	{
		id: "prioritizelead",
		label: "Lead Prioritizer",
		icon: Zap,
		enabled: true,
		desc: "Lead score threshold filters qualified prospects.",
		config: {
			min_score: 65,
			deal_size_est: true
		}
	},
	{
		id: "outreachdraft",
		label: "Outreach Draft",
		icon: Mail,
		enabled: true,
		desc: "AI auto-generates personalized emails for sales reps.",
		config: {
			tone: "Professional",
			cta: "15 min intro chat",
			auto_send: false
		}
	},
	{
		id: "crmsync",
		label: "CRM Sync & Alert",
		icon: Building2,
		enabled: true,
		desc: "Create Deal inside CRM & send notification.",
		config: {
			provider: "HubSpot",
			slack_alerts: true,
			webhook: "https://hooks.slack.com/services/..."
		}
	}
];
var RUN_HISTORY = [
	{
		time: "Just now",
		target: "Supabase",
		action: "Lead Sync",
		result: "Synced as CRM Deal #421",
		status: "success"
	},
	{
		time: "2 hours ago",
		target: "Vercel",
		action: "Outreach Draft",
		result: "Email drafted (Executive tone)",
		status: "success"
	},
	{
		time: "4 hours ago",
		target: "Stripe",
		action: "Lead Score",
		result: "Score calculated: 92 (Critical)",
		status: "success"
	},
	{
		time: "Yesterday",
		target: "Retool",
		action: "Signal Harvest",
		result: "Harvested 4 expansion signals",
		status: "success"
	}
];
function AutomationPage() {
	const [nodes, setNodes] = (0, import_react.useState)(INITIAL_NODES);
	const [selectedNodeId, setSelectedNodeId] = (0, import_react.useState)("prioritizelead");
	const [isRunning, setIsRunning] = (0, import_react.useState)(false);
	const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
	const handleToggle = (id, e) => {
		e.stopPropagation();
		setNodes(nodes.map((n) => n.id === id ? {
			...n,
			enabled: !n.enabled
		} : n));
		const n = nodes.find((x) => x.id === id);
		if (n) toast.info(`${n.label} auto-step ${n.enabled ? "disabled" : "enabled"}`);
	};
	const updateConfig = (key, value) => {
		setNodes(nodes.map((n) => n.id === selectedNodeId ? {
			...n,
			config: {
				...n.config,
				[key]: value
			}
		} : n));
	};
	const triggerPipeline = () => {
		setIsRunning(true);
		toast.promise(new Promise((resolve) => setTimeout(resolve, 2e3)), {
			loading: "Running agentic pipeline scan...",
			success: () => {
				setIsRunning(false);
				return "Workflow run complete. Scanned targets, drafted emails, and updated CRM dashboards.";
			},
			error: "Pipeline error"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-primary",
					children: "AI Agent Workflows"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-semibold tracking-tight",
					children: "Automation Engine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Configure agent swarms, set lead score filters, and control how leads flow to the CRM."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: triggerPipeline,
				disabled: isRunning,
				className: "flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow hover:opacity-90 disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), " Run Workflow"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 rounded-2xl border border-border bg-card/60 p-6 flex flex-col justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-sm",
						children: "Visual Workflow Pipeline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5" }), " Tap nodes to configure options"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col items-center py-4 space-y-6",
					children: nodes.map((n, index) => {
						const Icon = n.icon;
						const active = n.id === selectedNodeId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setSelectedNodeId(n.id),
								className: `relative w-full max-w-md rounded-2xl border p-4 cursor-pointer transition flex items-center justify-between ${active ? "border-primary bg-primary/10 glow" : n.enabled ? "border-border bg-background/50 hover:border-border/80" : "border-border/30 bg-muted/5 opacity-55 hover:opacity-80"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `grid h-9 w-9 place-items-center rounded-lg border ${active ? "bg-primary/20 border-primary text-primary" : n.enabled ? "bg-muted border-border/80 text-foreground" : "bg-muted/30 border-border/30 text-muted-foreground"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
												className: "font-medium text-xs text-foreground flex items-center gap-1.5",
												children: [n.label, n.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-success pulse-dot" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-muted" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: n.desc
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: (e) => handleToggle(n.id, e),
										className: "text-muted-foreground hover:text-foreground transition",
										children: n.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-6 w-6 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-6 w-6 text-muted-foreground/60" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -left-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground bg-card border border-border h-5 w-5 rounded-full flex items-center justify-center shadow",
										children: index + 1
									})
								]
							}), index !== nodes.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-2 flex flex-col items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4.5 w-0.5 bg-gradient-to-b from-primary to-border/30 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 rotate-90 text-primary -mt-1" })]
							})]
						}, n.id);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border/40 pt-4 flex justify-between items-center text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Workflow Status: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-success font-semibold",
						children: "Active Swarm"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Nodes: 5" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b border-border/40 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-sm",
								children: ["Configure: ", selectedNode.label]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								selectedNode.id === "scantargets" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Scan Frequency"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: selectedNode.config.freq,
									onChange: (e) => updateConfig("freq", e.target.value),
									className: "w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Real-time",
											children: "Continuous Swarm (Premium)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Hourly",
											children: "Hourly Intervals"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Daily",
											children: "Daily Routine Scans"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[11px] text-muted-foreground uppercase font-mono block mb-1",
									children: [
										"Min Confidence Score (",
										selectedNode.config.min_confidence,
										"%)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: "50",
									max: "95",
									value: selectedNode.config.min_confidence,
									onChange: (e) => updateConfig("min_confidence", parseInt(e.target.value)),
									className: "w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
								})] })] }),
								selectedNode.id === "geminianalyze" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] text-muted-foreground uppercase font-mono block mb-1",
									children: "AI Processor"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: selectedNode.config.model,
									onChange: (e) => updateConfig("model", e.target.value),
									className: "w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Gemini 3.5 Flash",
											children: "Gemini 3.5 Flash (Primary)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Llama 3.3 (Groq)",
											children: "Llama 3.3 Versatile (Groq)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "OpenAI GPT-4o",
											children: "OpenAI Compatible (GPT-4o)"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 pt-1 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											id: "buy",
											checked: selectedNode.config.buying_intent,
											onChange: (e) => updateConfig("buying_intent", e.target.checked)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "buy",
											className: "text-muted-foreground",
											children: "Extract buying intent signals"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											id: "hire",
											checked: selectedNode.config.hiring_intent,
											onChange: (e) => updateConfig("hiring_intent", e.target.checked)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "hire",
											className: "text-muted-foreground",
											children: "Extract hiring intent signals"
										})]
									})]
								})] }),
								selectedNode.id === "prioritizelead" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[11px] text-muted-foreground uppercase font-mono block mb-1",
										children: [
											"Qualifying Threshold Score (",
											selectedNode.config.min_score,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: "50",
										max: "95",
										value: selectedNode.config.min_score,
										onChange: (e) => updateConfig("min_score", parseInt(e.target.value)),
										className: "w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[10px] text-muted-foreground mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Low Filters" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "High Threshold" })]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										id: "est",
										checked: selectedNode.config.deal_size_est,
										onChange: (e) => updateConfig("deal_size_est", e.target.checked)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "est",
										className: "text-muted-foreground",
										children: "Auto-estimate deal values"
									})]
								})] }),
								selectedNode.id === "outreachdraft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Default Template Persona"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: selectedNode.config.tone,
									onChange: (e) => updateConfig("tone", e.target.value),
									className: "w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Professional",
											children: "Professional Corporate"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Friendly",
											children: "Friendly SaaS Founder"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Executive",
											children: "Executive Briefing"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Startup",
											children: "Bold Startup Pitch"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Call to Action (CTA)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: selectedNode.config.cta,
									onChange: (e) => updateConfig("cta", e.target.value),
									className: "w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs outline-none focus:border-primary"
								})] })] }),
								selectedNode.id === "crmsync" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Sync Target CRM"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: selectedNode.config.provider,
									onChange: (e) => updateConfig("provider", e.target.value),
									className: "w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "HubSpot",
											children: "HubSpot CRM"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Salesforce",
											children: "Salesforce CRM"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Zoho",
											children: "Zoho CRM"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Slack Alerts Webhook URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: selectedNode.config.webhook,
									onChange: (e) => updateConfig("webhook", e.target.value),
									className: "w-full rounded-md border border-border bg-input px-2 py-1.5 text-xs outline-none focus:border-primary text-muted-foreground"
								})] })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => toast.success("Configuration successfully updated."),
							className: "w-full rounded-md bg-muted hover:bg-accent border border-border px-3 py-2 text-xs font-semibold",
							children: "Apply Settings"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Execution History"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border/40",
						children: RUN_HISTORY.map((h, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-2.5 flex items-start justify-between gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-medium text-foreground flex items-center gap-1.5",
									children: [
										h.action,
										" · ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: h.target
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: h.result
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground block",
									children: h.time
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block mt-0.5 text-[8px] uppercase tracking-wider font-semibold font-mono text-success bg-success/10 px-1 rounded border border-success/30",
									children: h.status
								})]
							})]
						}, index))
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { AutomationPage as component };
