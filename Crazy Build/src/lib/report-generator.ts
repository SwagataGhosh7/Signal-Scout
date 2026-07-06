import Papa from "papaparse";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { utils, write } from "xlsx";

export type ReportFormat = "PDF" | "CSV" | "Excel";

export interface ReportDataSnapshot {
  title: string;
  reportType: string;
  generatedAt: string;
  summary: string;
  stats: Record<string, string | number>;
  tableRows: Array<Record<string, unknown>>;
}

export interface GeneratedReportFile {
  blob: Blob;
  fileName: string;
  fileSize: string;
  mimeType: string;
}

export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  const displayValue = Number.isInteger(size) ? size.toString() : size.toFixed(1);
  return `${displayValue} ${units[unitIndex]}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

function toDisplayValue(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function generateReportFile(data: ReportDataSnapshot, format: ReportFormat): GeneratedReportFile {
  const safeTitle = slugify(data.title || "signal-scout-report");
  const fileName = `${safeTitle}.${format.toLowerCase()}`;

  if (format === "PDF") {
    return generatePDF(data, fileName);
  }

  if (format === "Excel") {
    return generateExcel(data, fileName);
  }

  return generateCSV(data, fileName);
}

function generatePDF(data: ReportDataSnapshot, fileName: string): GeneratedReportFile {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

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
  doc.text(summaryText, 40, 120, { maxWidth: pageWidth - 80, lineHeightFactor: 1.4 });

  const summaryRows = Object.entries(data.stats).map(([metric, value]) => [
    metric.replace(/([A-Z])/g, " $1"),
    toDisplayValue(value),
  ]);

  autoTable(doc, {
    startY: 170,
    head: [["Metric", "Value"]],
    body: summaryRows,
    theme: "grid",
    styles: { fontSize: 9 },
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  const rowData = data.tableRows ?? [];
  if (rowData.length > 0) {
    const headers = Object.keys(rowData[0]).slice(0, 6);
    const body = rowData.slice(0, 15).map((row) => headers.map((header) => toDisplayValue(row[header])));
    autoTable(doc, {
      startY: (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ? (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable!.finalY! + 24 : 320,
      head: [headers.map((header) => header.replace(/_/g, " "))],
      body,
      theme: "striped",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
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
    mimeType: "application/pdf",
  };
}

function generateExcel(data: ReportDataSnapshot, fileName: string): GeneratedReportFile {
  const workbook = utils.book_new();
  const summarySheet = utils.aoa_to_sheet([
    ["Title", data.title],
    ["Type", data.reportType],
    ["Generated", new Date(data.generatedAt).toLocaleString()],
    ["Summary", data.summary || "No summary available."],
    ...Object.entries(data.stats).map(([metric, value]) => [metric, toDisplayValue(value)]),
  ]);
  const dataSheet = utils.json_to_sheet(data.tableRows ?? []);

  utils.book_append_sheet(workbook, summarySheet, "Summary");
  utils.book_append_sheet(workbook, dataSheet, "Data");

  const workbookBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([workbookBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return {
    blob,
    fileName,
    fileSize: formatBytes(blob.size),
    mimeType: blob.type,
  };
}

function generateCSV(data: ReportDataSnapshot, fileName: string): GeneratedReportFile {
  const csv = Papa.unparse(data.tableRows ?? []);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  return {
    blob,
    fileName,
    fileSize: formatBytes(blob.size),
    mimeType: blob.type,
  };
}
