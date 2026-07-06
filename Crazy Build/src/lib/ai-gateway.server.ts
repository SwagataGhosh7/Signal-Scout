import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createLovableAiGatewayProvider(lovableApiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}

export function requireLovableApiKey(): string {
  const key =
    process.env.LOVABLE_API_KEY ||
    process.env.VITE_LOVABLE_API_KEY ||
    process.env.LOVABLE_AI_API_KEY;

  if (!key) {
    throw new Error(
      "LOVABLE_API_KEY is not configured. Add LOVABLE_API_KEY (or VITE_LOVABLE_API_KEY) to your environment before harvesting signals."
    );
  }

  return key;
}
