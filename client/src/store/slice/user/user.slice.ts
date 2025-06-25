import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user.thunk";

export interface UserState {
  isAuthenticated: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, () => {
      console.log("poending");
    });
    builder.addCase(loginUserThunk.fulfilled, () => {
      console.log("fulfilled");
    });
    builder.addCase(loginUserThunk.rejected, () => {
      console.log("rejected");
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
