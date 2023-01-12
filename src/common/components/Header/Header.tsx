import { Button, Menu } from "@mui/material";
import { HeaderContainer, HeaderWrapper } from "./HeaderStyles";
import React, { useState } from "react";
import { authRoutes, unAuthRoutes } from "../../routes";

import { Avatar } from "common/ui-kit/Avatar/Avatar";
import { Container } from "common/ui-kit/Container/Container";
import { Flex } from "common/ui-kit/Flex/Flex";
import { HeaderLink } from "./HeaderLink";
import { Typography } from "common/ui-kit/Text/Typography";
import { authStateSelector } from "../../../features/Auth/selectors";
import { getRouteName } from "../../utils";
import logo from "../../../assets/img/logo.svg";
import { pageIcons } from "./Header.data";
import { useAllSelector } from "../../hooks";
import { userStateSelector } from "../../../features/User/selectors";

export const Header = React.memo(() => {
  // Dispatch & selectors
  const { isAuth } = useAllSelector(authStateSelector);
  const user = useAllSelector(userStateSelector);

  // LocalStates
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  // Vars
  const unAuthPages = getRouteName(unAuthRoutes);
  const authPages = getRouteName(authRoutes);
  const isMenuOpen = !!menuAnchor;

  // Utils
  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <HeaderContainer>
      <Container variant="sm">
        <HeaderWrapper>
          <img src={logo} alt="IT-Incubator" />
          <Flex align="center">
            <Button
              onClick={openMenu}
              sx={{
                color: "#000",
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Typography as="p" variant="sub-title-md" align="center">
                {user.name}
              </Typography>
              <Avatar
                bgColor={"#baffac"}
                text={user.name}
                src={user.avatar}
                widthSize={"2.5rem"}
                heightSize={"2.5rem"}
              />
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
          </Flex>
        </HeaderWrapper>
      </Container>
    </HeaderContainer>
  );
});
