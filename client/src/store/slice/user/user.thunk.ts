import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUserThunk = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    console.log("hello");
  }
);
