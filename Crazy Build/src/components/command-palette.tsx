import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import {
  Search,
  Activity,
  Target,
  Radar,
  Zap,
  Mail,
  Building2,
  BarChart3,
  Workflow,
  FileText,
  Settings,
  Sparkles,
  Command as CommandIcon,
} from "lucide-react";
import { DepthLayer } from "@/components/depth-system";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle command palette on Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  const runCommand = (action: () => void) => {
    action();
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 p-4 pt-[15vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <DepthLayer
        level="floating"
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Search Command Palette" className="flex flex-col h-[300px]">
          <div className="flex items-center border-b border-border/50 px-3 py-3">
            <Search className="h-4.5 w-4.5 text-muted-foreground mr-2 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Search actions, dashboards, or resources..."
              className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          <Command.List className="flex-1 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="py-6 text-center text-xs text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="text-[10px] text-muted-foreground uppercase font-mono px-2 py-1.5 font-bold"
            >
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/app" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <Activity className="h-4 w-4" /> Go to Dashboard
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/targets" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <Target className="h-4 w-4" /> Target Accounts Management
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/signals" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <Radar className="h-4 w-4" /> Live Signals Feed
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/leads" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <Zap className="h-4 w-4" /> AI-Scored Leads
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/outreach" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <Mail className="h-4 w-4" /> Outreach Draft Scripts
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Integrations & Analytics"
              className="text-[10px] text-muted-foreground uppercase font-mono px-2 py-1.5 font-bold pt-3 border-t border-border/30 mt-2"
            >
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/crm" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <Building2 className="h-4 w-4" /> CRM Integration Boards
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/analytics" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <BarChart3 className="h-4 w-4" /> Open Analytics & Heatmaps
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/automation" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <Workflow className="h-4 w-4" /> Visual Automation Builder
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/pipeline" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <Sparkles className="h-4 w-4" /> AI Agentic Pipeline Diagram
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/reports" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <FileText className="h-4 w-4" /> Executive Data Exports
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => navigate({ to: "/settings" }))}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition select-none"
              >
                <Settings className="h-4 w-4" /> Project Preferences & Settings
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-border/50 bg-background/50 px-3.5 py-2 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
            <span className="flex items-center gap-1">
              <CommandIcon className="h-3 w-3" /> Press Esc to close
            </span>
            <span>Use ↑↓ to navigate, Enter to select</span>
          </div>
        </Command>
      </DepthLayer>
    </div>
  );
}
