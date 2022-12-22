import axios from "axios";
import { IUser } from "../common/models";

const baseUrl = "http://localhost:7542/2.0/";

const instance = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

export interface IRegisterData {
  email: string;
  password: string;
}

type ResponseType<D> = {
  data: D;
};
type RegisterNewUserType = {
  addedUser: {
    _id: string;
    email: string;
    rememberMe: boolean;
    name: string;
    verified: boolean;
    isAdmin: boolean;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
  };
};
type LoginUserType = {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  avatar: string | null;
  publicCardPacksCount: number;
  verified: boolean;
  created: Date;
  updated: Date;
  token: string;
  rememberMe: boolean;
  error: string | null;
};
export const API = {
  login: (user: any) => instance.post<LoginUserType>("auth/login", user),
  register: (user: any) =>
    instance.post<ResponseType<RegisterNewUserType>>("auth/register", user),
  authMe: () => instance.post<ResponseType<LoginUserType>>("/auth/me", {}),
  setNewPassword: () =>
    instance.post<ResponseType<LoginUserType>>("/auth/me", {}),
};
