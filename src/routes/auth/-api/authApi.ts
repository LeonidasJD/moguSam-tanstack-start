import { privateApi, publicApi } from "@/configuration/axios";
import { queryOptions, useMutation } from "@tanstack/react-query";
import {
  CreateAccountSchema,
  ForgotPasswordSchema,
  LoginSchema,
  meSchema,
  ResetPasswordSchema,
} from "../-types/authTypes";
import { toast } from "@/shared/utils/toast";

export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateAccountSchema) => {
      const response = await publicApi.post("/api/users", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success({
        description: "Nalog je uspešno kreiran",
      });
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await publicApi.post("/api/auth/login", data, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success({
        description: "Uspešno ste se prijavili",
      });
    },
  });
};

export const meQuery = () =>
  queryOptions({
    queryKey: ["me"],
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: "always",
    queryFn: async () => {
      const response = await privateApi.get("/api/auth/me");
      return meSchema.parse(response.data);
    },
  });

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordSchema) => {
      const response = await publicApi.post("/api/auth/forgot-password", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success({
        description: "Email za resetovanje lozinke je poslat",
      });
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordSchema) => {
      const response = await publicApi.post("/api/auth/reset-password", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success({
        description: "Lozinka je uspešno resetovana",
      });
    },
  });
};
