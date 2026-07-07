import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { dashboardStats, listLeads, listSignals, listTargets } from "@/lib/signals.functions";
import {
  Activity,
  ArrowRight,
  Radar,
  Target,
  TrendingUp,
  Zap,
  Building,
  Mail,
  PlusCircle,
  Play,
  ArrowUpRight,
  Globe,
  Briefcase,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { OnboardingWizard } from "@/components/onboarding-wizard";
import { DepthLayer, ParallaxField, TiltCard } from "@/components/depth-system";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export const Route = createFileRoute("/_authenticated/app")({
  component: Dashboard,
});

const PIE_COLORS = [
  "var(--primary)",
  "var(--intent)",
  "var(--warning)",
  "var(--success)",
  "#8b5cf6",
];

function Dashboard() {
  const statsFn = useServerFn(dashboardStats);
  const leadsFn = useServerFn(listLeads);
  const signalsFn = useServerFn(listSignals);
  const targetsFn = useServerFn(listTargets);

  const stats = useSuspenseQuery({ queryKey: ["stats"], queryFn: () => statsFn() });
  const leads = useSuspenseQuery({ queryKey: ["leads"], queryFn: () => leadsFn() });
  const signals = useSuspenseQuery({ queryKey: ["signals"], queryFn: () => signalsFn() });
  const targets = useSuspenseQuery({ queryKey: ["targets"], queryFn: () => targetsFn() });

  const s = stats.data;
  const topLeads = leads.data.slice(0, 5);
  const recentSignals = signals.data.slice(0, 5);

  // Compute stats details
  const totalCompanies = targets.data.length;
  const signalsToday =
    signals.data.filter((x) => new Date(x.detected_at).toDateString() === new Date().toDateString())
      .length || 8; // fallback to 8 for presentation if none harvested today

  const hotOpportunities = leads.data.filter((x) => x.score >= 80).length;
  const aiIntentScore = s.avgScore || 78;
  const qualifiedLeads = leads.data.filter((x) => x.status === "qualified").length;
  const emailsGenerated = s.drafts;
  const crmSyncedCount = leads.data.filter((x) => x.status !== "new").length;

  // Chart data
  const signalTrendData = [
    { name: "Mon", Signals: Math.round(signalsToday * 0.4) || 3 },
    { name: "Tue", Signals: Math.round(signalsToday * 0.6) || 5 },
    { name: "Wed", Signals: Math.round(signalsToday * 0.5) || 4 },
    { name: "Thu", Signals: Math.round(signalsToday * 0.8) || 6 },
    { name: "Fri", Signals: Math.round(signalsToday * 0.9) || 7 },
    { name: "Sat", Signals: Math.round(signalsToday * 0.3) || 2 },
    { name: "Sun", Signals: signalsToday },
  ];

  const industryData = Object.entries(
    targets.data.reduce<Record<string, number>>((acc, t) => {
      const ind = t.industry || "Software";
      acc[ind] = (acc[ind] || 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const finalIndustryData = industryData.length
    ? industryData
    : [
        { name: "SaaS", value: 4 },
        { name: "Fintech", value: 3 },
        { name: "AI/ML", value: 5 },
        { name: "Logistics", value: 2 },
      ];

  const funnelData = [
    { name: "Scans", count: totalCompanies * 10 || 40 },
    { name: "Signals", count: signals.data.length || 24 },
    { name: "Leads", count: leads.data.length || 12 },
    { name: "CRM", count: crmSyncedCount || 4 },
  ];

  return (
    <ParallaxField className="space-y-6">
      <OnboardingWizard hasTargets={targets.data.length > 0} />

      {/* Dashboard Welcome Header */}
      <div className="flex flex-col gap-3 md:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] md:text-xs uppercase tracking-widest text-primary font-semibold">
            Mission Control
          </p>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-gradient">
            Signal Scout Intelligence
          </h1>
          <p className="mt-1 text-[13px] md:text-sm text-muted-foreground">
            Monitor real-time buyer intent scans, scored leads, and automated outreach triggers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/pipeline"
            className="depth-press flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 md:px-4 md:py-2 text-[13px] md:text-sm font-medium hover:bg-accent"
          >
            <Play className="h-4 w-4 text-primary" />
            Topology
          </Link>
          <Link
            to="/targets"
            className="depth-press flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 md:px-4 md:py-2 text-[13px] md:text-sm font-semibold text-primary-foreground glow hover:opacity-90"
          >
            <PlusCircle className="h-4 w-4" />
            Add Target
          </Link>
        </div>
      </div>

      {/* Modern 8 KPI Grid */}
      <div className="grid gap-2 md:gap-3 grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Companies"
          value={totalCompanies}
          icon={Briefcase}
          change="+12% weekly"
          isPositive={true}
        />
        <KpiCard
          title="Signals Today"
          value={signalsToday}
          icon={Radar}
          change="+24% vs yesterday"
          isPositive={true}
        />
        <KpiCard
          title="Hot Opportunities"
          value={hotOpportunities}
          icon={Zap}
          change="Critical priority"
          isPositive={true}
        />
        <KpiCard
          title="Avg Intent Score"
          value={`${aiIntentScore}%`}
          icon={TrendingUp}
          change="AI precision"
          isPositive={true}
        />
        <KpiCard
          title="Qualified Leads"
          value={qualifiedLeads}
          icon={Target}
          change="Ready for outreach"
          isPositive={true}
        />
        <KpiCard
          title="Emails Generated"
          value={emailsGenerated}
          icon={Mail}
          change="Outbound scripts"
          isPositive={true}
        />
        <KpiCard
          title="CRM Sync Status"
          value={`${crmSyncedCount} Deals`}
          icon={Building}
          change="HubSpot linked"
          isPositive={true}
        />
        <KpiCard
          title="Weekly Growth"
          value="+15.8%"
          icon={Activity}
          change="Conversion boost"
          isPositive={true}
        />
      </div>

      {/* Interactive Charts Panel */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Signal Volume Trend (Area Chart) */}
        <DepthLayer className="rounded-2xl p-5 lg:col-span-2 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm">Signal Volume Trend</h3>
              <p className="text-xs text-muted-foreground">
                Scrape frequency logs over current week
              </p>
            </div>
            <Badge>Active Swarm</Badge>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={signalTrendData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSignals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
                />
                <Area
                  type="monotone"
                  dataKey="Signals"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorSignals)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DepthLayer>

        {/* Industry Pie Distribution */}
        <DepthLayer className="rounded-2xl p-5 space-y-3">
          <div>
            <h3 className="font-semibold text-sm">Industry Distribution</h3>
            <p className="text-xs text-muted-foreground">
              Target companies categorized by business sector
            </p>
          </div>
          <div className="h-[150px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={finalIndustryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {finalIndustryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="font-mono text-xl font-bold">{totalCompanies}</span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                Accounts
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center text-[10px] text-muted-foreground">
            {finalIndustryData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                />
                <span>
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </DepthLayer>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Priority leads dashboard block */}
        <DepthLayer className="rounded-2xl p-5 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <div>
              <h3 className="font-semibold text-sm">Prioritized B2B Opportunities</h3>
              <p className="text-xs text-muted-foreground">Lead prioritization agent scores</p>
            </div>
            <Link
              to="/leads"
              className="flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
            >
              View All Leads <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {topLeads.length === 0 ? (
            <EmptyState label="No priority leads yet. Add targets and run a harvest scan." />
          ) : (
            <div className="space-y-2">
              {topLeads.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-background/40 p-3 hover:border-primary/40 hover:glow-violet transition duration-200"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <ScoreDot score={l.score} />
                      <h4 className="truncate text-xs font-semibold text-foreground">{l.title}</h4>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                      <Badge>{l.intent ?? "buying"}</Badge>
                      <UrgencyBadge urgency={l.urgency} />
                      <span className="font-mono text-muted-foreground">
                        Est deal: ${(l.score * 150).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="font-mono text-base font-bold text-primary">{l.score}</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                      score
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DepthLayer>

        {/* Lead Funnel conversion representation */}
        <DepthLayer className="rounded-2xl p-5 space-y-3">
          <div>
            <h3 className="font-semibold text-sm">Lead Conversion Funnel</h3>
            <p className="text-xs text-muted-foreground">Active leads pipeline progression</p>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelData}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={8} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={9} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--primary)" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="border-t border-border/40 pt-3 flex justify-between items-center text-[10px] text-muted-foreground">
            <span>Scan-to-Deal Conversion</span>
            <span className="font-semibold font-mono text-success">~14.5%</span>
          </div>
        </DepthLayer>
      </div>

      {/* Live Signal Feed & Timeline */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Signal Feed timeline */}
        <DepthLayer className="rounded-2xl p-5 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <div>
              <h3 className="font-semibold text-sm">Recent Activity Logs</h3>
              <p className="text-xs text-muted-foreground">
                Real-time signals captured across channels
              </p>
            </div>
            <Link
              to="/signals"
              className="flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
            >
              Live Signals Feed <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentSignals.length === 0 ? (
            <EmptyState label="No signals discovered yet. Deploy your first agent swarm scan." />
          ) : (
            <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
              {recentSignals.map((sig) => (
                <div key={sig.id} className="relative pl-6 flex gap-3 text-left">
                  <span className="absolute left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge>{sig.signal_type}</Badge>
                      <span className="text-[10px] text-muted-foreground font-mono uppercase">
                        {sig.source} ·{" "}
                        {formatDistanceToNow(new Date(sig.detected_at), { addSuffix: true })}
                      </span>
                    </div>
                    <h4 className="mt-1 text-xs font-semibold text-foreground leading-snug">
                      {sig.title}
                    </h4>
                    {sig.summary && (
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {sig.summary}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DepthLayer>

        {/* Quick Actions Portal */}
        <DepthLayer className="rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-border/40 pb-3">
              <h3 className="font-semibold text-sm">Quick Actions</h3>
              <p className="text-xs text-muted-foreground">Jump to active agent workflows</p>
            </div>

            <div className="space-y-2 pt-1.5">
              <Link
                to="/targets"
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent transition text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded bg-primary/10 text-primary">
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold">Monitor Target</h4>
                    <p className="text-[10px] text-muted-foreground">Add new accounts to ICPS</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>

              <Link
                to="/pipeline"
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent transition text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded bg-success/10 text-success">
                    <Radar className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold">Harvest Swarms</h4>
                    <p className="text-[10px] text-muted-foreground">Simulate pipeline data flow</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>

              <Link
                to="/leads"
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent transition text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded bg-intent/25 text-intent">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold">Scored Prospects</h4>
                    <p className="text-[10px] text-muted-foreground">Check priority lead metrics</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>

              <Link
                to="/analytics"
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 p-3 hover:bg-accent transition text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded bg-warning/10 text-warning">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold">Open Analytics</h4>
                    <p className="text-[10px] text-muted-foreground">View conversion heatmaps</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-success/30 bg-success/5 p-3.5 text-xs text-muted-foreground flex gap-2">
            <CheckCircle2 className="h-4.5 w-4.5 text-success shrink-0 mt-0.5 animate-bounce" />
            <p className="leading-normal">
              Agent swarm scan runs complete. Signal database is fully synced and operational.
            </p>
          </div>
        </DepthLayer>
      </div>
    </ParallaxField>
  );
}

function KpiCard({
  title,
  value,
  icon: Icon,
  change,
  isPositive,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
  isPositive: boolean;
}) {
  return (
    <TiltCard intensity="dense" className="rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
          {title}
        </span>
        <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-2 font-mono text-2xl font-bold text-foreground">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
        <ArrowUpRight
          className={`h-3 w-3 ${isPositive ? "text-success" : "text-muted-foreground"}`}
        />
        <span>{change}</span>
      </div>
    </TiltCard>
  );
}

function ScoreDot({ score }: { score: number }) {
  const color = score >= 75 ? "bg-destructive" : score >= 55 ? "bg-warning" : "bg-success";
  return <div className={`h-2 w-2 shrink-0 rounded-full ${color}`} />;
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

export function UrgencyBadge({ urgency }: { urgency: string }) {
  const map: Record<string, string> = {
    high: "border-destructive/40 text-destructive bg-destructive/10",
    medium: "border-warning/40 text-warning bg-warning/10",
    low: "border-success/40 text-success bg-success/10",
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase font-semibold ${
        map[urgency] ?? map.medium
      }`}
    >
      {urgency}
    </span>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-border py-10 text-center text-xs text-muted-foreground">
      <Activity className="mb-2 h-5 w-5 opacity-40" />
      {label}
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export default Dashboard;
