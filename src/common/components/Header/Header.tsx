import { Button } from "@mui/material";
import { HeaderContainer, HeaderWrapper } from "./HeaderStyles";
import React, { useState } from "react";
import { authRoutes, unAuthRoutes } from "../../routes";

import { Avatar } from "common/ui-kit/Avatar/Avatar";
import { Container } from "common/ui-kit/Container/Container";
import { Flex } from "common/ui-kit/Flex/Flex";
import { HeaderLink } from "./HeaderLink";
import { Typography } from "common/ui-kit/Text/Text";
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
          </Flex>
        </HeaderWrapper>
      </Container>
    </HeaderContainer>
  );
});
