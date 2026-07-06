import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createGroqProvider() {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY is not configured");
  return createOpenAICompatible({
    name: "groq",
    baseURL: "https://api.groq.com/openai/v1",
    headers: { Authorization: `Bearer ${key}` },
  });
}

export const GROQ_MODEL = "llama-3.3-70b-versatile";
