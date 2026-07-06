import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Activity, LogOut, Mail, Radar, Target, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const items = [
  { to: "/app", label: "Dashboard", icon: Activity },
  { to: "/targets", label: "Targets", icon: Target },
  { to: "/signals", label: "Signals", icon: Radar },
  { to: "/leads", label: "Leads", icon: Zap },
  { to: "/outreach", label: "Outreach", icon: Mail },
] as const;

export function AppNav() {
  const loc = useLocation();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/app" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary">
            <Radar className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-tight">Pulse</span>
          <span className="ml-2 hidden font-mono text-xs text-muted-foreground md:inline">
            /mission-control
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => {
            const active = loc.pathname.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <it.icon className="h-3.5 w-3.5" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={signOut}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Sign out</span>
        </button>
      </div>
      {/* mobile nav */}
      <nav className="flex gap-1 overflow-x-auto border-t border-border/60 px-2 py-2 md:hidden">
        {items.map((it) => {
          const active = loc.pathname.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex shrink-0 items-center gap-1 rounded-md px-3 py-1 text-xs ${
                active ? "bg-primary/15 text-primary" : "text-muted-foreground"
              }`}
            >
              <it.icon className="h-3 w-3" />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
