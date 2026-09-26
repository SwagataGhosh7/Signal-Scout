import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/lib/firebase";
import { supabase } from "./client";

// Global functionMiddleware in `src/start.ts`: attaches the authenticated bearer token
export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    // 1. Check Firebase Authentication
    try {
      await auth.authStateReady();
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        if (token) {
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
