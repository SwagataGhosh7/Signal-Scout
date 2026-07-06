import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  FileText,
  Download,
  FileSpreadsheet,
  FileCode,
  HardDrive,
  Loader2,
  CheckCircle2,
  Trash2,
  Sparkles,
} from "lucide-react";
import {
  deleteReport,
  fetchReportData,
  generateReportSummary,
  listReports,
  saveReport,
} from "@/lib/signals.functions";
import { generateReportFile, type ReportDataSnapshot, type ReportFormat } from "@/lib/report-generator";

export const Route = createFileRoute("/_authenticated/reports")({
  component: ReportsPage,
});

interface ReportTemplate {
  name: string;
  type: string;
  desc: string;
  defaultFormat: ReportFormat;
}

interface GeneratedReport {
  id: string;
  title: string;
  report_type: string;
  format: ReportFormat;
  file_name: string;
  file_size: string;
  created_at: string;
  status: string;
  download_url: string | null;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    name: "Weekly Executive Digest",
    type: "Summary",
    desc: "Overview of signals harvested, qualified leads, and CRM pushes for the week.",
    defaultFormat: "PDF",
  },
  {
    name: "Monthly Intent Analytics",
    type: "Analysis",
    desc: "Deep-dive into buyer intent categorization, score trends, and industry maps.",
    defaultFormat: "PDF",
  },
  {
    name: "Harvested Signals Audit Trail",
    type: "Data Log",
    desc: "Raw dump of all scraped signals, sources, titles, and raw AI scores.",
    defaultFormat: "CSV",
  },
  {
    name: "Prioritized B2B Leads Sheet",
    type: "Leads",
    desc: "List of qualified lead targets with score, estimated deal size, and CTAs.",
    defaultFormat: "Excel",
  },
  {
    name: "Sales Outreach Performance",
    type: "Performance",
    desc: "Conversion rates of drafted outreach notes, HubSpot statuses, and deals won.",
    defaultFormat: "PDF",
  },
];

const PROGRESS_STEPS = [
  "Preparing Data",
  "Collecting Signals",
  "Running AI Summary",
  "Generating File",
  "Saving Record",
  "Complete ✓",
];

