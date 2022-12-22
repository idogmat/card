import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const authReducer = authSlice.reducer;
export const AuthAC = authSlice.actions;
