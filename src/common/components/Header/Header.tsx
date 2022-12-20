import { NavLink } from "react-router-dom";
import React from "react";
import { routes } from "../../routes";

export const Header = () => {
  const activeClassName = "link-active";
  return (
    <div>
      {routes.map((route) => {
        return (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) => (isActive ? activeClassName : "")}
          >
            {route.component}
          </NavLink>
        );
      })}
    </div>
  );
};
