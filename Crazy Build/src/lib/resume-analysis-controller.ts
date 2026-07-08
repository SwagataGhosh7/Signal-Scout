import type { ResumeAnalysisResponse } from "./resume-analyzer";
import { analyzeResume, ResumeAnalysisError } from "./resume-analyzer";

export interface ResumeAnalysisApiResponse {
  success: boolean;
  data?: ResumeAnalysisResponse;
  error?: string;
}

function jsonResponse(payload: ResumeAnalysisApiResponse, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function extractResumeText(payload: unknown): string {
  if (typeof payload === "string") {
    return payload;
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return "";
  }

  const record = payload as Record<string, unknown>;
  const directCandidates = [
    record.resumeText,
    record.resume_text,
    record.resume,
    record.text,
    record.body,
  ];

  for (const candidate of directCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  return "";
}

export async function handleResumeAnalysisRequest(request: Request): Promise<Response> {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let payload: unknown = null;

    if (contentType.includes("application/json")) {
      payload = await request.json().catch(() => null);
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      payload = Object.fromEntries(formData.entries());
    } else {
      const textBody = await request.text();
      payload = textBody ? JSON.parse(textBody) : null;
    }

    const resumeText = extractResumeText(payload);
    const analysis = await analyzeResume(resumeText);

    return jsonResponse({ success: true, data: analysis });
  } catch (error) {
    if (error instanceof ResumeAnalysisError) {
      return jsonResponse({ success: false, error: error.message }, error.statusCode);
    }

    const message = error instanceof Error ? error.message : "Unable to analyze resume";
    return jsonResponse({ success: false, error: message }, 500);
  }
}
