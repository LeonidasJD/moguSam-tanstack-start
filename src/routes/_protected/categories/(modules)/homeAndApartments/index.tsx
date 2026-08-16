import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/categories/(modules)/homeAndApartments/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>Hello "/_protected/categories/(modules)/homeAndApartments/"!</div>
  );
}
