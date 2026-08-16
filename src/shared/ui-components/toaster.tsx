import { Toast } from "@base-ui/react/toast";
import { Check, X } from "lucide-react";

import { tv } from "@/shared/utils/cn";
import type { ToastVariant } from "@/shared/utils/toast";

const toastVariants = tv({
  slots: {
    viewport:
      "fixed top-4 left-1/2 z-[1100] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2 pointer-events-none outline-none",
    root: "pointer-events-auto relative z-[calc(1000-var(--toast-index))] w-full max-w-sm rounded-xl border bg-white shadow-[0px_8px_24px_rgba(0,0,0,0.12)] transition-[opacity,transform] duration-300 select-none data-starting-style:-translate-y-4 data-starting-style:opacity-0 data-ending-style:-translate-y-4 data-ending-style:opacity-0 data-limited:opacity-0",
    content: "flex items-start gap-3 p-4",
    icon: "mt-0.5 size-5 shrink-0",
    text: "flex min-w-0 flex-1 flex-col gap-1",
    title: "text-sm font-semibold leading-5",
    description: "text-sm leading-5",
    close:
      "shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2",
  },
  variants: {
    variant: {
      success: {
        root: "border-green text-green",
        icon: "text-green",
        close: "text-green focus-visible:ring-green",
      },
      danger: {
        root: "border-error text-error",
        icon: "text-error",
        close: "text-error focus-visible:ring-error",
      },
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

const statusIcons = {
  success: Check,
  danger: X,
} as const;

const resolveVariant = (type: string | undefined): ToastVariant =>
  type === "danger" ? "danger" : "success";

const Toaster = () => {
  const { toasts } = Toast.useToastManager();
  const { viewport } = toastVariants();

  return (
    <Toast.Portal>
      <Toast.Viewport className={viewport()}>
        {toasts.map((toast) => {
          const variant = resolveVariant(toast.type);
          const { root, content, icon, text, title, description, close } =
            toastVariants({ variant });
          const StatusIcon = statusIcons[variant];

          return (
            <Toast.Root
              key={toast.id}
              toast={toast}
              swipeDirection="right"
              className={root()}
            >
              <Toast.Content className={content()}>
                <StatusIcon className={icon()} aria-hidden />
                <div className={text()}>
                  {toast.title ? <Toast.Title className={title()} /> : null}
                  <Toast.Description className={description()} />
                </div>
                <Toast.Close className={close()} aria-label="Zatvori">
                  <X className="size-4" aria-hidden />
                </Toast.Close>
              </Toast.Content>
            </Toast.Root>
          );
        })}
      </Toast.Viewport>
    </Toast.Portal>
  );
};

export default Toaster;
