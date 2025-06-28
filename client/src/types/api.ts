import type { InternalAxiosRequestConfig } from "axios";

interface APIResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

interface AuthResponseUserData<T> {
  user: T;
  token?: string;
}

interface ApiErrorDetail {
  field?: string;
  message: string;
}

interface ErrorResponse extends APIResponse<null> {
  errors?: ApiErrorDetail[];
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export type {
  APIResponse,
  AuthResponseUserData,
  ErrorResponse,
  CustomAxiosRequestConfig,
};
