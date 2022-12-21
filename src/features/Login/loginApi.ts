<<<<<<< HEAD
import {LoginUserType, ResponseType, UserType} from "../../common/api/types";
=======
import {LoginUserType, ResponseType} from "../../common/api/types";
import {UserType} from "./loginReducer";
>>>>>>> c95183a (auth)
import {instance} from "../../common/api/api";

export const API = {
    login: (user: UserType) => instance.post<ResponseType<LoginUserType>>('auth/login', user),
    setNewPassword: () => instance.post<ResponseType<LoginUserType>>('/auth/me',{}),
}