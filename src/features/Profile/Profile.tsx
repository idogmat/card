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
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { Logout, PhotoCameraBackOutlined } from "@mui/icons-material";

import { EditableText } from "../../common/components/EditableText/EditableText";
import { userStateSelector } from "../User/selectors";
import { updateUserInfoTC } from "./profileThunks";
import { appStateSelect } from "../../app/selectors";
import styles from "../../common/styles/common.module.css";
import { Preloader } from "../../common/components/Preloader/Preloader";
import { lime } from "@mui/material/colors";
import { logOutTC } from "../Login/loginThunks";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAllSelector(userStateSelector);
  const { isLoading } = useAllSelector(appStateSelect);

  const handleLogout = () => {
    dispatch(logOutTC());
  };

  const changeNameHandler = (name: string) => {
    if (user.name !== name) {
      dispatch(updateUserInfoTC({ name, avatar: user.avatar }));
    }
  };

  return (
    <Grid
      container
      sx={{ height: "100vh" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item sx={{ minWidth: "360px" }}>
        {isLoading && (
          <div className={styles.preventSending}>
            <Preloader />
          </div>
        )}
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
                    bgcolor: lime[400],
                  }}
                  alt={"ProfilePicture"}

                  // src={user.avatar ? user.avatar : avatarPlaceholder}
                >
                  {user.name[0]}
                </Avatar>
              </Badge>
            </Box>
            <EditableText
              valueToDisplay={user.name}
              onChangeText={changeNameHandler}
              displayProps={
                { variant: "subtitle1", component: "span" } as TypographyProps
              }
              disabled={isLoading}
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
              disabled={isLoading}
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
