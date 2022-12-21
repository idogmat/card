import axios from "axios";
import {LoginUserType,ResponseType} from "./types";

const baseUrl = 'http://localhost:7542/2.0/'
export const instance = axios.create({
    withCredentials: true,
    baseURL: baseUrl,
});
export const API = {
    authMe: () => instance.post<ResponseType<LoginUserType>>('/auth/me',{}),
}