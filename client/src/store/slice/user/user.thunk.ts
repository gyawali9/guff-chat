import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { httpClient } from "@/lib/Axios";
import type { IUser, SignInType, SignUpType } from "@/modules/auth/types";
import type {
  APIResponse,
  AuthResponseUserData,
  ErrorResponse,
} from "@/types/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const loginUser = (loginPayload: SignInType) =>
  httpClient.post<APIResponse<AuthResponseUserData<IUser>>>(
    API_ENDPOINTS.LOGIN,
    loginPayload
  );
const registerUser = (registerPayload: SignUpType) =>
  httpClient.post<APIResponse<AuthResponseUserData<IUser>>>(
    API_ENDPOINTS.REGISTER,
    registerPayload
  );
const logoutUser = () =>
  httpClient.post<APIResponse<APIResponse<[]>>>(API_ENDPOINTS.LOGOUT);

const getUserProfile = () =>
  httpClient.get<APIResponse<AuthResponseUserData<IUser>>>(
    API_ENDPOINTS.USER_PROFILE
  );

const getOtherUsersProfile = () =>
  httpClient.get<APIResponse<AuthResponseUserData<IUser[]>>>(
    API_ENDPOINTS.OTHER_USERS_PROFILE
  );

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (loginPayload: SignInType, { rejectWithValue }) => {
    try {
      const res = await loginUser(loginPayload);
      const data = res.data;
      if (data.success) {
        const { token } = data.data;
        if (token) {
          localStorage.setItem("token", token);
        }
        toast.success(data.message || "Login successful");

        return data;
      } else {
        return rejectWithValue({
          message: data.message || "Registration failed",
          status: res.status,
        });
      }
    } catch (err) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        const message = err.response?.data?.message || "Login failed";
        return rejectWithValue({ message, status: err.response?.status });
      }
      return rejectWithValue({ message: "Unexpected error" });
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (registerPayload: SignUpType, { rejectWithValue }) => {
    try {
      const res = await registerUser(registerPayload);
      const data = res.data;
      if (data.success) {
        const { token } = data.data;
        if (token) {
          localStorage.setItem("token", token);
        }
        toast.success(data.message || "Registration successful");

        return data;
      } else {
        return rejectWithValue({
          message: data.message || "Registration failed",
          status: res.status,
        });
      }
    } catch (err) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        const message = err.response?.data?.message || "Registration failed";
        return rejectWithValue({ message, status: err.response?.status });
      }
      return rejectWithValue({ message: "Unexpected error" });
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutUser();
      const data = res.data;
      if (data.success) {
        localStorage.removeItem("token");
        toast.success(data.message || "Registration successful");
        return data;
      } else {
        return rejectWithValue({
          message: data.message || "Registration failed",
          status: res.status,
        });
      }
    } catch (err) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        const message = err.response?.data?.message || "Logout failed";
        return rejectWithValue({ message, status: err.response?.status });
      }
      return rejectWithValue({ message: "Unexpected error" });
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserProfile();
      const data = res.data;
      if (data.success) {
        return data;
      } else {
        return rejectWithValue({
          message: data.message || "Failed to get user profile",
          status: res.status,
        });
      }
    } catch (err) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        const message =
          err.response?.data?.message || "Failed to get user profile";
        return rejectWithValue({ message, status: err.response?.status });
      }
      return rejectWithValue({ message: "Unexpected error" });
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getOtherUsersProfile();
      const data = res.data;
      if (data.success) {
        return data;
      } else {
        return rejectWithValue({
          message: data.message || "Failed to get other users profile",
          status: res.status,
        });
      }
    } catch (err) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        const message =
          err.response?.data?.message || "Failed to get other users profile";
        return rejectWithValue({ message, status: err.response?.status });
      }
      return rejectWithValue({ message: "Unexpected error" });
    }
  }
);
