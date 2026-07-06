import { Link, useLocation } from "@tanstack/react-router";
import { ALL_TALENT_ROUTES } from "@/lib/nav-config";

export function TalentNav() {
  const loc = useLocation();

  return (
    <nav className="flex gap-1 overflow-x-auto rounded-xl border border-border/60 bg-card/40 p-1 backdrop-blur-sm">
      {ALL_TALENT_ROUTES.map((item) => {
        const active =
          item.to === "/talent"
            ? loc.pathname === "/talent" || loc.pathname === "/talent/"
            : loc.pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              active
                ? "bg-primary/15 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
            }`}
          >
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
