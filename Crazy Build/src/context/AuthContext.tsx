/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  auth,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle as firebaseSignInWithGoogle,
  logOut as firebaseLogOut,
  onAuthChange,
} from "@/firebase/auth";
import { useRouter } from "@tanstack/react-router";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  loading: boolean;
  isAuthenticated: boolean;
  // Methods
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, fullName: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
      setStatus(currentUser ? "authenticated" : "unauthenticated");
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const loggedUser = await signInWithEmail(email, password);
      setUser(loggedUser);
      setStatus("authenticated");
      return loggedUser;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    fullName: string,
  ): Promise<User> => {
    setLoading(true);
    try {
      const newUser = await signUpWithEmail(email, password, fullName);
      setUser(newUser);
      setStatus("authenticated");
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<User> => {
    setLoading(true);
    try {
      const googleUser = await firebaseSignInWithGoogle();
      setUser(googleUser);
      setStatus("authenticated");
      return googleUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await firebaseLogOut();
      setUser(null);
      setStatus("unauthenticated");
      router.navigate({ to: "/auth" }).catch(() => {});
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    status,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
