import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  LogOut,
  Mail,
  Radar,
  Target,
  Zap,
  Building2,
  BarChart3,
  Workflow,
  FileText,
  Settings,
  Network,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DepthLayer } from "@/components/depth-system";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const items = [
  { to: "/app", label: "Dashboard", icon: Activity, badge: null },
  { to: "/targets", label: "Targets", icon: Target, badge: null },
  { to: "/signals", label: "Signal Feed", icon: Radar, badge: "Live" },
  { to: "/leads", label: "Leads", icon: Zap, badge: "Hot" },
  { to: "/outreach", label: "Outreach", icon: Mail, badge: null },
  { to: "/crm", label: "CRM Sync", icon: Building2, badge: null },
  { to: "/analytics", label: "Analytics", icon: BarChart3, badge: null },
  { to: "/automation", label: "Automation", icon: Workflow, badge: null },
  { to: "/pipeline", label: "AI Pipeline", icon: Network, badge: "AI" },
  { to: "/hiring", label: "AI Hiring", icon: Briefcase, badge: "New" },
  { to: "/reports", label: "Reports", icon: FileText, badge: null },
  { to: "/settings", label: "Settings", icon: Settings, badge: null },
] as const;

export function AppNav() {
  const loc = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const val = localStorage.getItem("sidebar_collapsed");
    if (val === "true") setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar_collapsed", String(next));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <DepthLayer
        level="floating"
        className={`hidden md:flex flex-col border-r border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-300 ease-in-out shrink-0 sticky top-0 h-screen ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary glow">
              <Radar className="h-4 w-4 animate-pulse" />
            </div>
            {!collapsed && (
              <span className="font-semibold text-sm tracking-tight text-gradient whitespace-nowrap">
                Signal Scout
              </span>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={toggleCollapse}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Activator */}
        {!collapsed && (
          <div className="px-3 pt-3">
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  bubbles: true,
                });
                window.dispatchEvent(event);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent transition"
            >
              <span className="flex items-center gap-1.5">
                <Search className="h-3 w-3" /> Search (Ctrl+K)
              </span>
              <kbd className="rounded bg-muted px-1.5 text-[10px] font-mono">⌘K</kbd>
            </button>
          </div>
        )}

        {/* Navigation list */}
        <nav className="flex-1 space-y-0.5 px-2 py-3 overflow-y-auto">
          {items.map((it) => {
            const active = loc.pathname.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition ${
                  active
                    ? "bg-primary/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                }`}
                title={collapsed ? it.label : undefined}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <it.icon
                    className={`h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                  />
                  {!collapsed && <span className="truncate">{it.label}</span>}
                </div>
                {!collapsed && it.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase ${
                      it.badge === "Live"
                        ? "bg-success/15 text-success border border-success/30"
                        : it.badge === "Hot"
                          ? "bg-destructive/15 text-destructive border border-destructive/30"
                          : "bg-primary/15 text-primary border border-primary/30"
                    }`}
                  >
                    {it.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Floating Assistant Indicator (Collapsed / Expanded) */}
        {!collapsed && (
          <div className="mx-2 my-2 p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-xs text-muted-foreground flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-primary font-medium">
              <Sparkles className="h-3 w-3" />
              <span>Agentic Co-Pilot</span>
            </div>
            <p className="text-[10px] leading-relaxed">
              AI Agents are scanning targets. Tap the bubble to talk.
            </p>
          </div>
        )}

        {/* Sidebar Footer */}
        <div className="border-t border-border/40 p-2 space-y-1">
          {!collapsed && (
            <div className="px-3 py-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          )}
          {collapsed && (
            <div className="flex w-full items-center justify-center py-2">
              <ThemeToggle />
            </div>
          )}
          {collapsed && (
            <button
              onClick={toggleCollapse}
              className="flex w-full items-center justify-center rounded-lg py-2 text-muted-foreground hover:bg-accent"
              title="Expand menu"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          )}
          <button
            onClick={signOut}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition w-full ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </DepthLayer>

      {/* Mobile Top Header & Bottom Nav */}
      <DepthLayer
        level="floating"
        className="md:hidden flex flex-col w-full bg-card/40 backdrop-blur sticky top-0 z-20 border-b border-border/60"
      >
        <div className="flex h-12 items-center justify-between px-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary">
              <Radar className="h-4 w-4 animate-pulse" />
            </div>
            <span className="font-semibold tracking-tight text-gradient">Signal Scout</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={signOut}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Nav Bar for mobile (scrollable) */}
        <nav className="flex gap-0.5 overflow-x-auto border-t border-border/60 px-1.5 py-1 bg-background/50 scrollbar-hide">
          {items.map((it) => {
            const active = loc.pathname.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
                  active ? "bg-primary/15 text-primary" : "text-muted-foreground"
                }`}
              >
                <it.icon className="h-3 w-3" />
                <span>{it.label}</span>
              </Link>
            );
          })}
        </nav>
      </DepthLayer>
    </>
  );
}
