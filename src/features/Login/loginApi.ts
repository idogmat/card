import { LoginUserType, ResponseType } from "../../common/api/types";
import { instance } from "../../common/api/baseAPI";
import { IUserFields } from "./loginThunks";

export const API = {
  login: (user: IUserFields) =>
    instance.post<ResponseType<LoginUserType>>("auth/login", user),
  setNewPassword: () =>
    instance.post<ResponseType<LoginUserType>>("/auth/me", {}),
};
