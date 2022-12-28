import React, { ReactElement } from "react";
import {
  Inventory,
  LockOpen,
  Login,
  Logout,
  Person4,
} from "@mui/icons-material";

interface IPageIcons {
  [key: string]: ReactElement;
}

export const pageIcons: IPageIcons = {
  profile: <Person4 />,
  packs: <Inventory />,
  login: <Login />,
  register: <LockOpen />,
  logout: <Logout />,
};
