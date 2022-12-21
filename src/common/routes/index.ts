import {ErrorPage} from "../../features/404/404";
import {Login} from "../../features/Login/Login";
import {Profile} from "../../features/Profile/Profile";
import {Register} from "../../features/Register/Register";


export interface IRoute {
    path: string;
    component: React.FC;
}

export enum RoutesEnum {
    NOT_FINED = "*",
    LOGIN = "/login",
    PROFILE = "/profile",
    RECOVERY = "/recovery",
    REGISTER = "/register",
}

export const routes: IRoute[] = [
    {
        path: RoutesEnum.NOT_FINED,
        component: ErrorPage,
    },
    {
        path: RoutesEnum.LOGIN,
        component: Login,
    },
    {
        path: RoutesEnum.PROFILE,
        component: Profile,
    },
    {
        path: RoutesEnum.REGISTER,
        component: Register,
    },
];