function ReportsPage() {
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<Record<string, ReportFormat>>({});
  const [compilingTemplate, setCompilingTemplate] = useState<string | null>(null);
  const [progressStep, setProgressStep] = useState(0);
  const [progressMessage, setProgressMessage] = useState("Preparing report workspace");
  const [blobUrls, setBlobUrls] = useState<Record<string, string>>({});
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const listReportsFn = useServerFn(listReports);
  const fetchReportDataFn = useServerFn(fetchReportData);
  const generateSummaryFn = useServerFn(generateReportSummary);
  const saveReportFn = useServerFn(saveReport);
  const deleteReportFn = useServerFn(deleteReport);

  useEffect(() => {
    void loadReports();
    return () => {
      Object.values(blobUrls).forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
    };
  }, []);

  const loadReports = async () => {
    setIsLoadingReports(true);
    setLoadError(null);
    try {
      const results = await listReportsFn();
      setReports(results as GeneratedReport[]);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : String(error);
      setLoadError(message);
      toast.error(message);
    } finally {
      setIsLoadingReports(false);
    }
  };

  const getFormatIcon = (format: ReportFormat) => {
    switch (format) {
      case "PDF":
        return <FileText className="h-4 w-4 text-rose-400" />;
      case "CSV":
        return <FileCode className="h-4 w-4 text-amber-400" />;
      case "Excel":
        return <FileSpreadsheet className="h-4 w-4 text-emerald-400" />;
    }
  };

  const formatDate = (isoDate: string) => {
    try {
      return new Date(isoDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently created";
    }
  };

  const handleGenerate = async (template: ReportTemplate) => {
    const format = selectedFormat[template.name] || template.defaultFormat;
    const loadingId = toast.loading(`Compiling ${template.name} (${format})...`);

    setCompilingTemplate(template.name);
    setProgressStep(0);
    setProgressMessage("Preparing data");

    try {
      setProgressStep(1);
      setProgressMessage("Collecting signals and lead data");
      const payload = (await fetchReportDataFn({ template: template.name })) as ReportDataSnapshot;

      setProgressStep(2);
      setProgressMessage("Running AI summary");
      const summaryResponse = (await generateSummaryFn({ payload })) as { summary: string };

      setProgressStep(3);
      setProgressMessage("Generating browser file");
      const snapshot: ReportDataSnapshot = {
        ...payload,
        summary: summaryResponse.summary,
      };
      const generatedFile = generateReportFile(snapshot, format);

      setProgressStep(4);
      setProgressMessage("Saving report record");
      const savedReport = (await saveReportFn({
        title: template.name,
        report_type: template.type,
        format,
        file_name: generatedFile.fileName,
        file_size: generatedFile.fileSize,
        download_url: null,
        status: "ready",
      })) as GeneratedReport;

      setProgressStep(5);
      setProgressMessage("Complete ✓");

      const blobUrl = URL.createObjectURL(generatedFile.blob);
      setBlobUrls((prev) => ({ ...prev, [savedReport.id]: blobUrl }));
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

  const handleDelete = async (id: string) => {
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
      await deleteReportFn({ id });
      setReports((prev) => prev.filter((report) => report.id !== id));
      toast.success("Report removed from download center.");
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message);
    }
  };

  const handleDownload = (report: GeneratedReport) => {
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

  const progressPercent = useMemo(() => Math.round((progressStep / PROGRESS_STEPS.length) * 100), [progressStep]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-primary">Data Exports</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Executive Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Compile live Supabase insights into PDF, CSV, or Excel exports with AI-generated executive summaries.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card/60 p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <FileText className="h-4.5 w-4.5 text-primary" />
            <h3 className="font-semibold text-sm">Report Templates</h3>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Six-stage compile pipeline with live data aggregation and browser-side download generation.
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-primary to-emerald-500 transition-all"
                style={{ width: `${Math.max(progressPercent, compilingTemplate ? 10 : 0)}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{progressMessage}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
              {PROGRESS_STEPS.map((step, index) => {
                const isActive = index <= progressStep - 1 || (compilingTemplate && index === progressStep);
                return (
                  <div
                    key={step}
                    className={`rounded-md px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wider ${
                      isActive ? "bg-primary/15 text-primary" : "bg-background/70 text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="divide-y divide-border/40">
            {REPORT_TEMPLATES.map((template) => {
              const currentFormat = selectedFormat[template.name] || template.defaultFormat;
              const isCompiling = compilingTemplate === template.name;

              return (
                <div key={template.name} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-foreground">{template.name}</span>
                      <span className="rounded bg-muted px-2 py-0.5 text-[9px] text-muted-foreground uppercase font-semibold">
                        {template.type}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-lg">{template.desc}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex rounded-md border border-border bg-background p-0.5 text-xs">
                      {(["PDF", "CSV", "Excel"] as const).map((format) => (
                        <button
                          key={format}
                          onClick={() => setSelectedFormat((prev) => ({ ...prev, [template.name]: format }))}
                          className={`rounded px-2.5 py-1 transition ${
                            currentFormat === format
                              ? "bg-primary/15 text-primary font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => void handleGenerate(template)}
                      disabled={Boolean(compilingTemplate)}
                      className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                    >
                      {isCompiling ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                      Compile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4.5 w-4.5 text-primary" />
              <h3 className="font-semibold text-sm">Download Center</h3>
            </div>
            <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              {reports.length} files
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[360px]">
            {isLoadingReports ? (
              <div className="rounded-lg border border-dashed border-border/60 py-10 text-center text-xs text-muted-foreground">
                Loading report history...
              </div>
            ) : loadError ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 py-10 px-4 text-center text-xs text-destructive">
                {loadError}
              </div>
            ) : reports.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border/60 py-10 text-center text-xs text-muted-foreground">
                No generated reports yet.
              </div>
            ) : (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl border border-border/50 bg-background/30 p-3 flex items-center justify-between gap-3 hover:border-primary/30 transition group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="shrink-0">{getFormatIcon(report.format)}</div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-medium text-foreground truncate">{report.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {formatDate(report.created_at)} · {report.file_size}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleDownload(report)}
                      className="rounded bg-muted p-1.5 text-foreground hover:bg-primary/20 hover:text-primary transition"
                      title="Download report file"
                    >
                      <Download className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => void handleDelete(report.id)}
                      className="rounded bg-muted p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
                      title="Delete report"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-muted-foreground flex gap-2">
            <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Report metadata is persisted in Supabase. Browser-side blobs are kept in memory so downloads stay instant and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
