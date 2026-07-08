import { createFileRoute, useNavigate, useRouter, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { firebaseAuth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser as firebaseDeleteUser,
  GoogleAuthProvider,
  GoogleAuthProvider as GoogleAuthProviderClass,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  type AuthError as FirebaseAuthError,
} from "firebase/auth";
import {
  Activity,
  Brain,
  Eye,
  EyeOff,
  Radar,
  Target,
  Zap,
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

/* ─────────────────────────────────────────────────────────────────────────
   FIREBASE ERROR → HUMAN READABLE MESSAGE
   ───────────────────────────────────────────────────────────────────────── */
function mapFirebaseError(error: unknown): string {
  if (!error || typeof error !== "object") return "An unexpected error occurred.";

  const firebaseErr = error as FirebaseAuthError;
  const code = firebaseErr.code ?? "";

  const map: Record<string, string> = {
    "auth/email-already-in-use": "This email is already registered. Try signing in instead.",
    "auth/invalid-email": "Invalid email address. Please check and try again.",
    "auth/weak-password": "Password must be at least 6 characters long.",
    "auth/wrong-password": "Incorrect password. Please try again or reset your password.",
    "auth/user-not-found": "No account found with this email. Please sign up first.",
    "auth/user-disabled": "This account has been disabled. Contact support.",
    "auth/too-many-requests": "Too many failed attempts. Please wait a moment and try again.",
    "auth/network-request-failed": "Network error. Check your internet connection and retry.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled. Try again.",
    "auth/popup-blocked": "Popup was blocked by the browser. Allow popups for this site.",
    "auth/cancelled-popup-request": "Only one sign-in window at a time. Please try again.",
    "auth/account-exists-with-different-credential":
      "An account with this email already exists using a different sign-in method.",
    "auth/invalid-credential": "Your credentials are invalid or have expired. Please try again.",
    "auth/operation-not-allowed": "This sign-in method is not enabled. Contact the admin.",
    "auth/requires-recent-login": "Please sign out and sign in again to perform this action.",
    "auth/missing-email": "Email address is required.",
    "auth/missing-password": "Password is required.",
    "auth/internal-error": "An internal error occurred. Please try again later.",
    "auth/api-key-not-valid": "Firebase configuration error. Contact support.",
  };

  if (code && map[code]) return map[code];

  // Fallback: strip Firebase wrapper text and expose the actual message
  const msg = firebaseErr.message ?? "";
  const cleaned = msg
    .replace("Firebase: ", "")
    .replace(/\(auth\/[^)]+\)\.?/, "")
    .trim();

  return cleaned || "Authentication failed. Please try again.";
}

/* ─────────────────────────────────────────────────────────────────────────
   CLIENT-SIDE VALIDATION
   ───────────────────────────────────────────────────────────────────────── */
function validateInputs(opts: {
  mode: "signin" | "signup";
  email: string;
  password: string;
  username: string;
}): string | null {
  const { mode, email, password, username } = opts;

  if (mode === "signup" && !username.trim()) {
    return "Full name is required.";
  }

  if (!email.trim()) return "Email address is required.";

  // Basic RFC-5322 surface check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Invalid email address format.";
  }

  if (!password) return "Password is required.";

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  return null; // valid
}

/* ─────────────────────────────────────────────────────────────────────────
   SUPABASE ENV GUARD
   ───────────────────────────────────────────────────────────────────────── */
