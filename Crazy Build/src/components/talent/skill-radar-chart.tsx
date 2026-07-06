import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { CandidateAnalysis } from "@/lib/talent.types";

interface SkillRadarChartProps {
  analysis: CandidateAnalysis;
  className?: string;
}

export function SkillRadarChart({ analysis, className }: SkillRadarChartProps) {
  const data = [
    { subject: "Technical", value: analysis.technical_score },
    { subject: "Leadership", value: analysis.leadership_score },
    { subject: "Communication", value: analysis.communication_score },
    { subject: "Learning", value: analysis.learning_potential },
    { subject: "Skill Match", value: analysis.skill_match },
    { subject: "AI Match", value: analysis.ai_match_score },
  ];

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="value"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
