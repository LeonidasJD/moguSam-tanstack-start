import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { meQuery } from "../auth/-api/authApi";
import { isAxiosError } from "axios";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.ensureQueryData(meQuery());
      return { user };
    } catch (error) {
      if (isAxiosError(error)) {
        // if error is axios error, show error message
        context.queryClient.clear();
        redirect({ to: "/auth/login" });
      }
      throw error; // if error is anything else throw error and show error boundary
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
