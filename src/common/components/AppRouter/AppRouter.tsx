import {Route, Routes} from "react-router-dom";
import React from "react";
import {routes} from "../../routes";

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        );
      })}
    </Routes>
  );
};
