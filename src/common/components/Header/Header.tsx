import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,

  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { authRoutes, unAuthRoutes } from "../../routes";

import { HeaderLink } from "./HeaderLink";
import { authStateSelector } from "../../../features/Auth/selectors";
import { getRouteName } from "../../utils";
import { lime } from "@mui/material/colors";
import logo from "../../../assets/img/logo.svg";
import { pageIcons } from "./Header.data";
import { useAllSelector } from "../../hooks";
import { userStateSelector } from "../../../features/User/selectors";
import NavMenu from "../../ui-kit/NavMenu";
import Menu from "../../ui-kit/Menu";

export const Header = React.memo(() => {
  const { isAuth } = useAllSelector(authStateSelector);
  const user = useAllSelector(userStateSelector);

  const unAuthPages = getRouteName(unAuthRoutes);
  const authPages = getRouteName(authRoutes);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const isMenuOpen = !!menuAnchor;

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <AppBar
      position={"absolute"}
      sx={{
        top: "0",
        left: "0",
        backgroundColor: "white",
        boxShadow:
          " 0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
        padding: "10px 0px",
        zIndex: "50",
      }}
    >
      <Container maxWidth={"xl"}>
        <Box
          display={"flex"}
          sx={{
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            ["@media (max-width: 768px)"]: {
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <img src={logo} alt="IT-Incubator" />

          <Box sx={{ position:"relative", display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              onClick={openMenu}
              sx={{
                color: "#000",
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Typography>{user.name}</Typography>
              <Avatar
                sx={{ bgcolor: lime[600] }}
                alt={user.name}
                src={user.avatar ? user.avatar : undefined}
              >
                {/*{user.name[0]}*/}
              </Avatar>
            </Button>
            {/*<Menu*/}
            {/*  open={isMenuOpen}*/}
            {/*  onClose={closeMenu}*/}
            {/*  anchorEl={menuAnchor}*/}

            {/*>*/}
            <Menu open={isMenuOpen} close={closeMenu}>
              {isAuth ? (
                  <NavMenu isAuth={isAuth} authPages={authPages}></NavMenu>
              ) :(
                  <NavMenu isAuth={isAuth} authPages={unAuthPages}></NavMenu>
              )}
            </Menu>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
});
