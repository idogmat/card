import axios from "axios";

const baseUrl = "http://localhost:7542/2.0/";

const instance = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

export interface IRegisterData {
  email: string;
  password: string;
}

export type ResponseType<D> = {
  data: D;
};
export type RegisterNewUserType = {
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
export type LoginUserType = {
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
  authMe: () => instance.post<ResponseType<LoginUserType>>("/auth/me", {}),
};
