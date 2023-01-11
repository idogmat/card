import { AppBar, Box, Button, Menu } from "@mui/material";
import React, { useState } from "react";
import { authRoutes, unAuthRoutes } from "../../routes";
import { lightGreen, lime } from "@mui/material/colors";

import { Avatar } from "common/ui-kit/Avatar/Avatar";
import { Container } from "common/ui-kit/Container/Container";
import { Flex } from "common/ui-kit/Flex/Flex";
import { HeaderLink } from "./HeaderLink";
import { StyledComponent } from "common/ui-kit/types";
import { Typography } from "common/ui-kit/Text/Text";
import { authStateSelector } from "../../../features/Auth/selectors";
import { getRouteName } from "../../utils";
import logo from "../../../assets/img/logo.svg";
import { pageIcons } from "./Header.data";
import styled from "@emotion/styled";
import { useAllSelector } from "../../hooks";
import { userStateSelector } from "../../../features/User/selectors";

const StyledHeader = styled.header<StyledComponent<{}>>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25),
    inset 0px 1px 0px rgba(255, 255, 255, 0.3);
  padding: 0.625rem 0px;
  z-index: 50;
  ${(p) => ({ ...p.sx })}
`;

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
    <StyledHeader>
      <Container variant="sm">
        <Flex justify="space-between" align="center" sx={{ gap: "1.25rem" }}>
          <img src={logo} alt="IT-Incubator" />
          <Flex align="center" sx={{ gap: "0.625rem" }}>
            <Button
              onClick={openMenu}
              sx={{
                color: "#000",
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Typography as="p" variant="sub-title-md">
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
        </Flex>
      </Container>
    </StyledHeader>
  );
});
