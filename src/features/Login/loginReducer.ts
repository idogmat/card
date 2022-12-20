import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  reducers: {},
  initialState: [],
});

export const loginReducer = loginSlice.reducer;
export const LoginAC = loginSlice.actions;
