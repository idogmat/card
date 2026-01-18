import { ILoginUser } from "../../common/api/types";
import { IUserFields } from "./loginThunks";
import { configuredAxios } from "../../common/api/baseAPI";

export interface ISetPWD {
  password: string;
  resetPasswordToken: string;
}

export interface IRecoveryRequest {
  email: string;
  from: string;
  message: string;
}
export interface ISetPWD {
  password: string;
  resetPasswordToken: string;
}

const login = async (user: IUserFields) => {
  // console.log('ok')
  // const res = await fetch('http://localhost:3000/')
  // console.log(res)
  // const result = await configuredAxios.get<any>("/");
  // console.log(result)
  return configuredAxios.post<ILoginUser>("auth/login", { email: user.email, password: user.password });
};

const recoveryPassword = (requestData: IRecoveryRequest) => {
  return configuredAxios.post<{ success: boolean }>(
    "https://neko-back.herokuapp.com/2.0/auth/forgot",
    requestData
  );
};

const setNewPassword = (form: ISetPWD) => {
  return configuredAxios.post<{ info: string }>(
    "https://neko-back.herokuapp.com/2.0/auth/set-new-password",
    form
  );
};

const logout = () => {
  return configuredAxios.delete("/auth/me", {});
};

export const loginAPI = {
  login,
  recoveryPassword,
  setNewPassword,
  logout,
};
