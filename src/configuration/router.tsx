import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import PendingComponent from "@/shared/ui-components/loader-components/pendingComponent";
import NotFoundComponent from "@/shared/ui-components/error-components/notFoundComponent";
import { QueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/shared/utils/error";
import { isAxiosError } from "axios";

import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { toast } from "@/shared/utils/toast";
import ErrorComponent from "@/shared/ui-components/error-components/errorComponent";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 30000, // 30 seconds
      },
      mutations: {
        onError: (error) => {
          if (isAxiosError(error)) {
            // if error is not axios error, show toast
            toast.danger({
              description: getErrorMessage(error),
            });
          }
        },
        throwOnError: (error) => !isAxiosError(error), // if error is not axios error, throw error and show error boundary
      },
    },
  });
}

export function getRouter() {
  const queryClient = createQueryClient();

  const router = createRouter({
    routeTree,
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    defaultViewTransition: true,
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: NotFoundComponent,
    defaultPendingComponent: PendingComponent,
    context: {
      queryClient,
    },
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
