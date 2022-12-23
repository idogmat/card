import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import svg from "../../assets/img/mail.svg";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router-dom";

const CheckMail = (props: { email: string }) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid item justifyContent={"center"} xs={3} sx={{ minWidth: "360px" }}>
        <Paper
          sx={{
            padding: "35px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            style={{ marginBottom: "1rem" }}
            variant={"h4"}
            sx={{ textAlign: "center" }}
          >
            Check Email
          </Typography>
          <img
            style={{ width: "30%", margin: "auto" }}
            src={svg}
            alt="checkMail"
          />
          <Typography
            style={{ marginBottom: "1rem" }}
            sx={{ textAlign: "center" }}
          >
            <p style={{ opacity: ".7" }}>
              We’ve sent an Email with instructions to {props.email}
            </p>
          </Typography>
          <Button
            style={{ marginBottom: "1rem" }}
            type={"submit"}
            variant={"contained"}
            color={"primary"}
            onClick={() => navigate("/login")}
            sx={{ borderRadius: "30px", marginBottom: "30px" }}
          >
            Back to login
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CheckMail;
