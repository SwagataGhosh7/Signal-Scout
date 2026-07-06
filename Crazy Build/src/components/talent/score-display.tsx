import { useEffect, useState } from "react";

interface ScoreDisplayProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function ScoreDisplay({ score, label, size = "md", animated = true }: ScoreDisplayProps) {
  const [display, setDisplay] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) return;
    let frame: number;
    const start = performance.now();
    const duration = 800;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(score * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score, animated]);

  const sizeClasses = {
    sm: "text-xl min-w-[48px]",
    md: "text-3xl min-w-[64px]",
    lg: "text-5xl min-w-[80px]",
  };

  const color =
    score >= 90 ? "text-emerald-400" : score >= 75 ? "text-primary" : score >= 60 ? "text-amber-400" : "text-muted-foreground";

  return (
    <div className="grid place-items-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-intent/10 p-3 shadow-inner">
      <div className={`font-mono font-black leading-none ${sizeClasses[size]} ${color}`}>{display}</div>
      <div className="mt-1 text-[8px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
