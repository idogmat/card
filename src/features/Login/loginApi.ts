import { instance } from "../../common/api/baseAPI";
import { IUserFields } from "./loginThunks";
import { LoginUserType } from "../../common/api/types";
import { ISetPWD } from "./setNewPasswordThunk";

type EmailType = `${string}@${string}.${string}`;

export interface IRecoveryRequest {
  email: string;
  from: string;
  message: string;
}

const login = (user: IUserFields) => {
  return instance.post<LoginUserType>("auth/login", user);
};

const recoveryPassword = (requestData: IRecoveryRequest) => {
  return instance.post<{ success: boolean }>(
    "https://neko-back.herokuapp.com/2.0/auth/forgot",
    requestData
  );
};

const setNewPassword = (form: ISetPWD) => {
  return instance.post<{ info: string }>(
    "https://neko-back.herokuapp.com/2.0/auth/set-new-password",
    form
  );
};

const logout = () => {
  return instance.delete("/auth/me", {});
};

export const loginAPI = {
  login,
  recoveryPassword,
  setNewPassword: (form: ISetPWD) =>
    instance.post<{ info: string }>(
      "https://neko-back.herokuapp.com/2.0/auth/set-new-password",
      form
    ),
  logout,
};
