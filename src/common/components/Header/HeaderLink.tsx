import React, { FC, ReactElement } from "react";

import { DropdownItem } from "common/ui-kit/Dropdown/Dropdown";
import { NavLink } from "react-router-dom";
import styles from "./HeaderLink.module.css";

interface IHeaderLinkProps {
  icon?: ReactElement;
  page: string;
}

export const HeaderLink: FC<IHeaderLinkProps> = ({ page, icon }) => {
  const formattedPageName = page[0].toUpperCase() + page.slice(1);
  return (
    <DropdownItem>
      <NavLink to={`/${page}`} className={styles.link}>
        {icon && icon}
        {formattedPageName}
      </NavLink>
    </DropdownItem>
  );
};
