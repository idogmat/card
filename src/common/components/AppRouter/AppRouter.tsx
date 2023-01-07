import { Navigate, Route, Routes } from "react-router-dom";
import { RoutesEnum, authRoutes, unAuthRoutes } from "../../routes";

import { authStateSelector } from "../../../features/Auth/selectors";
import { useAllSelector } from "../../hooks";

export const AppRouter = () => {
  const { isAuth } = useAllSelector(authStateSelector);

  return (
    <Routes>
      {isAuth ? (
        <>
          {authRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path={"/*"} element={<Navigate to={RoutesEnum.PACKS} />} />
        </>
      ) : (
        <>
          {unAuthRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
          <Route path={"/*"} element={<Navigate to={RoutesEnum.REGISTER} />} />
        </>
      )}
    </Routes>
  );
};