function checkSupabaseEnv(): string | null {
  const url = import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.SUPABASE_URL;
  const key =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
    import.meta.env.VITE_SUPABASE_ANON_KEY ??
    import.meta.env.SUPABASE_PUBLISHABLE_KEY ??
    import.meta.env.SUPABASE_ANON_KEY;

  if (!url) return "Supabase URL is missing from environment configuration.";
  if (!key) return "Supabase Anon Key is missing from environment configuration.";
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────
   DECORATIVE COMPONENTS
   ───────────────────────────────────────────────────────────────────────── */
function SignalDot({ style }: { style: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "color-mix(in srgb, var(--color-primary) calc(0.6 * 100%), transparent)",
        boxShadow:
          "0 0 10px 2px color-mix(in srgb, var(--color-primary) calc(0.5 * 100%), transparent)",
        animation: "floatDot 6s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 14,
        height: 14,
        borderRadius: "50%",
        border: "2px solid oklch(0.16 0.03 260 / 0.35)",
        borderTopColor: "var(--color-background)",
        animation: "auth-spin 0.65s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FEATURES / STATS
   ───────────────────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: Radar, label: "Always-on signal harvesting", color: "#22d3ee" },
  { icon: Brain, label: "AI intent scoring (0–100)", color: "#a78bfa" },
  { icon: Target, label: "Lead prioritisation engine", color: "#34d399" },
  { icon: Zap, label: "One-click outreach drafts", color: "#fbbf24" },
  { icon: Activity, label: "Real-time analytics heatmap", color: "#f87171" },
];

const STATS = [
  { value: "12k+", label: "Signals / day" },
  { value: "94%", label: "Intent accuracy" },
  { value: "3.2×", label: "Pipeline growth" },
];

/* ─────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────────────── */
function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  // inline validation error shown under the form
  const [fieldError, setFieldError] = useState<string | null>(null);
  const submitting = useRef(false); // guard against duplicate submissions

  // NOTE: navigation after auth is handled centrally by the AuthProvider
  // which listens to Supabase auth state changes and navigates accordingly.

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data }) => {
      console.log("[Auth] Existing session check:", data.session ? "session found" : "no session");
      console.log("[Auth] Session:", data.session);
      console.log("[Auth] User:", data.session?.user ?? null);
      if (data.session) {
        // Already authenticated — skip the login page entirely
        navigate({ to: "/app", replace: true });
      }
    });
  }, [navigate]);

  /* ── helpers ────────────────────────────────────────────────────────── */
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setShowPw(false);
    setFieldError(null);
  };

  const switchMode = () => {
    resetForm();
    setMode((m) => (m === "signin" ? "signup" : "signin"));
  };

  /* ── SIGN UP ─────────────────────────────────────────────────────────── */
  const handleSignUp = async () => {
    // 1. Validate inputs first — never hit the network with bad data
    const validationError = validateInputs({ mode: "signup", email, password, username });
    if (validationError) {
      setFieldError(validationError);
      toast.error(validationError);
      console.warn("[Auth] Validation failed:", validationError);
      return;
    }

    // 2. Check Supabase env
    const envError = checkSupabaseEnv();
    if (envError) {
      setFieldError(envError);
      toast.error(envError);
      console.error("[Auth] Env check failed:", envError);
      return;
    }

    setFieldError(null);
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Firebase — create account
    let firebaseUid: string | null = null;
    let firebaseUser: import("firebase/auth").User | null = null;
    try {
      console.log("[Firebase] Attempting createUserWithEmailAndPassword for:", normalizedEmail);
      const cred = await createUserWithEmailAndPassword(firebaseAuth, normalizedEmail, password);
      console.log("[Firebase] User created:", cred.user);
      firebaseUid = cred.user.uid;
      firebaseUser = cred.user;

      await updateProfile(cred.user, { displayName: username.trim() });
      console.log("[Firebase] Profile updated with displayName:", username.trim());
    } catch (firebaseErr: unknown) {
      const msg = mapFirebaseError(firebaseErr);
      console.error("[Firebase] createUserWithEmailAndPassword error:", firebaseErr);
      setFieldError(msg);
      toast.error(msg);
      return;
    }

    // 4. Supabase — mirror account for database / RLS
    try {
      console.log("[Supabase] Attempting signUp mirror for:", normalizedEmail);
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/app`,
          data: {
            full_name: username.trim(),
            username: username.trim(),
            firebase_uid: firebaseUid,
          },
        },
      });

      console.log("[Supabase] signUp response data:", data);
      console.log("[Supabase] signUp response error:", error);

      if (error) {
        const errMsg = error.message.toLowerCase();
        // CRITICAL: Email already exists in Supabase. We must DELETE the Firebase account
        // that was just created to prevent orphaned accounts, then inform the user.
        if (
          errMsg.includes("already registered") ||
          errMsg.includes("already been registered") ||
          errMsg.includes("already exists")
        ) {
          console.warn(
            "[Supabase] Email already registered in Supabase — deleting orphaned Firebase account.",
          );
          if (firebaseUser) {
            try {
              await firebaseDeleteUser(firebaseUser);
              console.log("[Firebase] Orphaned Firebase account deleted successfully.");
            } catch (delErr) {
              console.error("[Firebase] Failed to delete orphaned Firebase account:", delErr);
            }
          }
          const conflictMsg =
            "This email address is already registered. Please sign in with your email and password instead.";
          setFieldError(conflictMsg);
          toast.error("Account already exists", { description: conflictMsg, duration: 8000 });
          return;
        } else {
          console.error("[Supabase] signUp error:", error);
          // Clean up Firebase account if Supabase fails for any other reason
          if (firebaseUser) {
            try {
              await firebaseDeleteUser(firebaseUser);
              console.log("[Firebase] Firebase account cleaned up after Supabase error.");
            } catch (delErr) {
              console.error("[Firebase] Failed to clean up Firebase account:", delErr);
            }
          }
          setFieldError(error.message);
          toast.error(error.message);
          return;
        }
      }

      // 5. Email confirmation flow
      const needsConfirmation = data?.user && !data.session && data.user.identities?.length === 0;
      const identityCreated = data?.user && data.user.identities && data.user.identities.length > 0;

      if (!data?.session) {
        if (needsConfirmation || (data?.user && !data?.session && identityCreated)) {
          toast.success("Almost there!", {
            description: "Please verify your email before signing in. Check your inbox.",
            duration: 7000,
          });
          console.log("[Auth] Email confirmation required.");
          return;
        }

        console.warn("[Auth] Supabase signUp returned no session. Attempting immediate sign-in...");
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log("[Supabase] signInWithPassword after signUp data:", signInData);
        console.log("[Supabase] signInWithPassword after signUp error:", signInError);

        if (signInError) {
          if (signInError.message.toLowerCase().includes("email not confirmed")) {
            const msg = "Please verify your email before signing in. Check your inbox.";
            setFieldError(msg);
            toast.error("Email not confirmed", { description: msg });
            return;
          }

          setFieldError(signInError.message);
          toast.error(signInError.message);
          return;
        }

        if (!signInData?.session) {
          const msg = "Account created, but no valid session could be established. Please try signing in again.";
          console.error("[Auth] signInWithPassword after signUp returned no session:", signInData);
          setFieldError(msg);
          toast.error(msg);
          return;
        }
      }

      toast.success("Welcome to Signal Scout 🚀", {
        description: "Your agent swarm is ready to deploy.",
      });
      console.log("[Auth] Sign-up complete — invalidating router and navigating to /app");
      await router.invalidate();
      await router
        .navigate({
          to: "/app",
          replace: true,
        })
        .then((res) => console.log("[Auth] Sign-up navigation success", res))
        .catch((err) => console.error("[Auth] Sign-up navigation failed:", err));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unexpected error during account creation.";
      console.error("[Supabase] signUp unexpected error:", err);
      // Clean up Firebase account on unexpected errors too
      if (firebaseUser) {
        try {
          await firebaseDeleteUser(firebaseUser);
          console.log("[Firebase] Firebase account cleaned up after unexpected error.");
        } catch (delErr) {
          console.error("[Firebase] Failed to clean up Firebase account:", delErr);
        }
      }
      setFieldError(msg);
      toast.error(msg);
    }
  };

  /* ── SIGN IN ─────────────────────────────────────────────────────────── */
  const handleSignIn = async () => {
    // 1. Validate inputs
    const validationError = validateInputs({ mode: "signin", email, password, username: "skip" });
    if (validationError) {
      setFieldError(validationError);
      toast.error(validationError);
      console.warn("[Auth] Validation failed:", validationError);
      return;
    }

    // 2. Check Supabase env
    const envError = checkSupabaseEnv();
    if (envError) {
      setFieldError(envError);
      toast.error(envError);
      console.error("[Auth] Env check failed:", envError);
      return;
    }

    setFieldError(null);
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Supabase sign-in (primary auth source)
    try {
      console.log("[Supabase] Attempting signInWithPassword for:", normalizedEmail);
      let supabaseResult = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      console.log("[Supabase] signInWithPassword response data:", supabaseResult.data);
      console.log("[Supabase] signInWithPassword response error:", supabaseResult.error);

      if (supabaseResult.error) {
        const errMsgLower = supabaseResult.error.message.toLowerCase();

        if (errMsgLower.includes("email not confirmed")) {
          const msg = "Please verify your email before signing in. Check your inbox.";
          setFieldError(msg);
          toast.error("Email not confirmed", { description: msg });
          return;
        }

        if (
          errMsgLower.includes("invalid login credentials") ||
          errMsgLower.includes("invalid credentials") ||
          errMsgLower.includes("user not found")
        ) {
          console.warn(
            "[Auth] Supabase login failed; falling back to Firebase sign-in to recover or mirror the account.",
          );

          let firebaseUserCredential = null as Awaited<ReturnType<typeof signInWithEmailAndPassword>> | null;
          try {
            console.log("[Firebase] Attempting signInWithEmailAndPassword for:", email);
            firebaseUserCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            console.log("[Firebase] Signed in:", firebaseUserCredential.user);
          } catch (firebaseErr: unknown) {
            const msg = mapFirebaseError(firebaseErr);
            console.error("[Firebase] signInWithEmailAndPassword error:", firebaseErr);

            try {
              const methods = await fetchSignInMethodsForEmail(firebaseAuth, email);
              console.log("[Firebase] fetchSignInMethodsForEmail for", email, methods);
              if (methods.length > 0 && !methods.includes("password")) {
                const providerList = methods.join(", ");
                const providerMsg =
                  `This email is registered with ${providerList}. Please sign in using that provider.`;
                setFieldError(providerMsg);
                toast.error("Sign in method mismatch", { description: providerMsg, duration: 10000 });
                return;
              }
            } catch (fetchErr) {
              console.warn(
                "[Firebase] fetchSignInMethodsForEmail failed while handling credential error:",
                fetchErr,
              );
            }

            setFieldError(msg);
            toast.error(msg);
            return;
          }

          console.log("[Auth] Firebase sign-in succeeded; ensuring Supabase mirror exists.");
          const { data: mirrorData, error: mirrorError } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username: email.split("@")[0] } },
          });

          console.log("[Supabase] Mirror signUp data:", mirrorData);
          console.log("[Supabase] Mirror signUp error:", mirrorError);

          if (mirrorError && !mirrorError.message.toLowerCase().includes("already")) {
            setFieldError(mirrorError.message);
            toast.error(mirrorError.message);
            return;
          }

          if (mirrorData?.session) {
            supabaseResult = mirrorData;
          } else {
            const retrySignIn = await supabase.auth.signInWithPassword({ email, password });
            console.log(
              "[Supabase] Retry signInWithPassword after mirror creation data:",
              retrySignIn.data,
            );
            console.log(
              "[Supabase] Retry signInWithPassword after mirror creation error:",
              retrySignIn.error,
            );
            if (retrySignIn.error) {
              if (retrySignIn.error.message.toLowerCase().includes("email not confirmed")) {
                const msg = "Please verify your email before signing in. Check your inbox.";
                setFieldError(msg);
                toast.error("Email not confirmed", { description: msg });
                return;
              }
              setFieldError(retrySignIn.error.message);
              toast.error(retrySignIn.error.message);
              return;
            }
            supabaseResult = retrySignIn;
          }
        } else {
          const msg =
            supabaseResult.error.code === "invalid_credentials"
              ? "Email or password is incorrect. If you just created your account, please verify your email or reset your password."
              : supabaseResult.error.message;
          setFieldError(msg);
          toast.error(msg);
          return;
        }
      }

      if (!supabaseResult.data?.session) {
        const msg = "Authentication could not establish a valid session. Please try again.";
        console.error("[Auth] Sign-in did not return a valid session:", supabaseResult.data);
        setFieldError(msg);
        toast.error(msg);
        return;
      }

      toast.success("Signal Scout activated ⚡", {
        description: "All agents are online.",
      });
      console.log("[Auth] Sign-in complete — invalidating router and navigating to /app");
      await router.invalidate();
      await router
        .navigate({
          to: "/app",
          replace: true,
        })
        .then((res) => console.log("[Auth] Sign-in navigation success", res))
        .catch((err) => console.error("[Auth] Sign-in navigation failed:", err));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unexpected error during sign-in.";
      console.error("[Supabase] signInWithPassword unexpected error:", err);
      setFieldError(msg);
      toast.error(msg);
    }
  };

  const handlePasswordReset = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      const msg = "Please enter your email address first.";
      setFieldError(msg);
      toast.error(msg);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      const msg = "Please enter a valid email address.";
      setFieldError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      console.log("[Auth] Initiating password reset for:", normalizedEmail);

      try {
        await sendPasswordResetEmail(firebaseAuth, normalizedEmail, {
          url: `${window.location.origin}/auth`,
        });
        console.log("[Auth] Firebase password reset email sent successfully.");
      } catch (firebaseResetErr: unknown) {
        const firebaseError = firebaseResetErr as FirebaseAuthError;
        console.error("[Auth] Firebase password reset failed:", firebaseResetErr);

        if (firebaseError?.code === "auth/user-not-found") {
          const msg = "No account was found for that email address.";
          setFieldError(msg);
          toast.error(msg);
          return;
        }

        const msg = mapFirebaseError(firebaseResetErr);
        setFieldError(msg);
        toast.error(msg);
        return;
      }

      try {
        const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
          redirectTo: `${window.location.origin}/auth`,
        });

        if (error) {
          console.error("[Supabase] Password reset request failed:", error);
          toast.warning("Password reset requested", {
            description: "A reset email was requested, but Supabase reported an issue. Please check your inbox or try again.",
          });
        }
      } catch (supabaseResetErr) {
        console.error("[Supabase] Password reset request threw:", supabaseResetErr);
      }

      toast.success("Password reset sent", {
        description: "Check your inbox and spam folder for the reset link.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ── MAIN SUBMIT HANDLER ─────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) {
      console.warn("[Auth] Submission already in progress, ignoring duplicate.");
      return;
    }
    submitting.current = true;
    setLoading(true);
    try {
      if (mode === "signup") {
        await handleSignUp();
      } else {
        await handleSignIn();
      }
    } finally {
      setLoading(false);
      submitting.current = false;
    }
  };

  /* ── GOOGLE OAUTH ────────────────────────────────────────────────────── */
  const handleGoogle = async () => {
    if (googleLoading || loading) return;

    // Check Supabase env
    const envError = checkSupabaseEnv();
    if (envError) {
      toast.error(envError);
      console.error("[Auth] Env check failed:", envError);
      return;
    }

    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      console.log("[OAuth] Opening Google sign-in popup...");
      const result = await signInWithPopup(firebaseAuth, provider);
      const credential = GoogleAuthProviderClass.credentialFromResult(result);
      const user = result.user;

      // ── Full debug log of OAuth response ──────────────────────────────────
      console.log("[OAuth] Response:", result);
      console.log("[OAuth] Credential:", credential);
      console.log("[OAuth] User Object:", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        providerData: user.providerData,
      });
      console.log("[OAuth] Provider:", result.providerId);
      // ─────────────────────────────────────────────────────────────────────

      // STEP 1: Try to sign into Supabase using uid as the stable password
      // (this works for users who previously registered via Google OAuth)
      console.log("[Supabase] Attempting Google-mirror sign-in for:", user.email);
      const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: user.uid,
      });
      console.log("[Supabase] Mirror sign-in data:", signInData);
      console.log("[Supabase] Mirror sign-in error:", signInErr);

      if (!signInErr && signInData?.session) {
        // ✅ Existing Google-registered user — session obtained
        console.log("[Supabase] Session obtained:", signInData.session);
        toast.success(`Welcome back, ${user.displayName ?? user.email} ⚡`);
        console.log("[Auth] Google sign-in complete — navigating to /app");
        await router.invalidate();
        await router
          .navigate({ to: "/app", replace: true })
          .then((res) => console.log("[Auth] Google navigation success", res))
          .catch((navErr) => console.error("[Auth] Google navigation failed:", navErr));
        return;
      }

      // STEP 2: Sign-in failed — try registering a new Supabase account for this Google user
      console.warn(
        "[Supabase] Mirror sign-in failed. Attempting to register new Supabase account...",
      );
      const { data: signupData, error: signupErr } = await supabase.auth.signUp({
        email: user.email!,
        password: user.uid,
        options: {
          data: {
            full_name: user.displayName ?? "",
            username: user.displayName ?? user.email?.split("@")[0],
            firebase_uid: user.uid,
            avatar_url: user.photoURL ?? "",
            provider: "google",
          },
        },
      });
      console.log("[Supabase] Mirror sign-up data:", signupData);
      console.log("[Supabase] Mirror sign-up error:", signupErr);

      if (!signupErr && signupData?.session) {
        // ✅ New Google user registered and session obtained
        console.log("[Supabase] New Google account created. Session:", signupData.session);
        toast.success(`Welcome, ${user.displayName ?? "Scout"} ⚡`, {
          description: "Your Signal Scout account has been created.",
        });
        await router.invalidate();
        await router
          .navigate({ to: "/app", replace: true })
          .then((res) => console.log("[Auth] Google new-user navigation success", res))
          .catch((navErr) => console.error("[Auth] Google new-user navigation failed:", navErr));
        return;
      }

      // STEP 3: signUp also failed — check if it's because this email already has
      // an Email/Password account in Supabase (the root cause for sinhatumpa84@gmail.com)
      if (signupErr) {
        const errMsg = signupErr.message.toLowerCase();
        console.error("[Supabase] Sign-up error object:", signupErr);

        if (
          errMsg.includes("already registered") ||
          errMsg.includes("already been registered") ||
          errMsg.includes("already exists")
        ) {
          // ── ROOT CAUSE DETECTED ───────────────────────────────────────────
          // This email has an existing Email/Password account in Supabase.
          // Google sign-in cannot merge these automatically.
          // We must NOT silently redirect — that triggers the route guard loop.
          // ─────────────────────────────────────────────────────────────────
          console.error(
            "[OAuth] CONFLICT: Email",
            user.email,
            "already exists with Email/Password credentials in Supabase.",
            "Google OAuth UID password does not match the stored password.",
            "Sign-up error:",
            signupErr.message,
          );

          // Try to confirm what sign-in methods this email supports in Firebase
          try {
            const methods = await fetchSignInMethodsForEmail(firebaseAuth, user.email!);
            console.log("[Firebase] Existing sign-in methods for", user.email, ":", methods);
          } catch (e) {
            console.warn("[Firebase] Could not fetch sign-in methods:", e);
          }

          const conflictMsg =
            `An account with ${user.email} already exists using Email/Password sign-in. ` +
            `Please sign in with your email and password instead. ` +
            `After signing in, you can link your Google account from Settings.`;

          setFieldError(conflictMsg);
          toast.error("Account already exists", {
            description: conflictMsg,
            duration: 10000,
          });
          // Pre-fill the email field to make it easy for the user
          setEmail(user.email ?? "");
          setMode("signin");
          return;
        }

        // Some other Supabase signup error
        const displayMsg = signupErr.message || "Google authentication failed. Please try again.";
        console.error("[OAuth] Unhandled Supabase sign-up error:", signupErr);
        setFieldError(displayMsg);
        toast.error("Google authentication failed", { description: displayMsg });
        return;
      }

      // STEP 4: signup succeeded but no session yet (email confirmation required?)
      if (signupData?.user && !signupData?.session) {
        console.log(
          "[Supabase] Account created but no session — email confirmation may be required.",
        );
        toast.info("Check your inbox", {
          description: "A confirmation email has been sent. Please verify to continue.",
          duration: 8000,
        });
        return;
      }

      // Fallback — should not be reached under normal conditions
      console.error(
        "[OAuth] Unexpected state — no session and no error. signInData:",
        signInData,
        "signupData:",
        signupData,
      );
      toast.error("Google authentication failed", {
        description:
          "An unexpected error occurred. Please try again or sign in with email/password.",
      });
    } catch (err: unknown) {
      const fbErr = err as FirebaseAuthError;
      console.error("[OAuth] Caught error:", {
        code: fbErr?.code,
        message: fbErr?.message,
        error: err,
      });
      if (
        fbErr?.code === "auth/popup-closed-by-user" ||
        fbErr?.code === "auth/cancelled-popup-request"
      ) {
        console.info("[OAuth] Google popup closed by user — no action needed.");
        return; // silent — user intentionally closed it
      }
      if (fbErr?.code === "auth/account-exists-with-different-credential") {
        // Firebase itself detected a cross-provider conflict
        const conflictMsg =
          "This account already exists with a different sign-in method. " +
          "Please sign in with your email and password.";
        console.error("[OAuth] Firebase account-exists-with-different-credential:", err);
        setFieldError(conflictMsg);
        toast.error("This account already exists with another sign-in method", {
          description: conflictMsg,
          duration: 8000,
        });
        return;
      }
      const msg = mapFirebaseError(err);
      console.error("[OAuth] Firebase Google sign-in error:", err);
      setFieldError(msg);
      toast.error("Google authentication failed", { description: msg });
    } finally {
      setGoogleLoading(false);
    }
  };

  const anyLoading = loading || googleLoading;

  /* ── RENDER ──────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @keyframes floatDot {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-18px) scale(1.3); opacity: 1; }
        }
        @keyframes auth-spin { to { transform: rotate(360deg); } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        .auth-panel  { animation: slideUp 0.55s cubic-bezier(.16,1,.3,1) both; }
        .auth-left   { animation: fadeIn 0.8s ease both; }
        .field-slide { animation: slideUp 0.3s cubic-bezier(.16,1,.3,1) both; }
        .shake       { animation: shakeX 0.4s ease; }

        .auth-input {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 12px 10px 36px;
          border-radius: 9px;
          border: 1px solid var(--color-input);
          background: color-mix(in srgb, var(--color-background) 50%, transparent);
          color: var(--color-foreground);
          font-size: 13.5px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }
        .auth-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) calc(0.12 * 100%), transparent);
        }
        .auth-input.has-error {
          border-color: var(--color-destructive);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) calc(0.12 * 100%), transparent);
        }
        .auth-input::placeholder { color: var(--color-muted-foreground); }

        .auth-btn-primary {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          margin-top: 4px;
          border-radius: 10px;
          border: none;
          background: var(--color-primary);
          color: var(--color-background);
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          box-shadow: 0 0 24px -4px color-mix(in srgb, var(--color-primary) calc(0.45 * 100%), transparent);
          transition: opacity 0.2s ease, transform 0.15s ease;
          font-family: inherit;
        }
        .auth-btn-primary:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .auth-btn-primary:active:not(:disabled) { transform: translateY(0); }
        .auth-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          color: var(--color-foreground);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          font-family: inherit;
        }
        .auth-btn-google:hover:not(:disabled) {
          background: var(--color-background);
          border-color: color-mix(in srgb, var(--color-primary) calc(0.4 * 100%), transparent);
          transform: translateY(-1px);
        }
        .auth-btn-google:disabled { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 768px) { .auth-left { display: none !important; } }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          background: "var(--color-background)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow + grid */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 20% 40%, oklch(0.4 0.14 205 / 0.18), transparent 60%), radial-gradient(ellipse 50% 60% at 80% 70%, oklch(0.32 0.12 285 / 0.22), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(oklch(0.3 0.03 260 / 0.35) 1px, transparent 1px), linear-gradient(90deg, oklch(0.3 0.03 260 / 0.35) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
            opacity: 0.5,
          }}
        />

        {mounted && (
          <>
            <SignalDot style={{ top: "12%", left: "8%", animationDelay: "0s" }} />
            <SignalDot style={{ top: "70%", left: "15%", animationDelay: "1.5s" }} />
            <SignalDot
              style={{
                top: "35%",
                left: "40%",
                animationDelay: "0.8s",
                background: "color-mix(in srgb, var(--color-intent) calc(0.5 * 100%), transparent)",
              }}
            />
            <SignalDot style={{ top: "80%", left: "60%", animationDelay: "2.2s" }} />
            <SignalDot style={{ top: "20%", right: "12%", animationDelay: "0.3s" }} />
            <SignalDot
              style={{
                top: "55%",
                right: "8%",
                animationDelay: "3s",
                background:
                  "color-mix(in srgb, var(--color-success) calc(0.6 * 100%), transparent)",
              }}
            />
          </>
        )}

        {/* ══ LEFT PANEL ══════════════════════════════════════════════════ */}
        <div
          className="auth-left"
          style={{
            flex: "0 0 46%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem 4rem 4rem 5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "3.5rem",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background:
                  "color-mix(in srgb, var(--color-primary) calc(0.15 * 100%), transparent)",
                border:
                  "1px solid color-mix(in srgb, var(--color-primary) calc(0.3 * 100%), transparent)",
                display: "grid",
                placeItems: "center",
                color: "var(--color-primary)",
                boxShadow:
                  "0 0 20px -4px color-mix(in srgb, var(--color-primary) calc(0.4 * 100%), transparent)",
              }}
            >
              <Radar size={20} />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, var(--color-primary), var(--color-intent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Signal Scout
            </span>
          </Link>

          <h1
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "var(--color-foreground)",
              marginBottom: "1rem",
            }}
          >
            Revenue intelligence,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-intent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              automated.
            </span>
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "var(--color-muted-foreground)",
              lineHeight: 1.65,
              maxWidth: 380,
              marginBottom: "2.5rem",
            }}
          >
            Deploy autonomous agents that harvest signals from LinkedIn, Twitter, funding news and
            job boards — then surface the accounts ready to buy.
          </p>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 3rem 0",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {FEATURES.map(({ icon: Icon, label, color }) => (
              <li key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `${color}18`,
                    border: `1px solid ${color}30`,
                    display: "grid",
                    placeItems: "center",
                    color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={14} />
                </div>
                <span style={{ fontSize: 13.5, color: "var(--color-foreground)" }}>{label}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: 32 }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    background:
                      "linear-gradient(135deg, var(--color-primary), var(--color-intent))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: 11, color: "var(--color-muted-foreground)", marginTop: 2 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "3rem" }}>
            <Shield size={13} style={{ color: "var(--color-success)" }} />
            <span style={{ fontSize: 11.5, color: "var(--color-muted-foreground)" }}>
              SOC 2 ready · Firebase Auth · End-to-end encrypted
            </span>
          </div>
        </div>

        {/* ══ RIGHT PANEL ═════════════════════════════════════════════════ */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="auth-panel"
            style={{
              width: "100%",
              maxWidth: 440,
              borderRadius: 20,
              border: "1px solid oklch(0.3 0.03 260)",
              background: "color-mix(in srgb, var(--color-card) 88%, transparent)",
              backdropFilter: "blur(24px)",
              padding: "2.5rem",
              boxShadow:
                "0 0 60px -12px oklch(0.72 0.19 210 / 0.25), 0 32px 64px -24px oklch(0 0 0 / 0.5)",
            }}
          >
            {/* Tab switcher */}
            <div
              style={{
                display: "flex",
                background: "color-mix(in srgb, var(--color-background) 50%, transparent)",
                borderRadius: 10,
                padding: 4,
                marginBottom: "1.75rem",
                border: "1px solid var(--color-border)",
              }}
            >
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    resetForm();
                    setMode(m);
                  }}
                  disabled={anyLoading}
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    borderRadius: 7,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    transition: "all 0.25s ease",
                    background: mode === m ? "var(--color-primary)" : "transparent",
                    color:
                      mode === m
                        ? "var(--color-primary-foreground)"
                        : "var(--color-muted-foreground)",
                    boxShadow:
                      mode === m
                        ? "0 0 16px -4px color-mix(in srgb, var(--color-primary) calc(0.5 * 100%), transparent)"
                        : "none",
                    fontFamily: "inherit",
                  }}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            {/* Heading */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--color-foreground)",
                  margin: 0,
                }}
              >
                {mode === "signin" ? "Welcome back" : "Start for free"}
              </h2>
              <p style={{ fontSize: 13, color: "var(--color-muted-foreground)", marginTop: 4 }}>
                {mode === "signin"
                  ? "Access your mission control dashboard."
                  : "Deploy your first signal agent in 60 seconds."}
              </p>
            </div>

            {/* Google button */}
            <button
              id="google-signin-btn"
              className="auth-btn-google"
              type="button"
              onClick={handleGoogle}
              disabled={anyLoading}
              aria-label="Continue with Google"
            >
              {googleLoading ? <Spinner /> : <GoogleIcon />}
              {googleLoading ? "Connecting to Google…" : "Continue with Google"}
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "1.25rem 0" }}>
              <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
              <span
                style={{
                  fontSize: 11,
                  color: "var(--color-muted-foreground)",
                  letterSpacing: "0.08em",
                }}
              >
                OR
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
            </div>

            {/* Inline field error banner */}
            {fieldError && (
              <div
                role="alert"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  padding: "10px 12px",
                  borderRadius: 9,
                  background:
                    "color-mix(in srgb, var(--color-destructive) calc(0.12 * 100%), transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-destructive) calc(0.4 * 100%), transparent)",
                  marginBottom: 14,
                  animation: "shakeX 0.4s ease",
                }}
              >
                <AlertTriangle
                  size={14}
                  style={{ color: "oklch(0.75 0.22 25)", flexShrink: 0, marginTop: 1 }}
                />
                <span style={{ fontSize: 12.5, color: "oklch(0.85 0.06 25)", lineHeight: 1.5 }}>
                  {fieldError}
                </span>
              </div>
            )}

            {/* Form */}
            <form
              id="auth-form"
              onSubmit={handleSubmit}
              noValidate
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {/* Username — signup only */}
              {mode === "signup" && (
                <div className="field-slide">
                  <label
                    htmlFor="auth-username"
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "var(--color-muted-foreground)",
                      marginBottom: 5,
                      fontWeight: 500,
                    }}
                  >
                    Full name <span style={{ color: "var(--color-destructive)" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <Users
                      size={15}
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-muted-foreground)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      id="auth-username"
                      className={`auth-input${fieldError && !username.trim() ? " has-error" : ""}`}
                      type="text"
                      required
                      minLength={2}
                      maxLength={60}
                      placeholder="Jane Smith"
                      autoComplete="name"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setFieldError(null);
                      }}
                      disabled={anyLoading}
                      aria-required="true"
                      aria-describedby={fieldError ? "auth-field-error" : undefined}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="auth-email"
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "var(--color-muted-foreground)",
                    marginBottom: 5,
                    fontWeight: 500,
                  }}
                >
                  Work email <span style={{ color: "var(--color-destructive)" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--color-muted-foreground)",
                      pointerEvents: "none",
                    }}
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="auth-email"
                    className="auth-input"
                    type="email"
                    required
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFieldError(null);
                    }}
                    disabled={anyLoading}
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <label
                    htmlFor="auth-password"
                    style={{
                      fontSize: 12,
                      color: "var(--color-muted-foreground)",
                      fontWeight: 500,
                    }}
                  >
                    Password <span style={{ color: "var(--color-destructive)" }}>*</span>
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: 11.5,
                        color: "var(--color-primary)",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        padding: 0,
                      }}
                      onClick={() => {
                        void handlePasswordReset();
                      }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--color-muted-foreground)",
                      pointerEvents: "none",
                    }}
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="auth-password"
                    className="auth-input"
                    type={showPw ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder={mode === "signup" ? "Min 6 characters" : "••••••••••"}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldError(null);
                    }}
                    disabled={anyLoading}
                    aria-required="true"
                    style={{ paddingRight: 42 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--color-muted-foreground)",
                      display: "grid",
                      placeItems: "center",
                      padding: 4,
                    }}
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {/* Password strength bar */}
                {mode === "signup" && password.length > 0 && (
                  <div
                    style={{ display: "flex", gap: 4, marginTop: 6 }}
                    role="presentation"
                    aria-label="Password strength"
                  >
                    {[1, 2, 3, 4].map((n) => {
                      const strength =
                        password.length < 6
                          ? 1
                          : password.length < 8
                            ? 2
                            : password.length < 12
                              ? 3
                              : 4;
                      const active = n <= strength;
                      const color =
                        strength === 1
                          ? "#f87171"
                          : strength === 2
                            ? "#fbbf24"
                            : strength === 3
                              ? "#34d399"
                              : "#22d3ee";
                      return (
                        <div
                          key={n}
                          style={{
                            flex: 1,
                            height: 3,
                            borderRadius: 99,
                            background: active ? color : "var(--color-border)",
                            transition: "background 0.3s ease",
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                id="auth-submit-btn"
                type="submit"
                className="auth-btn-primary"
                disabled={anyLoading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <Spinner />
                    {mode === "signin" ? "Signing in…" : "Creating account…"}
                  </>
                ) : (
                  <>
                    {mode === "signin" ? "Access mission control" : "Deploy first agent"}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Switch mode */}
            <div style={{ marginTop: 18, textAlign: "center" }}>
              {mode === "signup" && (
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--color-muted-foreground)",
                    marginBottom: 10,
                    lineHeight: 1.5,
                  }}
                >
                  By creating an account you agree to our Terms of Service and Privacy Policy.
                </p>
              )}
              <button
                id="auth-switch-mode-btn"
                onClick={switchMode}
                disabled={anyLoading}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 12.5,
                  color: "var(--color-muted-foreground)",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--color-muted-foreground)";
                }}
              >
                {mode === "signin"
                  ? "Don't have an account? Create one →"
                  : "Already have an account? Sign in →"}
              </button>
            </div>

            {/* Trust badges */}
            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                justifyContent: "center",
                gap: 20,
              }}
            >
              {[
                { icon: CheckCircle2, label: "Firebase Auth" },
                { icon: Shield, label: "256-bit TLS" },
                { icon: TrendingUp, label: "99.9% uptime" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11,
                    color: "var(--color-muted-foreground)",
                  }}
                >
                  <Icon size={11} style={{ color: "var(--color-success)" }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
