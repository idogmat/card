import { Cards } from "../../features/Cards/Cards";
import { ErrorPage } from "../../features/404/404";
import { FC } from "react";
import { Learn } from "./../../features/Learn/Learn";
import { Login } from "../../features/Login/Login";
import Packs from "../../features/Packs/Packs";
import { Profile } from "../../features/Profile/Profile";
import RecoveryPassword from "../../features/Recovery/RecoveryPassword";
import { Register } from "../../features/Register/Register";
import SetNewPassword from "../../features/Recovery/SetNewPassword";

export interface IRoute {
  path: string;
  component: FC;
  isPage: boolean;
}

export enum RoutesEnum {
  NOT_FINED = "/404",
  LOGIN = "/login",
  PROFILE = "/profile",
  RECOVERY = "/recovery",
  RECOVERY_ID = "/recovery/:id",
  REGISTER = "/register",
  PACKS = "/packs",
  CARDS = "/packs/:packID",
  LEARN = "/learn/:packID",
}

export const authRoutes: IRoute[] = [
  {
    path: RoutesEnum.PROFILE,
    component: Profile,
    isPage: true,
  },
  {
    path: RoutesEnum.PACKS,
    component: Packs,
    isPage: true,
  },
  {
    path: RoutesEnum.NOT_FINED,
    component: ErrorPage,
    isPage: false,
  },
  {
    path: RoutesEnum.CARDS,
    component: Cards,
    isPage: false,
  },
  {
    path: RoutesEnum.LEARN,
    component: Learn,
    isPage: false,
  },
];

export const unAuthRoutes: IRoute[] = [
  {
    path: RoutesEnum.NOT_FINED,
    component: ErrorPage,
    isPage: false,
  },
  {
    path: RoutesEnum.LOGIN,
    component: Login,
    isPage: true,
  },
  {
    path: RoutesEnum.REGISTER,
    component: Register,
    isPage: true,
  },
  {
    path: RoutesEnum.RECOVERY,
    component: RecoveryPassword,
    isPage: false,
  },
  {
    path: RoutesEnum.RECOVERY_ID,
    component: SetNewPassword,
    isPage: false,
  },
];
