import {
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
  Network,
  Users,
  Search,
  GitBranch,
  MessageSquare,
  Brain,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string | null;
}

export interface NavGroup {
  label: string;
  icon: LucideIcon;
  badge?: string | null;
  basePath: string;
  children: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/app", label: "Dashboard", icon: Activity, badge: null },
  { to: "/targets", label: "Targets", icon: Target, badge: null },
  { to: "/signals", label: "Signal Feed", icon: Radar, badge: "Live" },
  { to: "/leads", label: "Leads", icon: Zap, badge: "Hot" },
  { to: "/outreach", label: "Outreach", icon: Mail, badge: null },
  { to: "/crm", label: "CRM Sync", icon: Building2, badge: null },
  { to: "/analytics", label: "Analytics", icon: BarChart3, badge: null },
  { to: "/automation", label: "Automation", icon: Workflow, badge: null },
  { to: "/pipeline", label: "AI Pipeline", icon: Network, badge: "AI" },
  { to: "/reports", label: "Reports", icon: FileText, badge: null },
  { to: "/settings", label: "Settings", icon: Settings, badge: null },
];

export const TALENT_NAV_GROUP: NavGroup = {
  label: "AI Hiring",
  icon: Users,
  badge: "AI",
  basePath: "/talent",
  children: [
    { to: "/talent", label: "AI Hiring", icon: Sparkles, badge: null },
    { to: "/talent/search", label: "Talent Search", icon: Search, badge: null },
    { to: "/talent/candidates", label: "Candidate Pipeline", icon: GitBranch, badge: null },
    { to: "/talent/resumes", label: "Resume Intelligence", icon: FileText, badge: null },
    { to: "/talent/interviews", label: "Interview Assistant", icon: MessageSquare, badge: null },
    { to: "/talent/skills", label: "Skills Intelligence", icon: Brain, badge: null },
    { to: "/talent/analytics", label: "Hiring Analytics", icon: BarChart3, badge: null },
  ],
};

export const ALL_TALENT_ROUTES = TALENT_NAV_GROUP.children;
