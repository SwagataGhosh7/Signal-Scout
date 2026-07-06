import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AppNav } from "@/components/app-nav";
import { AiAssistant } from "@/components/ai-assistant";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // Use getSession() — reads from localStorage instantly, no network race.
    // getUser() makes a network round-trip and can return null before the
    // newly-created session propagates, causing a false redirect to /auth.
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    console.log("[RouteGuard] getSession result:", { session, error });
    console.log("[Debug Logs] === RouteGuard ===");
    console.log("[Debug Logs] Current URL in RouteGuard:", window.location.href);
    console.log("[Debug Logs] Current Session in RouteGuard:", session);
    console.log("[Debug Logs] Authenticated User in RouteGuard:", session?.user ?? null);
    console.log("[Debug Logs] ==================");

    if (error || !session) {
      console.warn("[RouteGuard] No valid session — redirecting to /auth");
      console.log("[Debug Logs] Navigation Result: redirecting to /auth");
      throw redirect({ to: "/auth" });
    }

    console.log("[RouteGuard] Session valid for user:", session.user.email);
    return { user: session.user };
  },
  component: Layout,
});

function Layout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      <AppNav />
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
      <AiAssistant />
    </div>
  );
}
