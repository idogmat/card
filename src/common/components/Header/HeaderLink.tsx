import React, { FC, ReactElement } from "react";

import { MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./HeaderLink.module.css";

interface IHeaderLinkProps {
  icon?: ReactElement;
  page: string;
}

export const HeaderLink: FC<IHeaderLinkProps> = ({ page, icon }) => {
  const formattedPageName = page[0].toUpperCase() + page.slice(1);
  return (
    <MenuItem sx={{ justifyContent: "center" }}>
      <NavLink to={`/${page}`} className={styles.link}>
        {icon && icon}
        {formattedPageName}
      </NavLink>
    </MenuItem>
  );
};
