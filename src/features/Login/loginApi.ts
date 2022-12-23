import { instance } from "../../common/api/baseAPI";
import { IUserFields } from "./loginThunks";
import { LoginUserType } from "../../common/api/types";
export interface IRecoveryRequest {
  email: string;
  from: string;
  message: string;
}
export interface ISetPWD {
  password: string;
  resetPasswordToken: string;
}
export const loginAPI = {
  login: (user: IUserFields) =>
    instance.post<LoginUserType>("auth/login", user),
  recoveryPassword: (email: IRecoveryRequest) =>
    instance.post<{ success: boolean }>(
      "https://neko-back.herokuapp.com/2.0/auth/forgot",
      email
    ),
  setNewPassword: (form: ISetPWD) =>
    instance.post<{ info: string }>(
      "https://neko-back.herokuapp.com/2.0/auth/set-new-password",
      form
    ),
  logout: () => {
    instance.delete("/auth/me", {});
  },
};
