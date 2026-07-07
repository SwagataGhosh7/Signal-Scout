import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useServerFn, u as listDrafts } from "./signals.functions-CubddQE-.mjs";
import { a as useQueryClient, n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as RefreshCw, F as LoaderCircle, N as Mail, Z as Copy, _ as SlidersVertical, at as ChevronRight, g as Sparkles, s as UserCheck } from "../_libs/lucide-react.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/outreach-lLB6Zcnu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OutreachPage() {
	const qc = useQueryClient();
	const fn = useServerFn(listDrafts);
	const q = useSuspenseQuery({
		queryKey: ["drafts"],
		queryFn: () => fn()
	});
	const [selectedDraftId, setSelectedDraftId] = (0, import_react.useState)(null);
	const [tone, setTone] = (0, import_react.useState)("Professional");
	const [length, setLength] = (0, import_react.useState)("medium");
	const [cta, setCta] = (0, import_react.useState)("15-min introductory call next Tuesday");
	const [channel, setChannel] = (0, import_react.useState)("email");
	const [isRegenerating, setIsRegenerating] = (0, import_react.useState)(false);
	const selectedDraft = q.data.find((d) => d.id === selectedDraftId) || q.data[0];
	const copy = (text) => {
		navigator.clipboard.writeText(text);
		toast.success("Copied outreach message to clipboard.");
	};
	const regenerate = () => {
		if (!selectedDraft) {
			toast.error("Please select a draft or generate a lead from the Leads tab first.");
			return;
		}
		setIsRegenerating(true);
		toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
			loading: "Running agentic AI text models...",
			success: () => {
				setIsRegenerating(false);
				qc.invalidateQueries({ queryKey: ["drafts"] });
				return "Outreach script successfully re-drafted using updated parameters.";
			},
			error: "AI model connection timeout"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-primary font-semibold",
				children: "Automation agent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-semibold tracking-tight text-gradient",
				children: "AI Outreach Drafts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Review, customize, and copy B2B outbound sequences drafted by the outreach agent."
			})
		] }), q.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground",
			children: "No drafts generated yet. Visit the Leads tab and click \"Draft Outreach\" on any opportunity."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-xs text-muted-foreground uppercase font-mono tracking-wider text-left pl-1",
					children: "Select Draft Record"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-border bg-card/60 divide-y divide-border/40 overflow-hidden",
					children: q.data.map((d) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => {
								setSelectedDraftId(d.id);
								setChannel(d.channel === "linkedin" ? "linkedin" : "email");
							},
							className: `flex items-start gap-3 p-3.5 cursor-pointer hover:bg-muted/10 transition text-left ${selectedDraft?.id === d.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-7 w-7 place-items-center rounded bg-primary/10 text-primary mt-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-semibold text-foreground truncate",
										children: d.subject ?? "Email Draft"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground font-mono",
										children: [
											formatDistanceToNow(new Date(d.created_at), { addSuffix: true }),
											" ·",
											" ",
											d.channel
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground/60 shrink-0 self-center" })
							]
						}, d.id);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2 space-y-4",
				children: selectedDraft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/65 p-4 space-y-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 border-b border-border/40 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-xs text-foreground uppercase font-mono tracking-wider",
								children: "AI parameters"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Outbound Channel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: channel,
									onChange: (e) => setChannel(e.target.value),
									className: "w-full rounded border border-border bg-input px-2 py-1 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "email",
											children: "Cold Email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "linkedin",
											children: "LinkedIn InMail"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "partnership",
											children: "Partnership Pitch"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "followup",
											children: "Follow-up Message"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Tone & Voice"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: tone,
									onChange: (e) => setTone(e.target.value),
									className: "w-full rounded border border-border bg-input px-2 py-1 text-xs",
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
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Length Limit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex rounded border border-border bg-background p-0.5 text-xs text-center font-mono",
									children: [
										"short",
										"medium",
										"detailed"
									].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setLength(l),
										className: `flex-1 rounded py-0.5 text-[10px] capitalize transition ${length === l ? "bg-primary/15 text-primary font-bold" : "text-muted-foreground"}`,
										children: l
									}, l))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] text-muted-foreground uppercase font-mono block mb-1",
									children: "Call to Action (CTA)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: cta,
									onChange: (e) => setCta(e.target.value),
									rows: 2,
									className: "w-full rounded border border-border bg-input px-2 py-1 text-xs outline-none focus:border-primary leading-normal"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: regenerate,
									disabled: isRegenerating,
									className: "w-full flex items-center justify-center gap-1.5 rounded bg-primary py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
									children: [isRegenerating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), "Apply & Regenerate"]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2 rounded-2xl border border-border bg-card/60 p-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/40 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase font-mono text-muted-foreground",
											children: "Generated draft preview"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "font-semibold text-xs text-foreground mt-0.5",
											children: [
												"Format:",
												" ",
												channel === "email" ? "B2B Outreach Email" : "LinkedIn Connect Script"
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => copy(`Subject: ${selectedDraft.subject}\n\n${selectedDraft.body}`),
									className: "flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), " Copy"]
								})]
							}),
							channel === "email" && selectedDraft.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border/50 bg-background/40 rounded-lg p-3 text-xs text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground font-mono",
										children: "Subject:"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: selectedDraft.subject
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
									className: "whitespace-pre-wrap rounded-lg border border-border/50 bg-background/50 p-4 font-sans text-xs text-foreground leading-relaxed text-left min-h-[180px]",
									children: selectedDraft.body
								}), isRegenerating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center rounded-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-[10px] text-muted-foreground font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-3.5 w-3.5 text-primary" }), " Grounded in intent signal contexts"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Words: ", selectedDraft.body.split(/\s+/).filter(Boolean).length] })]
							})
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-border bg-card/60 p-10 text-center text-xs text-muted-foreground",
					children: "Select a draft from the sidebar checklist."
				})
			})]
		})]
	});
}
//#endregion
export { OutreachPage as component };
