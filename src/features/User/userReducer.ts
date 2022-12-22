import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../common/models";
import { IUpdatedUserInfo } from "../Profile/profileAPI";

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
});

export const userReducer = userSlice.reducer;
export const UserAC = userSlice.actions;
