/// <reference types="vite/client" />
import type { ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { Toast } from "@base-ui/react/toast";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles/app.css?url";

import Toaster from "@/shared/ui-components/toaster";
import { toastManager } from "@/shared/utils/toast";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className="font-sans bg-primary-bg" lang="sr">
      <head>
        <HeadContent />
      </head>
      <body>
        <Toast.Provider toastManager={toastManager}>
          {children}
          <Toaster />
          <Scripts />
        </Toast.Provider>
      </body>
    </html>
  );
}
