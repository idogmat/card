import axios from "axios";
import { LoginUserType } from "./types";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:7542/2.0/"
    : "https://neko-back.herokuapp.com/2.0/";
export const instance = axios.create({
  withCredentials: true,
  baseURL: baseURL,
});

const authMeRequest = () => {
  return instance.post<LoginUserType>("/auth/me", {});
};

export const baseAPI = {
  authMeRequest,
};
