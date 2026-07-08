import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const HUBSPOT_API_BASE = "https://api.hubapi.com";
const HUBSPOT_AUTH_BASE = "https://app.hubspot.com/oauth/authorize";

function getEnvValue(name: string) {
  const importMetaEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
  return (
    process.env[name] ??
    process.env[`VITE_${name}`] ??
    importMetaEnv?.[name] ??
    importMetaEnv?.[`VITE_${name}`] ??
    ""
  ).trim();
}

function getHubspotClientConfig(redirectUri?: string) {
  const clientId = getEnvValue("HUBSPOT_CLIENT_ID");
  const clientSecret = getEnvValue("HUBSPOT_CLIENT_SECRET");
  const configuredRedirectUri = getEnvValue("HUBSPOT_REDIRECT_URI") || getEnvValue("VITE_HUBSPOT_REDIRECT_URI");
  return {
    clientId,
    clientSecret,
    redirectUri: redirectUri || configuredRedirectUri || "http://localhost:8082/hubspot/callback",
  };
}

function crmHeaders() {
  const token = getEnvValue("HUBSPOT_ACCESS_TOKEN") || getEnvValue("HUBSPOT_API_KEY");
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export const crmStatus = createServerFn({ method: "GET" }).handler(async () => {
  const token = getEnvValue("HUBSPOT_ACCESS_TOKEN") || getEnvValue("HUBSPOT_API_KEY");
  if (!token) return { connected: false };

  const headers = crmHeaders();
  if (!headers) return { connected: false };

  try {
    const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/deals?limit=1`, {
      method: "GET",
      headers,
    });
    return { connected: res.status !== 401 && res.status !== 403 };
  } catch {
    return { connected: false };
  }
});

export const hubspotConnect = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({ redirectUri: z.string().url().optional() })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { clientId } = getHubspotClientConfig(data.redirectUri);
    if (!clientId) {
      throw new Error("HUBSPOT_CLIENT_ID is not configured.");
    }

    const params = new URLSearchParams({
      client_id: clientId,
      scope:
        "crm.objects.deals.read crm.objects.deals.write crm.objects.contacts.read crm.objects.contacts.write crm.objects.companies.read crm.objects.companies.write offline",
      redirect_uri: getHubspotClientConfig(data.redirectUri).redirectUri,
      response_type: "code",
    });

    return {
      url: `${HUBSPOT_AUTH_BASE}?${params.toString()}`,
    };
  });

export const exchangeHubspotCode = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ code: z.string(), state: z.string().optional() }).parse(input))
  .handler(async ({ data }) => {
    const { clientId, clientSecret, redirectUri } = getHubspotClientConfig(data.redirectUri);
    if (!clientId || !clientSecret) {
      return { connected: false, error: "HUBSPOT_CLIENT_ID or HUBSPOT_CLIENT_SECRET is not configured." };
    }

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: data.code,
    });

    try {
      const res = await fetch("https://api.hubapi.com/oauth/v1/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      const tokenJson = await res.json();

      if (!res.ok) {
        return {
          connected: false,
          error: tokenJson?.error_description || tokenJson?.error || "HubSpot token exchange failed.",
        };
      }

      const accessToken = tokenJson.access_token as string | undefined;
      if (!accessToken) {
        return { connected: false, error: "HubSpot did not return an access token." };
      }

      process.env.HUBSPOT_ACCESS_TOKEN = accessToken;
      process.env.HUBSPOT_API_KEY = accessToken;
      return { connected: true };
    } catch (error) {
      return {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown HubSpot auth error",
      };
    }
  });

/**
 * Push a lead to HubSpot as a Deal + associated Contact-less note.
 * Returns { skipped } when the CRM connector is not linked.
 */
export const syncLeadToCrm = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ lead_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const headers = crmHeaders();
    if (!headers) return { skipped: true, reason: "crm_not_connected" as const };

    const { data: lead, error } = await context.supabase
      .from("leads")
      .select("*, targets(company_name, domain, industry)")
      .eq("id", data.lead_id)
      .single();
    if (error || !lead) throw new Error(error?.message ?? "Lead not found");

    const target = (
      lead as { targets?: { company_name?: string; domain?: string; industry?: string } }
    ).targets;

    const dealBody = {
      properties: {
        dealname: lead.title,
        pipeline: "default",
        dealstage: "appointmentscheduled",
        amount: String(lead.score * 100),
        description: `${lead.rationale ?? ""}\n\nIntent: ${lead.intent ?? "unknown"} · Urgency: ${lead.urgency}`,
      },
    };

    const dealRes = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/deals`, {
      method: "POST",
      headers,
      body: JSON.stringify(dealBody),
    });
    const dealJson = await dealRes.json();
    if (!dealRes.ok) {
      const detail =
        dealJson?.message ||
        dealJson?.error ||
        JSON.stringify(dealJson);
      const authMessage =
        dealRes.status === 401 || dealRes.status === 403
          ? "HubSpot authentication failed. Check HUBSPOT_ACCESS_TOKEN."
          : "HubSpot deal create failed.";
      throw new Error(`${authMessage} [${dealRes.status}]: ${detail}`);
    }

    // Also create/find a company if we have a domain
    if (target?.company_name) {
      const compBody = {
        properties: {
          name: target.company_name,
          domain: target.domain ?? undefined,
          industry: target.industry ?? undefined,
        },
      };
      await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/companies`, {
        method: "POST",
        headers,
        body: JSON.stringify(compBody),
      }).catch(() => null);
    }

    return { skipped: false, deal_id: dealJson.id as string };
  });
