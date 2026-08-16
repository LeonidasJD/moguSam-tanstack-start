import { Toast } from "@base-ui/react/toast";

export type ToastVariant = "success" | "danger";

export type ShowToastOptions = {
  description: string;
  title?: string;
  timeout?: number;
};

export const toastManager = Toast.createToastManager();

const showToast = (type: ToastVariant, options: ShowToastOptions) => {
  return toastManager.add({
    type,
    description: options.description,
    ...(options.title !== undefined ? { title: options.title } : {}),
    ...(options.timeout !== undefined ? { timeout: options.timeout } : {}),
    ...(type === "danger" ? { priority: "high" as const } : {}),
  });
};

export const toast = {
  success: (options: ShowToastOptions) => showToast("success", options),
  danger: (options: ShowToastOptions) => showToast("danger", options),
};
