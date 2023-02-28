import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../common/models";
import { authMeTC } from "features/Auth/authThunks";
import { loginTC, logOutTC } from "../Login/loginThunks";
import { updateUserInfoTC } from "./../Profile/profileThunks";

const initialState: IUser = {
  name: "",
  email: "",
  _id: "",
  avatar: null,
  created: new Date(),
  updated: new Date(),
  isAdmin: false,
  publicCardPacksCount: 0,
  verified: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (draft, action: PayloadAction<{ user: IUser }>) => {
      return action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        return action && (action.payload.user as IUser);
      })
      .addCase(logOutTC.fulfilled, (state, action) => {
        return {} as IUser;
      })
      .addCase(updateUserInfoTC.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(authMeTC.fulfilled, (state, action) => {
        return { ...action.payload };
      });
  },
});

export const userReducer = userSlice.reducer;
export const UserAC = userSlice.actions;
export const userInitialState = userSlice.getInitialState();
