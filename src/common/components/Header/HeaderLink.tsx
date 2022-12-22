import React, { FC } from "react";
import { Button, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";

interface IHeaderLinkProps {
  page: string;
}

export const HeaderLink: FC<IHeaderLinkProps> = ({ page }) => {
  return (
    <ListItem disablePadding sx={{ justifyContent: "center" }}>
      <Button
        variant={"contained"}
        color={"primary"}
        sx={{
          borderRadius: "30px",
          padding: "10px 25px",
        }}
      >
        <NavLink to={`/${page}`} style={{ color: "inherit" }}>
          {page}
        </NavLink>
      </Button>
    </ListItem>
  );
};
