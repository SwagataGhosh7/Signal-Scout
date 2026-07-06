import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { dashboardStats } from "@/lib/signals.functions";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
} from "recharts";
import {
  BarChart3,
  Calendar,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "./app";

export const Route = createFileRoute("/_authenticated/analytics")({
  component: AnalyticsPage,
});

// Mock Analytics Data
const SIGNAL_TREND_DATA = [
  { date: "06/30", LinkedIn: 12, Twitter: 5, News: 8, Jobs: 15 },
  { date: "07/01", LinkedIn: 18, Twitter: 9, News: 12, Jobs: 22 },
  { date: "07/02", LinkedIn: 15, Twitter: 7, News: 14, Jobs: 19 },
  { date: "07/03", LinkedIn: 24, Twitter: 14, News: 16, Jobs: 32 },
  { date: "07/04", LinkedIn: 30, Twitter: 18, News: 22, Jobs: 45 },
  { date: "07/05", LinkedIn: 45, Twitter: 24, News: 28, Jobs: 58 },
  { date: "07/06", LinkedIn: 62, Twitter: 35, News: 38, Jobs: 74 },
];

const INTENT_DISTR = [
  { name: "Buying", value: 38, color: "var(--primary)" },
  { name: "Hiring", value: 27, color: "var(--intent)" },
  { name: "Expansion", value: 18, color: "var(--warning)" },
  { name: "Partnership", value: 12, color: "var(--success)" },
  { name: "Creator", value: 5, color: "#a855f7" },
];

const FUNNEL_DATA = [
  { stage: "Harvester Scans", count: 240, loss: 0 },
  { stage: "Intent Identified", count: 180, loss: 25 },
  { stage: "Leads Prioritized", count: 120, loss: 33 },
  { stage: "Outreach Sent", count: 75, loss: 37 },
  { stage: "Deals Closed", count: 22, loss: 70 },
];

const PIPELINE_VELOCITY = [
  { name: "LinkedIn Scans", score: 85 },
  { name: "Crunchbase Funding", score: 92 },
  { name: "Twitter Hiring", score: 70 },
  { name: "Company Jobs", score: 88 },
  { name: "Press releases", score: 65 },
];

function AnalyticsPage() {
  const statsFn = useServerFn(dashboardStats);
  const statsQ = useQuery({ queryKey: ["stats"], queryFn: () => statsFn() });
  const s = statsQ.data;

  // Opportunity Heatmap (grid of days/hours)
  const heatmapGrid = Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 12 }, (_, hour) => {
      // simulate random densities
      const base = (day * 3 + hour * 2) % 10;
      return base > 7 ? "bg-primary/90 text-primary-foreground" : base > 4 ? "bg-primary/50 text-primary-foreground" : base > 2 ? "bg-primary/20" : "bg-muted/10";
    })
  );

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Intelligence & Reports</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Intelligence Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor pipeline velocity, signals conversion rate, and revenue forecast intelligence.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>Last 7 Days (Jul 2026)</span>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground uppercase font-mono">
            <span>Conversion Ratio</span>
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold">18.4%</span>
            <span className="text-[10px] text-success font-mono font-semibold flex items-center">
              +2.3% <ArrowUpRight className="h-2.5 w-2.5" />
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Ratio of Scans to Qualified Leads</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground uppercase font-mono">
            <span>Pipeline Velocity</span>
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold">3.2 days</span>
            <span className="text-[10px] text-success font-mono font-semibold flex items-center">
              -1.1d <ArrowUpRight className="h-2.5 w-2.5" />
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Time from Signal to Outreach draft</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground uppercase font-mono">
            <span>Est. Pipeline Value</span>
            <Zap className="h-4 w-4 text-intent" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold">${((s?.leads ?? 12) * 1500).toLocaleString()}</span>
            <span className="text-[10px] text-primary font-mono font-semibold flex items-center">
              +14% <ArrowUpRight className="h-2.5 w-2.5" />
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Est. B2B deal size from priority scores</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground uppercase font-mono">
            <span>Agent Confidence</span>
            <ShieldCheck className="h-4 w-4 text-success" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold">94.8%</span>
            <span className="text-[10px] text-success font-mono font-semibold flex items-center">
              +0.5%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Precision of AI intent scoring</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Signal Volume Trend */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-sm">Harvested Signal Volumes</h2>
              <p className="text-xs text-muted-foreground">Volume counts grouped by channel sources</p>
            </div>
            <Badge>Active</Badge>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SIGNAL_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--intent)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--intent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "#fff" }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
                <Area type="monotone" dataKey="LinkedIn" stroke="var(--primary)" fillOpacity={1} fill="url(#colorLk)" />
                <Area type="monotone" dataKey="Jobs" stroke="var(--intent)" fillOpacity={1} fill="url(#colorTw)" />
                <Area type="monotone" dataKey="News" stroke="var(--warning)" fillOpacity={0} />
                <Area type="monotone" dataKey="Twitter" stroke="var(--success)" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Intent Distribution */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3">
          <div>
            <h2 className="font-semibold text-sm">Intent Distribution</h2>
            <p className="text-xs text-muted-foreground">Classified B2B signals by intent type</p>
          </div>
          <div className="h-[210px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INTENT_DISTR}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {INTENT_DISTR.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="font-mono text-2xl font-bold">{s?.leads ?? 12}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Leads</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center text-[10px]">
            {INTENT_DISTR.map((x) => (
              <div key={x.name} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: x.color }} />
                <span className="text-muted-foreground capitalize">{x.name} ({x.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Deal Funnel */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3">
          <div>
            <h2 className="font-semibold text-sm">Lead Conversion Funnel</h2>
            <p className="text-xs text-muted-foreground">Active leads progress through stages</p>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis dataKey="stage" type="category" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--primary)" radius={[0, 4, 4, 0]}>
                  {FUNNEL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "var(--primary)" : "var(--intent)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Opportunity Heatmap */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-sm">Best Outreach Heatmap</h2>
              <p className="text-xs text-muted-foreground">Optimal connection times based on agent signals</p>
            </div>
            <Badge>Recommended</Badge>
          </div>

          <div className="space-y-1 pt-2">
            {days.map((day, dIdx) => (
              <div key={day} className="flex items-center gap-1.5">
                <span className="w-8 text-[10px] text-muted-foreground font-semibold">{day}</span>
                <div className="flex-1 grid grid-cols-12 gap-1">
                  {heatmapGrid[dIdx].map((cls, hIdx) => (
                    <div
                      key={hIdx}
                      className={`h-4.5 rounded-[3px] transition hover:scale-110 cursor-pointer ${cls}`}
                      title={`Optimal density for ${day} ${hours[hIdx]}`}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center text-[9px] text-muted-foreground pt-3 px-1 border-t border-border/40 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Hours: 9 AM - 8 PM
              </span>
              <div className="flex items-center gap-1">
                <span>Quiet</span>
                <span className="h-2 w-2 rounded-sm bg-primary/20" />
                <span className="h-2 w-2 rounded-sm bg-primary/50" />
                <span className="h-2 w-2 rounded-sm bg-primary" />
                <span>Optimal Outreach</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signal Precision Breakdown */}
      <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3">
        <div>
          <h2 className="font-semibold text-sm">Signal Confidence Profile</h2>
          <p className="text-xs text-muted-foreground">AI precision scores per signal channel provider</p>
        </div>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PIPELINE_VELOCITY}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={10} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.3)" fontSize={8} />
              <RechartsRadar name="Confidence score" dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.25} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
