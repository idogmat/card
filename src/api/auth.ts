import axios from "axios";
import {UserType} from "../features/Login/loginReducer";


const baseUrl = 'http://localhost:7542/2.0/'

const instance = axios.create({
    withCredentials: true,
    baseURL: baseUrl,
});
type ResponseType<D>={
    data:D
}
type RegisterNewUserType = {
    addedUser: {
        _id: string
        email: string
        rememberMe: boolean
        name: string
        verified: boolean
        publicCardPacksCount: number
    }
}
type LoginUserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    token:string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;

}
export const API = {
    login: (user: UserType) => instance.post<ResponseType<LoginUserType>>('auth/login', user),
    register: (user: UserType) => instance.post<ResponseType<RegisterNewUserType>>('auth/register', user),
    authMe: () => instance.post<ResponseType<LoginUserType>>('/auth/me',{}),
    setNewPassword: () => instance.post<ResponseType<LoginUserType>>('/auth/me',{}),
}