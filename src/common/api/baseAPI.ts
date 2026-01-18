import { ILoginUser } from "./types";
import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1"
    : "https://neko-back.herokuapp.com/2.0/";

export const configuredAxios = axios.create({
  withCredentials: true, // не безопасно и на беке должно быть app.use(cors({origin:true,credentials: true}))
  baseURL: baseURL,
});

const authMeRequest = () => {
  return configuredAxios.get<ILoginUser>("/auth/me", {});
};

export const baseAPI = {
  authMeRequest,
};
