import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as Key, N as Mail, i as Webhook, it as CircleAlert, mt as Bell, rt as CircleCheck, w as Save } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Djt0StzU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const [keys, setKeys] = (0, import_react.useState)({
		gemini: "AIzaSyD-gemini-3-flash-key-scout",
		groq: "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",
		openai: "sk-proj-********************",
		supabaseUrl: "https://mfpgxfebcotwzgxzsvxg.supabase.co"
	});
	const [emailConfig, setEmailConfig] = (0, import_react.useState)({
		provider: "SMTP",
		host: "smtp.mailgun.org",
		port: "587",
		user: "outbound@signalscout.ai",
		sender: "Signal Scout Outbound <outbound@signalscout.ai>"
	});
	const [webhooks, setWebhooks] = (0, import_react.useState)({
		slack: "",
		leads: "https://api.signalscout.ai/v1/webhooks/leads",
		active: true
	});
	const [notifications, setNotifications] = (0, import_react.useState)({
		emailOnHarvest: true,
		emailOnHotLead: true,
		slackOnDeal: true,
		dailySummary: false
	});
	const [savingKeys, setSavingKeys] = (0, import_react.useState)(false);
	const [savingEmail, setSavingEmail] = (0, import_react.useState)(false);
	const [savingWebhooks, setSavingWebhooks] = (0, import_react.useState)(false);
	const handleSaveKeys = (e) => {
		e.preventDefault();
		setSavingKeys(true);
		setTimeout(() => {
			setSavingKeys(false);
			toast.success("API keys updated", { description: "Agent swarms will now query updated models." });
		}, 800);
	};
	const handleSaveEmail = (e) => {
		e.preventDefault();
		setSavingEmail(true);
		setTimeout(() => {
			setSavingEmail(false);
			toast.success("Email configuration saved", { description: "Ready to send outbound draft requests." });
		}, 800);
	};
	const handleSaveWebhooks = (e) => {
		e.preventDefault();
		setSavingWebhooks(true);
		setTimeout(() => {
			setSavingWebhooks(false);
			toast.success("Webhook endpoints updated.");
		}, 800);
	};
	const toggleNotif = (key) => {
		setNotifications({
			...notifications,
			[key]: !notifications[key]
		});
		toast.success("Notification preferences updated.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-primary",
				children: "System Config"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-semibold tracking-tight",
				children: "Project Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Manage API credentials, configure outbound email channels, webhooks, and alert preferences."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "AI Providers & API Keys"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveKeys,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
								children: "Gemini Pro/Flash API Key"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: keys.gemini,
								onChange: (e) => setKeys({
									...keys,
									gemini: e.target.value
								}),
								className: "w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
								children: "Groq API Key"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: keys.groq,
								onChange: (e) => setKeys({
									...keys,
									groq: e.target.value
								}),
								className: "w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
								children: "OpenAI Compatible API Key"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: keys.openai,
								onChange: (e) => setKeys({
									...keys,
									openai: e.target.value
								}),
								className: "w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
								children: "Supabase Endpoint URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								disabled: true,
								value: keys.supabaseUrl,
								className: "w-full rounded-md border border-border bg-input/50 px-3 py-2 text-xs outline-none font-mono text-muted-foreground"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 text-warning" }), " Credentials stored in secure local environment"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: savingKeys,
									className: "flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), savingKeys ? "Saving..." : "Save Keys"]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Outbound Email Inbox"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveEmail,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
								children: "Provider Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: emailConfig.provider,
								onChange: (e) => setEmailConfig({
									...emailConfig,
									provider: e.target.value
								}),
								className: "w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SMTP",
										children: "Custom SMTP Relay (Recommended)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Resend",
										children: "Resend API Integration"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SendGrid",
										children: "SendGrid API"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
										children: "Host Server"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: emailConfig.host,
										onChange: (e) => setEmailConfig({
											...emailConfig,
											host: e.target.value
										}),
										className: "w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Port"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: emailConfig.port,
									onChange: (e) => setEmailConfig({
										...emailConfig,
										port: e.target.value
									}),
									className: "w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
								children: "Sender Mask (From Header)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: emailConfig.sender,
								onChange: (e) => setEmailConfig({
									...emailConfig,
									sender: e.target.value
								}),
								className: "w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-success" }), " Active connection verified"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: savingEmail,
									className: "flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), savingEmail ? "Verifying..." : "Save Config"]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Webhook, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Outgoing Webhooks"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveWebhooks,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
								children: "Slack Channel Webhook (Slack Alerts)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: webhooks.slack,
								onChange: (e) => setWebhooks({
									...webhooks,
									slack: e.target.value
								}),
								className: "w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
								children: "Leads Outflow Hook Endpoint"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: webhooks.leads,
								onChange: (e) => setWebhooks({
									...webhooks,
									leads: e.target.value
								}),
								className: "w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										id: "hook-state",
										checked: webhooks.active,
										onChange: (e) => setWebhooks({
											...webhooks,
											active: e.target.checked
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "hook-state",
										className: "text-muted-foreground",
										children: "Webhooks are active"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: savingWebhooks,
									className: "flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), "Save Webhooks"]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Notifications & Alerts"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3.5 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-medium text-foreground",
									children: "Email on Target Scanned"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground leading-relaxed",
									children: "Send inbox alerts every time a company's target signals are finished harvesting."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: notifications.emailOnHarvest,
									onChange: () => toggleNotif("emailOnHarvest"),
									className: "rounded text-primary focus:ring-primary h-4.5 w-4.5 border-border bg-input"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-medium text-foreground",
									children: "Immediate alert on Hot Leads"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground leading-relaxed",
									children: "Email when AI detects a critical-urgency signal with score exceeding 85."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: notifications.emailOnHotLead,
									onChange: () => toggleNotif("emailOnHotLead"),
									className: "rounded text-primary focus:ring-primary h-4.5 w-4.5 border-border bg-input"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-medium text-foreground",
									children: "Slack Sync Success Ping"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground leading-relaxed",
									children: "Ping connected Slack channel when a lead is qualified and pushed to the CRM."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: notifications.slackOnDeal,
									onChange: () => toggleNotif("slackOnDeal"),
									className: "rounded text-primary focus:ring-primary h-4.5 w-4.5 border-border bg-input"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-medium text-foreground",
									children: "Daily Briefing Digest"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground leading-relaxed",
									children: "Send a consolidated morning PDF summary of new lead activity logs."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: notifications.dailySummary,
									onChange: () => toggleNotif("dailySummary"),
									className: "rounded text-primary focus:ring-primary h-4.5 w-4.5 border-border bg-input"
								})]
							})
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
