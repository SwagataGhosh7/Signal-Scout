import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Settings,
  Key,
  Mail,
  Bell,
  Sliders,
  Webhook,
  Activity,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Badge } from "./app";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  // Mock API configuration values
  const [keys, setKeys] = useState({
    gemini: "AIzaSyD-gemini-3-flash-key-scout",
    groq: "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",
    openai: "sk-proj-********************",
    supabaseUrl: "https://mfpgxfebcotwzgxzsvxg.supabase.co",
  });

  const [emailConfig, setEmailConfig] = useState({
    provider: "SMTP",
    host: "smtp.mailgun.org",
    port: "587",
    user: "outbound@signalscout.ai",
    sender: "Signal Scout Outbound <outbound@signalscout.ai>",
  });

  const [webhooks, setWebhooks] = useState({
    slack: import.meta.env.VITE_SLACK_WEBHOOK ?? "",
    leads: "https://api.signalscout.ai/v1/webhooks/leads",
    active: true,
  });

  const [notifications, setNotifications] = useState({
    emailOnHarvest: true,
    emailOnHotLead: true,
    slackOnDeal: true,
    dailySummary: false,
  });

  const [savingKeys, setSavingKeys] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingWebhooks, setSavingWebhooks] = useState(false);

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingKeys(true);
    setTimeout(() => {
      setSavingKeys(false);
      toast.success("API keys updated", {
        description: "Agent swarms will now query updated models.",
      });
    }, 800);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEmail(true);
    setTimeout(() => {
      setSavingEmail(false);
      toast.success("Email configuration saved", {
        description: "Ready to send outbound draft requests.",
      });
    }, 800);
  };

  const handleSaveWebhooks = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingWebhooks(true);
    setTimeout(() => {
      setSavingWebhooks(false);
      toast.success("Webhook endpoints updated.");
    }, 800);
  };

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    toast.success("Notification preferences updated.");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-primary">System Config</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Project Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage API credentials, configure outbound email channels, webhooks, and alert
          preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* API Credentials */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Key className="h-4.5 w-4.5 text-primary" />
            <h3 className="font-semibold text-sm">AI Providers & API Keys</h3>
          </div>

          <form onSubmit={handleSaveKeys} className="space-y-3">
            <div>
              <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                Gemini Pro/Flash API Key
              </label>
              <input
                type="password"
                value={keys.gemini}
                onChange={(e) => setKeys({ ...keys, gemini: e.target.value })}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                Groq API Key
              </label>
              <input
                type="password"
                value={keys.groq}
                onChange={(e) => setKeys({ ...keys, groq: e.target.value })}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                OpenAI Compatible API Key
              </label>
              <input
                type="password"
                value={keys.openai}
                onChange={(e) => setKeys({ ...keys, openai: e.target.value })}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                Supabase Endpoint URL
              </label>
              <input
                type="text"
                disabled
                value={keys.supabaseUrl}
                className="w-full rounded-md border border-border bg-input/50 px-3 py-2 text-xs outline-none font-mono text-muted-foreground"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 text-warning" /> Credentials stored in secure
                local environment
              </span>
              <button
                type="submit"
                disabled={savingKeys}
                className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 shrink-0"
              >
                <Save className="h-3.5 w-3.5" />
                {savingKeys ? "Saving..." : "Save Keys"}
              </button>
            </div>
          </form>
        </div>

        {/* Outbound Email Config */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Mail className="h-4.5 w-4.5 text-primary" />
            <h3 className="font-semibold text-sm">Outbound Email Inbox</h3>
          </div>

          <form onSubmit={handleSaveEmail} className="space-y-3">
            <div>
              <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                Provider Type
              </label>
              <select
                value={emailConfig.provider}
                onChange={(e) => setEmailConfig({ ...emailConfig, provider: e.target.value })}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
              >
                <option value="SMTP">Custom SMTP Relay (Recommended)</option>
                <option value="Resend">Resend API Integration</option>
                <option value="SendGrid">SendGrid API</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                  Host Server
                </label>
                <input
                  type="text"
                  value={emailConfig.host}
                  onChange={(e) => setEmailConfig({ ...emailConfig, host: e.target.value })}
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                  Port
                </label>
                <input
                  type="text"
                  value={emailConfig.port}
                  onChange={(e) => setEmailConfig({ ...emailConfig, port: e.target.value })}
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                Sender Mask (From Header)
              </label>
              <input
                type="text"
                value={emailConfig.sender}
                onChange={(e) => setEmailConfig({ ...emailConfig, sender: e.target.value })}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Active connection verified
              </span>
              <button
                type="submit"
                disabled={savingEmail}
                className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                {savingEmail ? "Verifying..." : "Save Config"}
              </button>
            </div>
          </form>
        </div>

        {/* Webhooks Config */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Webhook className="h-4.5 w-4.5 text-primary" />
            <h3 className="font-semibold text-sm">Outgoing Webhooks</h3>
          </div>

          <form onSubmit={handleSaveWebhooks} className="space-y-3">
            <div>
              <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                Slack Channel Webhook (Slack Alerts)
              </label>
              <input
                type="text"
                value={webhooks.slack}
                onChange={(e) => setWebhooks({ ...webhooks, slack: e.target.value })}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-muted-foreground uppercase font-mono block mb-1">
                Leads Outflow Hook Endpoint
              </label>
              <input
                type="text"
                value={webhooks.leads}
                onChange={(e) => setWebhooks({ ...webhooks, leads: e.target.value })}
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-xs outline-none focus:border-primary font-mono"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  id="hook-state"
                  checked={webhooks.active}
                  onChange={(e) => setWebhooks({ ...webhooks, active: e.target.checked })}
                />
                <label htmlFor="hook-state" className="text-muted-foreground">
                  Webhooks are active
                </label>
              </div>
              <button
                type="submit"
                disabled={savingWebhooks}
                className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                Save Webhooks
              </button>
            </div>
          </form>
        </div>

        {/* Notifications Preferences */}
        <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Bell className="h-4.5 w-4.5 text-primary" />
            <h3 className="font-semibold text-sm">Notifications & Alerts</h3>
          </div>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium text-foreground">Email on Target Scanned</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Send inbox alerts every time a company's target signals are finished harvesting.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailOnHarvest}
                onChange={() => toggleNotif("emailOnHarvest")}
                className="rounded text-primary focus:ring-primary h-4.5 w-4.5 border-border bg-input"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium text-foreground">
                  Immediate alert on Hot Leads
                </h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Email when AI detects a critical-urgency signal with score exceeding 85.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailOnHotLead}
                onChange={() => toggleNotif("emailOnHotLead")}
                className="rounded text-primary focus:ring-primary h-4.5 w-4.5 border-border bg-input"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium text-foreground">Slack Sync Success Ping</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Ping connected Slack channel when a lead is qualified and pushed to the CRM.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.slackOnDeal}
                onChange={() => toggleNotif("slackOnDeal")}
                className="rounded text-primary focus:ring-primary h-4.5 w-4.5 border-border bg-input"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium text-foreground">Daily Briefing Digest</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Send a consolidated morning PDF summary of new lead activity logs.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.dailySummary}
                onChange={() => toggleNotif("dailySummary")}
                className="rounded text-primary focus:ring-primary h-4.5 w-4.5 border-border bg-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
