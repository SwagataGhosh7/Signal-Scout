import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/lib/firebase";
import { supabase } from "./client";

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

if (typeof window !== "undefined") {
  auth.onIdTokenChanged((user) => {
    if (!user) {
      cachedToken = null;
      tokenExpiresAt = 0;
    }
  });
}

// Global functionMiddleware in `src/start.ts`: attaches the authenticated bearer token
export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    // 1. Check Firebase Authentication
    try {
      const now = Date.now();
      if (cachedToken && now < tokenExpiresAt && auth.currentUser) {
        return next({
          headers: { Authorization: `Bearer ${cachedToken}` },
        });
      }

      const user = auth.currentUser ?? (await auth.authStateReady(), auth.currentUser);
      if (user) {
        const token = await user.getIdToken(false);
        if (token) {
          cachedToken = token;
          tokenExpiresAt = now + 45 * 60 * 1000;
          return next({
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      }
    } catch {
      // Fall through to check Supabase session
    }

    // 2. Check Supabase session
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (token) {
        return next({
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      // ignore
    }

    return next({ headers: {} });
  },
);
