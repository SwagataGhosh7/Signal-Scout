import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { auth } from "@/lib/firebase";
import { AppNav } from "@/components/app-nav";
import { AiAssistant } from "@/components/ai-assistant";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const user = auth.currentUser ?? (await auth.authStateReady(), auth.currentUser);

    if (!user) {
      console.warn("[RouteGuard] No valid Firebase user — redirecting to /auth");
      throw redirect({ to: "/auth" });
    }

    return { user };
  },
  component: Layout,
});

import { ScrollToTop } from "@/components/scroll-to-top";

function Layout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground relative">
      <AppNav />
      <main
        className="flex-1 overflow-y-auto px-2 py-3 md:px-5 md:py-6 relative"
        id="main-scroll-area"
      >
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
      <AiAssistant />
      <ScrollToTop />
    </div>
  );
}
