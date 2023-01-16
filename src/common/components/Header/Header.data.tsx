import React, { ReactElement } from "react";
import {
  MdInventory,
  MdLockOpen,
  MdLogout,
  MdOutlineLogin,
  MdPersonOutline,
} from "react-icons/md";

interface IPageIcons {
  [key: string]: ReactElement;
}

export const pageIcons: IPageIcons = {
  profile: <MdPersonOutline />,
  packs: <MdInventory />,
  login: <MdOutlineLogin />,
  register: <MdLockOpen />,
  logout: <MdLogout />,
};
