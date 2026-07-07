import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useServerFn, c as generateReportSummary, f as listReports, h as saveReport, i as deleteReport, o as fetchReportData } from "./signals.functions-CubddQE-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as LoaderCircle, G as FileCode, J as Download, U as FileText, W as FileSpreadsheet, g as Sparkles, rt as CircleCheck, u as Trash2, z as HardDrive } from "../_libs/lucide-react.mjs";
import { t as require_papaparse } from "../_libs/papaparse.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
import { n as writeSync, t as utils } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-DKeNoVca.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_papaparse = /* @__PURE__ */ __toESM(require_papaparse());
var import_jspdf_node_min = require_jspdf_node_min();
function formatBytes(bytes) {
	if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	let size = bytes;
	let unitIndex = 0;
	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex += 1;
	}
	return `${Number.isInteger(size) ? size.toString() : size.toFixed(1)} ${units[unitIndex]}`;
}
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40);
}
function toDisplayValue(value) {
	if (value === null || value === void 0) return "—";
	if (typeof value === "object") return JSON.stringify(value);
	return String(value);
}
function generateReportFile(data, format) {
	const fileName = `${slugify(data.title || "signal-scout-report")}.${format.toLowerCase()}`;
	if (format === "PDF") return generatePDF(data, fileName);
	if (format === "Excel") return generateExcel(data, fileName);
	return generateCSV(data, fileName);
}
function generatePDF(data, fileName) {
	const doc = new import_jspdf_node_min.jsPDF({
		orientation: "portrait",
		unit: "pt",
		format: "a4"
	});
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	doc.setFillColor(14, 116, 144);
	doc.rect(0, 0, pageWidth, 72, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFontSize(22);
	doc.text(data.title, 40, 38);
	doc.setFontSize(10);
	doc.text(`${data.reportType} • Generated ${new Date(data.generatedAt).toLocaleString()}`, 40, 56);
	doc.setTextColor(15, 23, 42);
	doc.setFontSize(14);
	doc.text("Executive Summary", 40, 100);
	doc.setFontSize(10);
	const summaryText = data.summary || "No summary available.";
	doc.text(summaryText, 40, 120, {
		maxWidth: pageWidth - 80,
		lineHeightFactor: 1.4
	});
	autoTable(doc, {
		startY: 170,
		head: [["Metric", "Value"]],
		body: Object.entries(data.stats).map(([metric, value]) => [metric.replace(/([A-Z])/g, " $1"), toDisplayValue(value)]),
		theme: "grid",
		styles: { fontSize: 9 },
		headStyles: {
			fillColor: [
				15,
				23,
				42
			],
			textColor: [
				255,
				255,
				255
			]
		},
		alternateRowStyles: { fillColor: [
			248,
			250,
			252
		] }
	});
	const rowData = data.tableRows ?? [];
	if (rowData.length > 0) {
		const headers = Object.keys(rowData[0]).slice(0, 6);
		const body = rowData.slice(0, 15).map((row) => headers.map((header) => toDisplayValue(row[header])));
		autoTable(doc, {
			startY: doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 24 : 320,
			head: [headers.map((header) => header.replace(/_/g, " "))],
			body,
			theme: "striped",
			styles: { fontSize: 8 },
			headStyles: {
				fillColor: [
					30,
					41,
					59
				],
				textColor: [
					255,
					255,
					255
				]
			}
		});
	}
	doc.setFontSize(8);
	doc.setTextColor(107, 114, 128);
	doc.text("Generated directly in the browser • Signal Scout", 40, pageHeight - 24);
	const blob = doc.output("blob");
	return {
		blob,
		fileName,
		fileSize: formatBytes(blob.size),
		mimeType: "application/pdf"
	};
}
function generateExcel(data, fileName) {
	const workbook = utils.book_new();
	const summarySheet = utils.aoa_to_sheet([
		["Title", data.title],
		["Type", data.reportType],
		["Generated", new Date(data.generatedAt).toLocaleString()],
		["Summary", data.summary || "No summary available."],
		...Object.entries(data.stats).map(([metric, value]) => [metric, toDisplayValue(value)])
	]);
	const dataSheet = utils.json_to_sheet(data.tableRows ?? []);
	utils.book_append_sheet(workbook, summarySheet, "Summary");
	utils.book_append_sheet(workbook, dataSheet, "Data");
	const workbookBuffer = writeSync(workbook, {
		bookType: "xlsx",
		type: "array"
	});
	const blob = new Blob([workbookBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
	return {
		blob,
		fileName,
		fileSize: formatBytes(blob.size),
		mimeType: blob.type
	};
}
function generateCSV(data, fileName) {
	const csv = import_papaparse.default.unparse(data.tableRows ?? []);
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	return {
		blob,
		fileName,
		fileSize: formatBytes(blob.size),
		mimeType: blob.type
	};
}
var REPORT_TEMPLATES = [
	{
		name: "Weekly Executive Digest",
		type: "Summary",
		desc: "Overview of signals harvested, qualified leads, and CRM pushes for the week.",
		defaultFormat: "PDF"
	},
	{
		name: "Monthly Intent Analytics",
		type: "Analysis",
		desc: "Deep-dive into buyer intent categorization, score trends, and industry maps.",
		defaultFormat: "PDF"
	},
	{
		name: "Harvested Signals Audit Trail",
		type: "Data Log",
		desc: "Raw dump of all scraped signals, sources, titles, and raw AI scores.",
		defaultFormat: "CSV"
	},
	{
		name: "Prioritized B2B Leads Sheet",
		type: "Leads",
		desc: "List of qualified lead targets with score, estimated deal size, and CTAs.",
		defaultFormat: "Excel"
	},
	{
		name: "Sales Outreach Performance",
		type: "Performance",
		desc: "Conversion rates of drafted outreach notes, HubSpot statuses, and deals won.",
		defaultFormat: "PDF"
	}
];
var PROGRESS_STEPS = [
	"Preparing Data",
	"Collecting Signals",
	"Running AI Summary",
	"Generating File",
	"Saving Record",
	"Complete ✓"
];
function ReportsPage() {
	const [reports, setReports] = (0, import_react.useState)([]);
	const [selectedFormat, setSelectedFormat] = (0, import_react.useState)({});
	const [compilingTemplate, setCompilingTemplate] = (0, import_react.useState)(null);
	const [progressStep, setProgressStep] = (0, import_react.useState)(0);
	const [progressMessage, setProgressMessage] = (0, import_react.useState)("Preparing report workspace");
	const [blobUrls, setBlobUrls] = (0, import_react.useState)({});
	const [isLoadingReports, setIsLoadingReports] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	const listReportsFn = useServerFn(listReports);
	const fetchReportDataFn = useServerFn(fetchReportData);
	const generateSummaryFn = useServerFn(generateReportSummary);
	const saveReportFn = useServerFn(saveReport);
	const deleteReportFn = useServerFn(deleteReport);
	(0, import_react.useEffect)(() => {
		loadReports();
		return () => {
			Object.values(blobUrls).forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
		};
	}, []);
	const loadReports = async () => {
		setIsLoadingReports(true);
		setLoadError(null);
		try {
			const results = await listReportsFn();
			setReports(results);
		} catch (error) {
			console.error(error);
			const message = error instanceof Error ? error.message : String(error);
			setLoadError(message);
			toast.error(message);
		} finally {
			setIsLoadingReports(false);
		}
	};
	const getFormatIcon = (format) => {
		switch (format) {
			case "PDF": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-rose-400" });
			case "CSV": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "h-4 w-4 text-amber-400" });
			case "Excel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-4 w-4 text-emerald-400" });
		}
	};
	const formatDate = (isoDate) => {
		try {
			return new Date(isoDate).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric"
			});
		} catch {
			return "Recently created";
		}
	};
	const handleGenerate = async (template) => {
		const format = selectedFormat[template.name] || template.defaultFormat;
		const loadingId = toast.loading(`Compiling ${template.name} (${format})...`);
		setCompilingTemplate(template.name);
		setProgressStep(0);
		setProgressMessage("Preparing data");
		try {
			setProgressStep(1);
			setProgressMessage("Collecting signals and lead data");
			const payload = await fetchReportDataFn({ data: { template: template.name } });
			setProgressStep(2);
			setProgressMessage("Running AI summary");
			const summaryResponse = await generateSummaryFn({ data: { payload } });
			setProgressStep(3);
			setProgressMessage("Generating browser file");
			const generatedFile = generateReportFile({
				...payload,
				summary: summaryResponse.summary
			}, format);
			setProgressStep(4);
			setProgressMessage("Saving report record");
			const savedReport = await saveReportFn({ data: {
				title: template.name,
				report_type: template.type,
				format,
				file_name: generatedFile.fileName,
				file_size: generatedFile.fileSize,
				download_url: null,
				status: "ready"
			} });
			setProgressStep(5);
			setProgressMessage("Complete ✓");
			const blobUrl = URL.createObjectURL(generatedFile.blob);
			setBlobUrls((prev) => ({
				...prev,
				[savedReport.id]: blobUrl
			}));
			await loadReports();
			toast.dismiss(loadingId);
			toast.success(`Report generated successfully ✓`);
		} catch (error) {
			console.error(error);
			toast.dismiss(loadingId);
			const message = error instanceof Error ? error.message : String(error);
			toast.error(message);
		} finally {
			setCompilingTemplate(null);
			setProgressStep(0);
			setProgressMessage("Preparing report workspace");
		}
	};
	const handleDelete = async (id) => {
		try {
			const existingUrl = blobUrls[id];
			if (existingUrl) {
				URL.revokeObjectURL(existingUrl);
				setBlobUrls((prev) => {
					const next = { ...prev };
					delete next[id];
					return next;
				});
			}
			await deleteReportFn({ data: { id } });
			setReports((prev) => prev.filter((report) => report.id !== id));
			toast.success("Report removed from download center.");
		} catch (error) {
			console.error(error);
			const message = error instanceof Error ? error.message : String(error);
			toast.error(message);
		}
	};
	const handleDownload = (report) => {
		const blobUrl = blobUrls[report.id];
		if (!blobUrl) {
			toast.info("This report is saved in history. Re-compile it to generate a fresh download.");
			return;
		}
		const link = document.createElement("a");
		link.href = blobUrl;
		link.download = report.file_name;
		link.click();
		toast.success(`Downloading ${report.file_name}`);
	};
	const progressPercent = (0, import_react.useMemo)(() => Math.round(progressStep / PROGRESS_STEPS.length * 100), [progressStep]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-primary",
				children: "Data Exports"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-semibold tracking-tight",
				children: "Executive Reports"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Compile live Supabase insights into PDF, CSV, or Excel exports with AI-generated executive summaries."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 rounded-2xl border border-border bg-card/60 p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Report Templates"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-medium text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), "Six-stage compile pipeline with live data aggregation and browser-side download generation."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-2 overflow-hidden rounded-full bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-gradient-to-r from-cyan-500 via-primary to-emerald-500 transition-all",
									style: { width: `${Math.max(progressPercent, compilingTemplate ? 10 : 0)}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: progressMessage }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progressPercent, "%"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid gap-2 sm:grid-cols-3 xl:grid-cols-6",
								children: PROGRESS_STEPS.map((step, index) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `rounded-md px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wider ${index <= progressStep - 1 || compilingTemplate && index === progressStep ? "bg-primary/15 text-primary" : "bg-background/70 text-muted-foreground"}`,
										children: step
									}, step);
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border/40",
						children: REPORT_TEMPLATES.map((template) => {
							const currentFormat = selectedFormat[template.name] || template.defaultFormat;
							const isCompiling = compilingTemplate === template.name;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-4 flex flex-col md:flex-row md:items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-xs text-foreground",
											children: template.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-muted px-2 py-0.5 text-[9px] text-muted-foreground uppercase font-semibold",
											children: template.type
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground leading-relaxed max-w-lg",
										children: template.desc
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex rounded-md border border-border bg-background p-0.5 text-xs",
										children: [
											"PDF",
											"CSV",
											"Excel"
										].map((format) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSelectedFormat((prev) => ({
												...prev,
												[template.name]: format
											})),
											className: `rounded px-2.5 py-1 transition ${currentFormat === format ? "bg-primary/15 text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`,
											children: format
										}, format))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => void handleGenerate(template),
										disabled: Boolean(compilingTemplate),
										className: "flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50",
										children: [isCompiling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), "Compile"]
									})]
								})]
							}, template.name);
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card/60 p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: "Download Center"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground",
							children: [reports.length, " files"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3 overflow-y-auto max-h-[360px]",
						children: isLoadingReports ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-dashed border-border/60 py-10 text-center text-xs text-muted-foreground",
							children: "Loading report history..."
						}) : loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-destructive/30 bg-destructive/5 py-10 px-4 text-center text-xs text-destructive",
							children: loadError
						}) : reports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-dashed border-border/60 py-10 text-center text-xs text-muted-foreground",
							children: "No generated reports yet."
						}) : reports.map((report) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/50 bg-background/30 p-3 flex items-center justify-between gap-3 hover:border-primary/30 transition group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "shrink-0",
									children: getFormatIcon(report.format)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-medium text-foreground truncate",
										children: report.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: [
											formatDate(report.created_at),
											" · ",
											report.file_size
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDownload(report),
									className: "rounded bg-muted p-1.5 text-foreground hover:bg-primary/20 hover:text-primary transition",
									title: "Download report file",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => void handleDelete(report.id),
									className: "rounded bg-muted p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition",
									title: "Delete report",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
								})]
							})]
						}, report.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-muted-foreground flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4.5 w-4.5 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "leading-relaxed",
							children: "Report metadata is persisted in Supabase. Browser-side blobs are kept in memory so downloads stay instant and private."
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { ReportsPage as component };
