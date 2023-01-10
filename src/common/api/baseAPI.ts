import { ILoginUser } from "./types";
import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:7542/2.0/"
    : "https://neko-back.herokuapp.com/2.0/";

export const configuredAxios = axios.create({
  withCredentials: true,
  baseURL: baseURL,
});

const authMeRequest = () => {
  return configuredAxios.post<ILoginUser>("/auth/me", {});
};

export const baseAPI = {
  authMeRequest,
};
