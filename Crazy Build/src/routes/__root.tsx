import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, Suspense, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Signal lost</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for isn't in our feed.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Return to base
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Transmission interrupted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing the feed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Signal Scout — Agentic AI Workflow System" },
      {
        name: "description",
        content:
          "Signal Scout deploys autonomous agents to harvest buying, hiring, funding, and creator signals in real-time to automate B2B outreach.",
      },
      { property: "og:title", content: "Signal Scout — Agentic AI Workflow System" },
      {
        property: "og:description",
        content: "AI signal harvesting for sales & growth teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { CommandPalette } from "../components/command-palette";
import { AuthProvider } from "@/lib/auth";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const routerState = router.state;

  useEffect(() => {
    const checkStartupAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('[Root] startup session check:', session ?? null);

      // Debugging logs on application startup
      console.log("[Debug Logs] === Startup ===");
      console.log("[Debug Logs] Current URL on startup:", window.location.href);
      console.log("[Debug Logs] Current Session on startup:", session);
      console.log("[Debug Logs] Authenticated User on startup:", session?.user ?? null);
      console.log("[Debug Logs] Router State on startup:", routerState);
      console.log("[Debug Logs] ===============");

      if (session) {
        console.log('[Root] Redirecting to /app immediately on startup...');
        router.navigate({ to: "/app", replace: true })
          .then((res) => console.log("[Root] Startup redirect Navigation Result: success", res))
          .catch((err) => console.error("[Root] Startup redirect Navigation Result: failed", err));
      }
    };
    checkStartupAuth();
  }, []);

  // Debugging logs when router state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("[Debug Logs] Router State Changed");
      console.log("[Debug Logs] Current URL:", window.location.href);
      console.log("[Debug Logs] Current Session:", session);
      console.log("[Debug Logs] Authenticated User:", session?.user ?? null);
      console.log("[Debug Logs] Router State:", routerState);
    });
  }, [routerState]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={
          <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
        <Toaster theme="dark" position="top-right" richColors />
        <CommandPalette />
      </AuthProvider>
    </QueryClientProvider>
  );
}
