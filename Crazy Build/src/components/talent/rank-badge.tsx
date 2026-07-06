import type { CandidateRank } from "@/lib/talent.types";
import { RANK_COLORS, RANK_LABELS } from "@/lib/talent.types";

export function RankBadge({ rank }: { rank: CandidateRank }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${RANK_COLORS[rank]}`}
    >
      {RANK_LABELS[rank]}
    </span>
  );
}
