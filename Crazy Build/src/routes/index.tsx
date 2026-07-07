import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Brain, Radar, Rocket, Target, Zap } from "lucide-react";
import { ThemeToggle } from "../components/theme-toggle";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Grid and Mesh backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-mesh-light opacity-50" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/15 text-primary">
            <Radar className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-tight">Signal Scout</span>
        </Link>
        <div className="flex items-center gap-3 animate-reveal-up stagger-1">
          <ThemeToggle />
          <Link
            to="/auth"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground glow hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center md:py-32">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs backdrop-blur animate-reveal-up stagger-1">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success" />
          <span className="text-muted-foreground font-mono">
            Agentic AI · 5-stage signal pipeline
          </span>
        </div>
        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl animate-reveal-up stagger-2">
          The <span className="text-gradient">signal</span> your <br className="hidden md:block" />
          pipeline was missing.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-reveal-up stagger-3">
          Signal Scout deploys an autonomous agent swarm that watches LinkedIn, Twitter/X, funding
          news, hiring posts, product launches, and web changes — then prioritizes the opportunities
          you should act on right now.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 animate-reveal-up stagger-4">
          <Link
            to="/auth"
            className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground glow hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            Start harvesting signals
          </Link>
          <a
            href="#pipeline"
            className="rounded-md border border-border bg-card/50 px-6 py-3 font-medium backdrop-blur transition-all hover:bg-accent hover:border-primary/50"
          >
            See the pipeline
          </a>
        </div>
      </section>

      {/* Pipeline */}
      <section
        id="pipeline"
        className="relative z-10 mx-auto max-w-6xl px-6 py-16 animate-reveal-up stagger-5"
      >
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-mono">
            Agentic workflow
          </p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Five agents. One pipeline.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {[
            { icon: Radar, name: "Collect", desc: "Scrape LinkedIn, X, jobs, news, web." },
            { icon: Brain, name: "Analyze", desc: "Detect hiring, buying, partnership intent." },
            { icon: Target, name: "Prioritize", desc: "Score urgency & conversion potential." },
            { icon: Zap, name: "Automate", desc: "Draft outreach, create CRM entries." },
            { icon: Activity, name: "Intelligence", desc: "Heatmaps & conversion analytics." },
          ].map((s, i) => (
            <div
              key={s.name}
              className="group relative rounded-2xl border border-border bg-card/50 p-5 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-card hover:-translate-y-1 hover:glow"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature strip */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Radar,
              title: "Always-on monitoring",
              body: "Add a target once. Agents scan continuously and surface fresh signals across every source.",
            },
            {
              icon: Brain,
              title: "AI intent scoring",
              body: "Each signal is classified by intent, urgency, and conversion potential — 0 to 100.",
            },
            {
              icon: Rocket,
              title: "Ready-to-send outreach",
              body: "Personalized email drafts generated in one click, grounded in the signal that triggered them.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur"
            >
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-intent/20 text-intent">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-8 text-center animate-reveal-up stagger-5">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/20 p-10 backdrop-blur glow transition-all hover:border-primary/30">
          <h2 className="text-3xl font-semibold md:text-4xl">Stop monitoring. Start closing.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Deploy your first signal-harvesting agent in 60 seconds.
          </p>
          <Link
            to="/auth"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground glow hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            <Zap className="h-4 w-4" />
            Deploy agent
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
        Signal Scout · Signals Harvesting Engine & Agentic AI Workflow System
      </footer>
    </div>
  );
}
