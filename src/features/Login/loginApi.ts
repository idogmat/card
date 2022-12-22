import { LoginUserType, ResponseType } from "../../common/api/types";
import { instance } from "../../common/api/api";
import {UserFieldsType} from "./loginThunks";

export const API = {
  login: (user: UserFieldsType) =>
    instance.post<ResponseType<LoginUserType>>("auth/login", user),
  setNewPassword: () =>
    instance.post<ResponseType<LoginUserType>>("/auth/me", {}),
};
