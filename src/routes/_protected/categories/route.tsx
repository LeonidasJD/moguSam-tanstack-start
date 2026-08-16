import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
