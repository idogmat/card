import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUpdatedUserInfo } from "../Profile/profileAPI";
import { IUser } from "../../common/models";
import { loginTC } from "../Login/loginThunks";
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
    updateUser: (draft, action: PayloadAction<{ model: IUpdatedUserInfo }>) => {
      draft.name = action.payload.model.name;
      draft.avatar = action.payload.model.avatar;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      return action.payload.user;
    });
    builder.addCase(updateUserInfoTC.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
export const UserAC = userSlice.actions;
