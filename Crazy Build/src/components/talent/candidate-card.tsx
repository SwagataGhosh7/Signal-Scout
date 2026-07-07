import { MapPin, Clock, DollarSign, Github, ExternalLink, Briefcase } from "lucide-react";
import { TiltCard } from "@/components/depth-system";
import { Badge } from "@/routes/_authenticated/app";
import type { TalentCandidate } from "@/lib/talent.types";
import { RankBadge } from "./rank-badge";
import { ScoreDisplay } from "./score-display";

interface CandidateCardProps {
  candidate: TalentCandidate;
  selected?: boolean;
  onSelect?: (id: string) => void;
  compact?: boolean;
  actions?: React.ReactNode;
}

export function CandidateCard({
  candidate,
  selected,
  onSelect,
  compact,
  actions,
}: CandidateCardProps) {
  const c = candidate;

  return (
    <TiltCard
      intensity="dense"
      className={`rounded-2xl p-4 transition duration-200 text-left cursor-pointer ${
        selected ? "ring-2 ring-primary/50" : ""
      }`}
      onClick={() => onSelect?.(c.id)}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <ScoreDisplay
          score={c.analysis.ai_match_score}
          label="AI Match"
          size={compact ? "sm" : "md"}
        />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <RankBadge rank={c.analysis.rank} />
            <Badge>{c.pipeline_stage}</Badge>
            {c.remote_preference && <Badge>{c.remote_preference}</Badge>}
          </div>
          <h4 className="mt-2 text-sm font-semibold text-foreground">{c.name}</h4>
          <p className="text-xs text-primary font-medium">{c.title}</p>
          {!compact && (
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {c.analysis.resume_summary}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {c.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" /> {c.years_experience}y exp
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {c.availability}
            </span>
            {c.expected_salary && (
              <span className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" /> {c.expected_salary}
              </span>
            )}
          </div>

          {!compact && (
            <div className="mt-2 flex flex-wrap gap-1">
              {[...c.skills.programming_languages, ...c.skills.frameworks.slice(0, 3)]
                .slice(0, 6)
                .map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-muted/40 px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
            </div>
          )}

          {(c.github_url || c.portfolio_url) && !compact && (
            <div className="mt-2 flex gap-2">
              {c.github_url && (
                <a
                  href={c.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[10px] text-primary hover:underline"
                >
                  <Github className="h-3 w-3" /> GitHub
                </a>
              )}
              {c.portfolio_url && (
                <a
                  href={c.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[10px] text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" /> Portfolio
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {actions && <div className="mt-3 border-t border-border/40 pt-3">{actions}</div>}
    </TiltCard>
  );
}
