export interface ResumeAnalysisApiResponse {
  success: boolean;
  data?: {
    overall_score: number;
    breakdown: {
      impact_and_metrics: number;
      experience_and_progression: number;
      skills_match_and_depth: number;
      formatting_and_structure: number;
    };
    summary: string;
    missing_skills: string[];
    critical_feedback: string[];
  };
  error?: string;
}

export async function analyzeResumeClient(resumeText: string): Promise<ResumeAnalysisApiResponse> {
  const response = await fetch("/api/resume/analyze", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ resumeText }),
  });

  return (await response.json()) as ResumeAnalysisApiResponse;
}
