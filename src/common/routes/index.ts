import { FC } from "react";
import { ErrorPage } from "../../features/404/404";
import { Login } from "../../features/Login/Login";
import { Profile } from "../../features/Profile/Profile";
import { Register } from "../../features/Register/Register";

export interface IRoute {
  path: string;
  component: FC;
}

export enum RoutesEnum {
  NOT_FINED = "/404",
  LOGIN = "/login",
  PROFILE = "/profile",
  RECOVERY = "/recovery",
  REGISTER = "/register",
}

export const authRoutes: IRoute[] = [
  {
    path: RoutesEnum.PROFILE,
    component: Profile,
  },
  {
    path: RoutesEnum.NOT_FINED,
    component: ErrorPage,
  },
];
export const unAuthRoutes: IRoute[] = [
  {
    path: RoutesEnum.NOT_FINED,
    component: ErrorPage,
  },
  {
    path: RoutesEnum.LOGIN,
    component: Login,
  },
  {
    path: RoutesEnum.REGISTER,
    component: Register,
  },
];
