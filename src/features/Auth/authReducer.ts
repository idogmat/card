import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginTC } from "../Login/loginThunks";
import { registerTC } from "../Register/registerThunks";

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
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isAuth = true;
    });
  },
});

export const authReducer = authSlice.reducer;
export const AuthAC = authSlice.actions;
