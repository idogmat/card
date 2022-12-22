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
} from "@mui/material";
import { authSelector } from "../Auth/selectors";
import { useAllSelector, useAppDispatch } from "../../common/hooks/hooks";
import { Logout, PhotoCameraBackOutlined } from "@mui/icons-material";
import { logOutTC } from "../Login/loginThunks";
import { EditableText } from "../../common/components/EditableText/EditableText";
import { userStateSelector } from "../User/selectors";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAllSelector(userStateSelector);
  const avatarPlaceholder =
    "https://i0.wp.com/boingboing.net/wp-content/uploads/2020/06/IMG_20200602_082003_707.jpg?fit=1&resize=620%2C4000&ssl=1";

  const handleLogout = () => {
    dispatch(logOutTC());
  };

  const changeNameHandler = (name: string) => {};

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
            <Typography variant={"h3"} component={"h1"}>
              Personal Information
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
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
              onChange={changeNameHandler}
            />
            {/*<Typography*/}
            {/*  variant={"subtitle1"}*/}
            {/*  component={"p"}*/}
            {/*  sx={{ marginBottom: "5px" }}*/}
            {/*>*/}
            {/*  {user.name}*/}
            {/*</Typography>*/}
            <Typography
              variant={"subtitle2"}
              component={"p"}
              color={"gray"}
              sx={{ marginBottom: "20px" }}
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
                fontSize: "16px",
                display: "flex",
                gap: "10px",
                padding: "10px 15px",
                ":hover": {
                  color: "#fff",
                },
              }}
              onClick={handleLogout}
            >
              <Logout />
              <Typography>Log out</Typography>
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
