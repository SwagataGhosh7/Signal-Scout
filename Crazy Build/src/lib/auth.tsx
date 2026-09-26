/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { useRouter } from "@tanstack/react-router";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Use Firebase authStateReady to ensure initial persistence state is resolved
    auth.authStateReady().then(() => {
      if (!mounted) return;
      const currentUser = auth.currentUser;
      setUser(currentUser);
      setLoading(false);

      const currentPath = router.state.location.pathname;
      if (currentUser && (currentPath === "/auth" || currentPath === "/")) {
        console.log(`[AuthProvider] User authenticated on startup -> navigating to /app from ${currentPath}`);
        router.navigate({ to: "/app", replace: true }).catch(() => {});
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!mounted) return;
      console.log("[AuthProvider] onAuthStateChanged user:", firebaseUser?.email ?? null);
      setUser(firebaseUser);
      setLoading(false);
      router.invalidate();

      if (firebaseUser) {
        const currentPath = router.state.location.pathname;
        if (currentPath === "/auth" || currentPath === "/") {
          console.log(`[AuthProvider] SIGNED_IN -> navigating to /app from ${currentPath}`);
          router.navigate({ to: "/app", replace: true }).catch(() => {});
        }
      } else {
        const currentPath = router.state.location.pathname;
        if (currentPath.startsWith("/_authenticated") || currentPath.startsWith("/app")) {
          console.log(`[AuthProvider] SIGNED_OUT -> navigating to /auth from ${currentPath}`);
          router.navigate({ to: "/auth", replace: true }).catch(() => {});
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
    console.log("[AuthProvider] logout complete");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
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
