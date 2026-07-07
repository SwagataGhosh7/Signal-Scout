/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "@tanstack/react-router";
import type { User, Session } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ data?: unknown; error?: unknown }>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    options?: unknown,
  ) => Promise<{ data?: unknown; error?: unknown }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Initial session check using requested syntax
    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;

      if (session) {
        setSession(session);
        setUser(session.user);
        setLoading(false);
        console.log("[AuthProvider] initial session:", session);
        console.log("[AuthProvider] Session exists on startup -> navigating to /app");
        router
          .navigate({ to: "/app", replace: true })
          .then((res) => console.log("[AuthProvider] Startup redirect navigation success:", res))
          .catch((e) => console.warn("[AuthProvider] Startup redirect navigation failed:", e));
      } else {
        setSession(null);
        setUser(null);
        setLoading(false);
        console.log("[AuthProvider] initial session: null");
      }
    };

    checkInitialSession();

    const { data: sub } = supabase.auth.onAuthStateChange((event, sessionArg) => {
      console.log("[AuthProvider] onAuthStateChange event:", event, "session:", sessionArg);
      setSession(sessionArg ?? null);
      setUser(sessionArg?.user ?? null);
      setLoading(false);

      // Invalidate and navigate accordingly
      router.invalidate();
      if (event === "SIGNED_IN") {
        console.log("[AuthProvider] SIGNED_IN -> navigating to /app");
        router
          .navigate({ to: "/app", replace: true })
          .then((res) => console.log("[AuthProvider] AuthState SIGNED_IN navigation success:", res))
          .catch((e) => console.warn("[AuthProvider] SIGNED_IN navigate error:", e));
      }
      if (event === "SIGNED_OUT") {
        console.log("[AuthProvider] SIGNED_OUT -> navigating to /auth");
        router
          .navigate({ to: "/auth", replace: true })
          .then((res) =>
            console.log("[AuthProvider] AuthState SIGNED_OUT navigation success:", res),
          )
          .catch((e) => console.warn("[AuthProvider] SIGNED_OUT navigate error:", e));
      }
    });

    return () => {
      mounted = false;
      try {
        sub.subscription.unsubscribe();
      } catch {
        // ignore
      }
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.error) {
      console.error("[AuthProvider] login error", res.error);
      setLoading(false);
    } else {
      console.log("[AuthProvider] login success", res.data.session);
      setSession(res.data.session ?? null);
      setUser(res.data.session?.user ?? null);
      setLoading(false);
    }
    return res;
  };

  const signup = async (email: string, password: string, options?: any) => {
    setLoading(true);
    const res = await supabase.auth.signUp({ email, password, options });
    if (res.error) {
      console.error("[AuthProvider] signup error", res.error);
      setLoading(false);
    } else {
      console.log("[AuthProvider] signup success", res.data.user);
      if (res.data.session) {
        setSession(res.data.session);
        setUser(res.data.session.user);
      } else if (res.data.user) {
        setUser(res.data.user);
      }
      setLoading(false);
    }
    return res;
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setLoading(false);
    console.log("[AuthProvider] logout complete");
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthProvider;
