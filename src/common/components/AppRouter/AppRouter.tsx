import { Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useAllSelector, useAppDispatch } from "../../hooks/hooks";
import { authSelector } from "../../../features/Auth/selectors";
import { authRoutes, RoutesEnum, unAuthRoutes } from "../../routes";
import { appStateSelect } from "../../../app/selectors";
import { Preloader } from "../Preloader/Preloader";
import { InitAppTC } from "../../../app/appThunks";

export const AppRouter = () => {
  const { isAuth } = useAllSelector(authSelector);

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
          <Route path={"/*"} element={<Navigate to={RoutesEnum.PROFILE} />} />
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
