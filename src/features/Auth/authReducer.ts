import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../common/models";

export interface IAuthState {
  user: IUser;
  isAuth: boolean;
}

const initialState: IAuthState = {
  user: {} as IUser,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (draft, action: PayloadAction<{ isAuth: boolean }>) => {
      draft.isAuth = action.payload.isAuth;
    },
    setUser: (draft, action: PayloadAction<{ user: IUser }>) => {
      draft.user = action.payload.user;
    },
  },
});

export const authReducer = authSlice.reducer;
export const AuthAC = authSlice.actions;
