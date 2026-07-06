import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TiltIntensity = "default" | "dense" | "showcase";

type TiltCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  intensity?: TiltIntensity;
  disabled?: boolean;
};

export function TiltCard({ children, className, intensity = "default", disabled = false, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 0, glowY: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(media.matches);
    updateReducedMotion();
    media.addEventListener?.("change", updateReducedMotion);

    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouch = () => setIsTouch(touchQuery.matches);
    updateTouch();
    touchQuery.addEventListener?.("change", updateTouch);

    return () => {
      media.removeEventListener?.("change", updateReducedMotion);
      touchQuery.removeEventListener?.("change", updateTouch);
    };
  }, []);

  const maxTilt = useMemo(() => {
    switch (intensity) {
      case "showcase":
        return 8;
      case "dense":
        return 4;
      default:
        return 6;
    }
  }, [intensity]);

  const shouldTilt = !disabled && !reducedMotion && !isTouch;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!shouldTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width - 0.5) * maxTilt).toFixed(2);
    const rotateX = (((rect.height / 2 - y) / rect.height) * maxTilt).toFixed(2);
    setTilt({
      x: Number(rotateX),
      y: Number(rotateY),
      glowX: x - rect.width / 2,
      glowY: y - rect.height / 2,
    });
    setActive(true);
  };

  const handleLeave = () => {
    setActive(false);
    setTilt({ x: 0, y: 0, glowX: 0, glowY: 0 });
  };

  const transform = shouldTilt && active
    ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(0, -6px, 0)`
    : shouldTilt
      ? `rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)`
      : "translate3d(0, 0, 0)";

  return (
    <div
      ref={ref}
      className={cn("depth-tilt-card depth-tilt-card--" + intensity, className)}
      onMouseMove={shouldTilt ? handleMove : undefined}
      onMouseEnter={() => shouldTilt && setActive(true)}
      onMouseLeave={shouldTilt ? handleLeave : undefined}
      {...props}
      style={{
        transform,
        ["--tilt-glow-x" as string]: `${tilt.glowX}px`,
        ["--tilt-glow-y" as string]: `${tilt.glowY}px`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}

type DepthLayerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  level?: "panel" | "floating" | "tooltip";
};

export function DepthLayer({ children, className, level = "panel", ...props }: DepthLayerProps) {
  return <div className={cn("depth-layer", `depth-layer--${level}`, className)} {...props}>{children}</div>;
}

type ParallaxFieldProps = {
  children: ReactNode;
  className?: string;
};

export function ParallaxField({ children, className }: ParallaxFieldProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(media.matches);
    updateReducedMotion();
    media.addEventListener?.("change", updateReducedMotion);

    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouch = () => setIsTouch(touchQuery.matches);
    updateTouch();
    touchQuery.addEventListener?.("change", updateTouch);

    return () => {
      media.removeEventListener?.("change", updateReducedMotion);
      touchQuery.removeEventListener?.("change", updateTouch);
    };
  }, []);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isTouch) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 4;
    setOffset({ x: -x, y: -y });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      className={cn("depth-parallax-field", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ["--parallax-x" as string]: `${offset.x}px`,
        ["--parallax-y" as string]: `${offset.y}px`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
