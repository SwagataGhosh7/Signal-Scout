import { describe, expect, it } from "vitest";

import { validateAnalysisPayload, validateResumeText } from "./resume-analyzer";

describe("resume analyzer validation", () => {
  it("rejects empty resumes", () => {
    expect(() => validateResumeText("   \n\t ")).toThrow("Resume text is required");
  });

  it("accepts a valid analysis payload", () => {
    const payload = {
      overall_score: 82,
      breakdown: {
        impact_and_metrics: 24,
        experience_and_progression: 20,
        skills_match_and_depth: 20,
        formatting_and_structure: 18,
      },
      summary: "Strong candidate with clear impact.",
      missing_skills: ["React", "TypeScript"],
      critical_feedback: ["Add more measurable outcomes."],
    };

    expect(validateAnalysisPayload(payload)).toEqual(payload);
  });

  it("rejects out-of-range breakdown values", () => {
    expect(() =>
      validateAnalysisPayload({
        overall_score: 82,
        breakdown: {
          impact_and_metrics: 31,
          experience_and_progression: 20,
          skills_match_and_depth: 20,
          formatting_and_structure: 18,
        },
        summary: "Strong candidate.",
        missing_skills: [],
        critical_feedback: [],
      }),
    ).toThrow("breakdown.impact_and_metrics must be between 0 and 30");
  });
});
