import Papa from "papaparse";
import { generateReportFile, type ReportDataSnapshot } from "@/lib/report-generator";
import type { TalentCandidate } from "@/lib/talent.types";

export function buildTalentReport(candidates: TalentCandidate[], title: string): ReportDataSnapshot {
  const avgScore = candidates.length
    ? Math.round(candidates.reduce((s, c) => s + c.analysis.ai_match_score, 0) / candidates.length)
    : 0;

  return {
    title,
    reportType: "AI Talent Intelligence Report",
    generatedAt: new Date().toISOString(),
    summary: `Hiring report covering ${candidates.length} candidates with average AI Match Score of ${avgScore}. Data sourced from authorized integrations and user-uploaded resumes only.`,
    stats: {
      candidates: candidates.length,
      avgMatchScore: avgScore,
      excellent: candidates.filter((c) => c.analysis.rank === "excellent").length,
      inInterview: candidates.filter((c) => c.pipeline_stage === "interview").length,
      hired: candidates.filter((c) => c.pipeline_stage === "hired").length,
    },
    tableRows: candidates.map((c) => ({
      name: c.name,
      title: c.title,
      ai_score: c.analysis.ai_match_score,
      rank: c.analysis.rank,
      stage: c.pipeline_stage,
      location: c.location,
      experience: c.years_experience,
      recommended_role: c.analysis.recommended_role,
    })),
  };
}

export function exportTalentCSV(candidates: TalentCandidate[], fileName = "talent-shortlist") {
  const rows = candidates.map((c) => ({
    Name: c.name,
    Title: c.title,
    "AI Match Score": c.analysis.ai_match_score,
    Rank: c.analysis.rank,
    Stage: c.pipeline_stage,
    Location: c.location,
    Experience: c.years_experience,
    Salary: c.expected_salary ?? "",
    "Recommended Role": c.analysis.recommended_role,
  }));
  const csv = Papa.unparse(rows);
  downloadBlob(new Blob([csv], { type: "text/csv" }), `${fileName}.csv`);
}

export function exportTalentReport(candidates: TalentCandidate[], format: "PDF" | "CSV" | "Excel", title: string) {
  const snapshot = buildTalentReport(candidates, title);
  const file = generateReportFile(snapshot, format);
  downloadBlob(file.blob, file.fileName);
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
