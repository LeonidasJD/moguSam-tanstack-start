import axios, { isAxiosError } from "axios";
import { redirect } from "@tanstack/react-router";
import { ENV } from "./env";
import { getErrorMessage } from "@/shared/utils/error";
import { toast } from "@/shared/utils/toast";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

const jsonHeaders = { "Content-Type": "application/json" };

// Public API is used for public routes
export const publicApi = axios.create({
  baseURL: ENV.API_URL,
  headers: jsonHeaders,
});

// Private API is used for private routes which require user to be authenticated
export const privateApi = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  headers: jsonHeaders,
});

//function to get cookie header for server private api requests
const getCookieHeader = createIsomorphicFn()
  .server(() => getRequestHeader("cookie"))
  .client(() => undefined);

privateApi.interceptors.request.use(async (config) => {
  const cookie = getCookieHeader();
  if (cookie) {
    config.headers.Cookie = cookie;
  }

  return config;
});

privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      if (typeof window === "undefined") {
        throw redirect({ to: "/auth/login" });
      }
      toast.danger({
        description: getErrorMessage(error),
      });
      window.location.assign("/auth/login");
    }

    return Promise.reject(error);
  },
);
