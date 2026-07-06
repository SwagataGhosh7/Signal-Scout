import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ParallaxField } from "@/components/depth-system";
import { TalentNav } from "@/components/talent/talent-nav";

export const Route = createFileRoute("/_authenticated/talent")({
  component: TalentLayout,
});

function TalentLayout() {
  return (
    <ParallaxField className="space-y-5">
      <TalentNav />
      <Outlet />
    </ParallaxField>
  );
}
