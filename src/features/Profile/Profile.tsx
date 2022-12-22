import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useAllSelector, useAppDispatch } from "../../common/hooks/hooks";
import { Logout, PhotoCameraBackOutlined } from "@mui/icons-material";
import { logOutTC } from "../Login/loginThunks";
import { EditableText } from "../../common/components/EditableText/EditableText";
import { userStateSelector } from "../User/selectors";
import { updateUserInfoTC } from "./profileThunks";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAllSelector(userStateSelector);
  const avatarPlaceholder =
    "https://i0.wp.com/boingboing.net/wp-content/uploads/2020/06/IMG_20200602_082003_707.jpg?fit=1&resize=620%2C4000&ssl=1";

  const handleLogout = () => {
    dispatch(logOutTC());
  };

  const changeNameHandler = (name: string) => {
    dispatch(updateUserInfoTC({ name, avatar: user.avatar }));
  };

  return (
    <Grid
      container
      sx={{ height: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item sx={{ minWidth: "360px" }}>
        <Paper sx={{ padding: "25px 80px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant={"h4"} component={"h1"} mb={"20px"}>
              Personal Information
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <Badge
                overlap={"circular"}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <IconButton>
                    <PhotoCameraBackOutlined
                      sx={{
                        background: "grey",
                        borderRadius: "50%",
                        height: "32px",
                        width: "32px",
                        padding: "5px",
                        border: "2px solid #fff",
                      }}
                    />
                  </IconButton>
                }
              >
                <Avatar
                  sx={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  alt={"ProfilePicture"}
                  src={user.avatar ? user.avatar : avatarPlaceholder}
                />
              </Badge>
            </Box>
            <EditableText
              valueToDisplay={user.name}
              onChangeText={changeNameHandler}
              displayProps={
                { variant: "subtitle1", component: "span" } as TypographyProps
              }
            />

            <Typography
              variant={"subtitle2"}
              component={"p"}
              color={"gray"}
              sx={{ marginBottom: "25px" }}
            >
              {user.email}
            </Typography>
            <Button
              variant={"contained"}
              sx={{
                borderRadius: "30px",
                boxShadow:
                  "0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "14px",
                display: "flex",
                gap: "10px",
                padding: "10px 15px",
                ":hover": {
                  color: "#fff",
                },
                textTransform: "none",
                fontWeight: 500,
              }}
              onClick={handleLogout}
            >
              <Logout fontSize={"small"} />
              Log out
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
