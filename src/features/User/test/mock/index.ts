import { ILoginUser } from "common/api/types";
import { IUser } from "common/models";
import { IUserFields } from "features/Login/loginThunks";

export const mockUpdateUserFields = {
  name: "name placeholder",
  avatar: "avatar placeholder",
};

export const mockNewUser: IUser = {
  name: "Eddie",
  email: "eddie@gmail.com",
  _id: "2",
  avatar: null,
  created: new Date(),
  updated: new Date(),
  isAdmin: true,
  publicCardPacksCount: 23,
  verified: true,
};

export const mockUpdatedUser: IUser = {
  name: "name placeholder",
  email: "eddie@gmail.com",
  _id: "2",
  avatar: "avatar placeholder",
  created: new Date(),
  updated: new Date(),
  isAdmin: false,
  publicCardPacksCount: 23,
  verified: true,
};

export const mockUserFields: IUserFields = {
  email: "eddie@gmail.com",
  password: "111111111",
  rememberMe: true,
};

export const mockAuthMeUser: ILoginUser = {
  _id: "",
  email: "",
  name: "",
  isAdmin: true,
  avatar: null,
  publicCardPacksCount: 1,
  verified: false,
  created: new Date(),
  updated: new Date(),
  token: "",
  rememberMe: true,
  error: null,
};
