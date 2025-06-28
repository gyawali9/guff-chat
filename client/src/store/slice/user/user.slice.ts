import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./user.thunk";
import toast from "react-hot-toast";
import type { IUser } from "@/modules/auth/types";

interface AuthState {
  authUser: IUser | null;
  otherUsers: IUser | null;
  token: string | null;
  buttonLoading: boolean;
  screenLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  authUser: null,
  otherUsers: null,
  token: localStorage.getItem("token"),
  buttonLoading: false,
  screenLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
      state.error = null;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.authUser = action.payload.data.user ?? null;
      state.token = action.payload.data.token ?? null;
    });
    builder.addCase(
      loginUserThunk.rejected,
      (
        // _state: UserState,
        // action: ReturnType<typeof loginUserThunk.rejected>
        state,
        action
      ) => {
        state.buttonLoading = false;
        state.authUser = null;
        state.token = null;

        const errorMessage =
          (action.payload as { message?: string })?.message || "Login faileddd";
        state.error = errorMessage;

        toast.error(errorMessage);
      }
    );

    // registration
    builder.addCase(registerUserThunk.pending, (state) => {
      state.buttonLoading = true;
      state.error = null;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.authUser = action.payload.data.user ?? null;
      state.token = action.payload.data.token ?? null;
    });
    builder.addCase(
      registerUserThunk.rejected,
      (
        // _state: UserState,
        // action: ReturnType<typeof loginUserThunk.rejected>
        state,
        action
      ) => {
        state.buttonLoading = false;
        state.authUser = null;
        state.token = null;

        const errorMessage =
          (action.payload as { message?: string })?.message ||
          "Registration faileddd";
        state.error = errorMessage;

        toast.error(errorMessage);
      }
    );

    // logout
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.buttonLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.buttonLoading = false;
      state.authUser = null;
      state.token = null;
    });
    builder.addCase(
      logoutUserThunk.rejected,
      (
        // _state: UserState,
        // action: ReturnType<typeof loginUserThunk.rejected>
        state,
        action
      ) => {
        state.buttonLoading = false;
        state.authUser = null;
        state.token = null;

        const errorMessage =
          (action.payload as { message?: string })?.message ||
          "Registration faileddd";
        state.error = errorMessage;

        toast.error(errorMessage);
      }
    );

    // get user profile
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload.data.user;
      state.error = null;
    });
    builder.addCase(
      getUserProfileThunk.rejected,
      (
        // _state: UserState,
        // action: ReturnType<typeof loginUserThunk.rejected>
        state,
        action
      ) => {
        state.screenLoading = false;

        const errorMessage =
          (action.payload as { message?: string })?.message ||
          "Registration faileddd";
        state.error = errorMessage;

        toast.error(errorMessage);
      }
    );

    // other users profile
    builder.addCase(getOtherUsersThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload.data.user;
      state.error = null;
    });
    builder.addCase(
      getOtherUsersThunk.rejected,
      (
        // _state: UserState,
        // action: ReturnType<typeof loginUserThunk.rejected>
        state,
        action
      ) => {
        state.screenLoading = false;

        const errorMessage =
          (action.payload as { message?: string })?.message ||
          "Registration faileddd";
        state.error = errorMessage;

        toast.error(errorMessage);
      }
    );
  },
});

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions;

export default userSlice.reducer;
