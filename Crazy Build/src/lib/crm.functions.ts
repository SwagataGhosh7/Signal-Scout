import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const GATEWAY = "https://connector-gateway.lovable.dev/hubspot";

function crmHeaders() {
  const lovable = process.env.LOVABLE_API_KEY;
  const hubspot = process.env.HUBSPOT_API_KEY;
  if (!lovable || !hubspot) return null;
  return {
    Authorization: `Bearer ${lovable}`,
    "X-Connection-Api-Key": hubspot,
    "Content-Type": "application/json",
  };
}

export const crmStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { connected: Boolean(process.env.HUBSPOT_API_KEY && process.env.LOVABLE_API_KEY) };
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

    const dealRes = await fetch(`${GATEWAY}/crm/v3/objects/deals`, {
      method: "POST",
      headers,
      body: JSON.stringify(dealBody),
    });
    const dealJson = await dealRes.json();
    if (!dealRes.ok) {
      throw new Error(
        `HubSpot deal create failed [${dealRes.status}]: ${JSON.stringify(dealJson)}`,
      );
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
      await fetch(`${GATEWAY}/crm/v3/objects/companies`, {
        method: "POST",
        headers,
        body: JSON.stringify(compBody),
      }).catch(() => null);
    }

    return { skipped: false, deal_id: dealJson.id as string };
  });
