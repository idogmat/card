import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logOutTC, loginTC } from "../Login/loginThunks";

import { AuthMeTC } from "./authThunks";

export interface IAuthState {
  isAuth: boolean;
}
const initialState: IAuthState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (draft, action: PayloadAction<{ isAuth: boolean }>) => {
      draft.isAuth = action.payload.isAuth;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        state.isAuth = true;
      })
      .addCase(logOutTC.fulfilled, (state, action) => {
        state.isAuth = false;
      })
      .addCase(AuthMeTC.fulfilled, (state, action) => {
        state.isAuth = true;
      });
  },
});

export const authReducer = authSlice.reducer;
export const AuthAC = authSlice.actions;
export const authInitialState = authSlice.getInitialState();
