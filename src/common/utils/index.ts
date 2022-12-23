import { IRoute } from "../routes";

export const getRouteName = (routes: IRoute[]) => {
  return routes
    .filter((route) => route.isPage)
    .map((route) => route.path.slice(1));
};
