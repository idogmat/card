import { instance } from "../../common/api/baseAPI";
import { IUserFields } from "./loginThunks";
import { LoginUserType } from "../../api/auth";

export const API = {
  login: (user: IUserFields) =>
    instance.post<LoginUserType>("auth/login", user),
  recoveryPassword: (email: any) =>
    instance.post<{ success: boolean }>(
      "https://neko-back.herokuapp.com/2.0/auth/forgot",
      email
    ),
  setNewPassword: (email: any) =>
    instance.post<{ info: string }>(
      "https://neko-back.herokuapp.com/2.0/auth/set-new-password",
      email
    ),
};
