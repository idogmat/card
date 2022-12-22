import { LoginUserType, ResponseType } from "../../common/api/types";
import { instance } from "../../common/api/api";
import {UserFieldsType} from "./loginThunks";

export const API = {
  login: (user: UserFieldsType) => instance.post<LoginUserType>("auth/login", user),
  recoveryPassword: (email: any) => instance.post<{ success: boolean }>('https://neko-back.herokuapp.com/2.0/auth/forgot', email),
  setNewPassword: (email: any) => instance.post<{ info: string }>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', email),
};
