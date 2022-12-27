import React, { ReactElement, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  Typography,
} from "@mui/material";
import { useAllSelector } from "../../hooks";
import { authStateSelector } from "../../../features/Auth/selectors";
import { HeaderLink } from "./HeaderLink";
import logo from "../../../assets/img/logo.svg";
import { authRoutes, unAuthRoutes } from "../../routes";
import { getRouteName } from "../../utils";
import { userStateSelector } from "../../../features/User/selectors";
import { lime } from "@mui/material/colors";
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

export const Header = () => {
  const { isAuth } = useAllSelector(authStateSelector);
  const user = useAllSelector(userStateSelector);

  const unAuthPages = getRouteName(unAuthRoutes);
  const authPages = getRouteName(authRoutes);

  const pageIcons: IPageIcons = {
    profile: <Person4 />,
    packs: <Inventory />,
    login: <Login />,
    register: <LockOpen />,
    logout: <Logout />,
  };

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const isMenuOpen = !!menuAnchor;

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            <Menu
              open={isMenuOpen}
              onClose={closeMenu}
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                "& .menu-text-icon": {
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                },
              }}
            >
              {isAuth ? (
                <div>
                  {authPages.map((page) => (
                    <HeaderLink page={page} key={page} icon={pageIcons[page]} />
                  ))}
                  <HeaderLink page={"logout"} icon={pageIcons["logout"]} />
                </div>
              ) : (
                unAuthPages.map((page) => (
                  <HeaderLink icon={pageIcons[page]} page={page} key={page} />
                ))
              )}
            </Menu>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
