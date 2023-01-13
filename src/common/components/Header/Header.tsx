import { HeaderContainer, HeaderWrapper } from "./HeaderStyles";
import React, { useState } from "react";
import { authRoutes, unAuthRoutes } from "../../routes";

import { Avatar } from "common/ui-kit/Avatar/Avatar";
import { Button } from "@mui/material";
import { Container } from "common/ui-kit/Container/Container";
import { Dropdown } from "common/ui-kit/Dropdown/Dropdown";
import { Flex } from "common/ui-kit/Flex/Flex";
import { HeaderLink } from "./HeaderLink";
import { Typography } from "common/ui-kit/Text/Typography";
import { authStateSelector } from "../../../features/Auth/selectors";
import { getRouteName } from "../../utils";
import { lime } from "@mui/material/colors";
import logo from "../../../assets/img/logo.svg";
import { pageIcons } from "./Header.data";
import { useAllSelector } from "../../hooks";
import { useComponentVisible } from "../../hooks/isComponentVisible";
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
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  // Utils
  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsComponentVisible(true);
  };

  return (
    <HeaderContainer>
      <Container variant="sm">
        <HeaderWrapper>
          <img src={logo} alt="IT-Incubator" />
          <Flex align="center" sx={{ position: "relative" }}>
            <Button
              onClick={openMenu}
              ref={ref}
              sx={{
                color: "#000",
                display: "flex",
                gap: 1,
                alignItems: "center",
                position: "relative",
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
            <Dropdown
              posSettings={{ bottom: "0px", right: "0px" }}
              open={isComponentVisible}
            >
              {isAuth
                ? authPages.map((page) => {
                    return <HeaderLink page={page} icon={pageIcons[page]} />;
                  })
                : unAuthPages.map((page) => {
                    return <HeaderLink page={page} icon={pageIcons[page]} />;
                  })}
            </Dropdown>
          </Flex>
        </HeaderWrapper>
      </Container>
    </HeaderContainer>
  );
});
