import React, { FC } from "react";
import { Button, ListItem } from "@mui/material";

interface IHeaderLinkProps {
  page: string;
}

export const HeaderLink: FC<IHeaderLinkProps> = ({ page }) => {
  return (
    <ListItem disablePadding>
      <Button
        href={`/${page}`}
        variant={"contained"}
        color={"primary"}
        sx={{
          borderRadius: "30px",
          padding: "10px 25px",
        }}
      >
        {page}
      </Button>
    </ListItem>
  );
};
