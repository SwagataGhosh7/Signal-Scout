export type CandidateRank =
  | "excellent"
  | "strong"
  | "good"
  | "average"
  | "not_recommended";

export type PipelineStage =
  | "sourced"
  | "screening"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export interface CandidateSkills {
  programming_languages: string[];
  frameworks: string[];
  ai_ml: string[];
  llm_experience: string[];
  cloud: string[];
  devops: string[];
  databases: string[];
  certifications: string[];
  soft_skills: string[];
  open_source: string[];
  projects: string[];
}

export interface CandidateAnalysis {
  ai_match_score: number;
  skill_match: number;
  resume_summary: string;
  strengths: string[];
  weaknesses: string[];
  recommended_role: string;
  leadership_score: number;
  technical_score: number;
  communication_score: number;
  learning_potential: number;
  career_growth_prediction: string;
  rank: CandidateRank;
}

export interface CandidateSource {
  type: string;
  url?: string;
  label: string;
}

export interface TalentCandidate {
  id: string;
  user_id?: string;
  name: string;
  title: string;
  email?: string | null;
  location: string;
  remote_preference: string;
  years_experience: number;
  expected_salary?: string | null;
  industry: string;
  availability: string;
  education: string;
  skills: CandidateSkills;
  analysis: CandidateAnalysis;
  pipeline_stage: PipelineStage;
  sources: CandidateSource[];
  github_url?: string | null;
  portfolio_url?: string | null;
  resume_text?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface TalentSearchFilters {
  query?: string;
  job_title?: string;
  skills?: string[];
  programming_languages?: string[];
  experience?: string;
  education?: string;
  location?: string;
  expected_salary?: string;
  industry?: string;
  availability?: string;
  remote_preference?: string;
  years_experience_min?: number;
  years_experience_max?: number;
}

export interface ResumeAnalysis {
  extracted_info: Record<string, unknown>;
  summary: string;
  missing_skills: string[];
  job_match_score: number;
  interview_questions: string[];
  recommendation: string;
}

export interface InterviewPlan {
  technical_questions: string[];
  behavioral_questions: string[];
  coding_questions: string[];
  llm_questions: string[];
  system_design_questions: string[];
  scoring_rubric: Array<{ criterion: string; weight: number; description: string }>;
  final_recommendation: string;
}

export interface TalentStats {
  candidates_reviewed: number;
  avg_match_score: number;
  top_skills: Array<{ skill: string; count: number }>;
  funnel: Array<{ stage: string; count: number }>;
  skill_distribution: Array<{ category: string; count: number }>;
  hiring_trends: Array<{ month: string; hires: number; interviews: number }>;
}

export interface TalentRecommendations {
  top_10: TalentCandidate[];
  best_fit: TalentCandidate | null;
  fastest_learner: TalentCandidate | null;
  most_experienced: TalentCandidate | null;
  highest_ai_score: TalentCandidate | null;
  future_leader: TalentCandidate | null;
}

export const RANK_LABELS: Record<CandidateRank, string> = {
  excellent: "Excellent",
  strong: "Strong",
  good: "Good",
  average: "Average",
  not_recommended: "Not Recommended",
};

export const RANK_COLORS: Record<CandidateRank, string> = {
  excellent: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  strong: "text-primary border-primary/40 bg-primary/10",
  good: "text-sky-400 border-sky-500/40 bg-sky-500/10",
  average: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  not_recommended: "text-destructive border-destructive/40 bg-destructive/10",
};

export const PIPELINE_STAGES: PipelineStage[] = [
  "sourced",
  "screening",
  "interview",
  "offer",
  "hired",
  "rejected",
];
