import React, { useState } from "react";
import { AppBar, Box, Container, List, Typography } from "@mui/material";
import { useAllSelector } from "../../hooks/hooks";
import { authSelector } from "../../../features/Auth/selectors";
import { HeaderLink } from "./HeaderLink";
import logo from "../../../assets/img/logo.svg";

export const Header = () => {
  const { isAuth } = useAllSelector(authSelector);

  const unAuthPages = ["login", "register"];
  const authPages = ["profile"];

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
          {/*<Typography color={"black"}>Logo placeholder</Typography>*/}
          <List
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {isAuth
              ? authPages.map((page) => <HeaderLink page={page} key={page} />)
              : unAuthPages.map((page) => (
                  <HeaderLink page={page} key={page} />
                ))}
          </List>
        </Box>
      </Container>
    </AppBar>
  );
};
