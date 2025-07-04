import type { CustomAxiosRequestConfig, ErrorResponse } from "@/types/api";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// Define backend URL based on environment
const backendUrl =
  import.meta.env.MODE !== "development"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:5001/api/v1";

//  Axios instance
export const httpClient = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// Centralized logout utility
const logoutAndRedirect = () => {
  localStorage.removeItem("token");
  toast.error("Session expired. Please log in again.");
  window.location.href = "/login";
};

// Axios interceptor to attach token
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh & global errors
httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const apiError = error.response?.data;

    const isAccessTokenExpired =
      error.response?.status === 401 && apiError?.message === "jwt expired";

    //  Handle expired access token by attempting refresh
    if (isAccessTokenExpired && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await httpClient.get(
          `${backendUrl}/auth/refresh-token`,
          { withCredentials: true }
        );

        const newToken = refreshResponse.data.data.token;
        localStorage.setItem("token", newToken);

        if (originalRequest && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        // Retry original request with new token
        return httpClient(originalRequest);
      } catch (refreshError) {
        logoutAndRedirect();
        return Promise.reject(refreshError);
      }
    }

    // Other unauthorized cases
    // Handle all other unauthorized errors
    if (error.response?.status === 401) {
      logoutAndRedirect();
    }

    // ✅ Global error logging
    if (apiError?.message) {
      console.error("API Error:", apiError.message);
    }

    return Promise.reject(error); // rethrow for per-request handling in thunks
  }
);
