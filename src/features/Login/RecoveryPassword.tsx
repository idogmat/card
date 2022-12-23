import React, { useState } from "react";
import { Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../common/hooks";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import { recoveryTC } from "./recoveryTC";
import { useNavigate } from "react-router-dom";
import svg from "./../../assets/img/mail.svg";
const RecoveryPassword = () => {
  const [sent, setSent] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recoveryForm = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const res = await dispatch(recoveryTC(values.email));
      !!res && setSent(true);
    },
  });
  const hasError = (prop: "email") => {
    return !!recoveryForm.errors[prop] && !!recoveryForm.touched[prop];
  };
  return sent ? (
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
              We’ve sent an Email with instructions to{" "}
              {recoveryForm.values.email}
            </p>
          </Typography>
          <Button
            style={{ marginBottom: "1rem" }}
            type={"submit"}
            variant={"contained"}
            disabled={hasError("email")}
            color={"primary"}
            onClick={() => navigate("/login")}
            sx={{ borderRadius: "30px", marginBottom: "30px" }}
          >
            Back to login
          </Button>
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid item justifyContent={"center"} xs={3} sx={{ minWidth: "360px" }}>
        <Paper sx={{ padding: "35px" }}>
          <form onSubmit={recoveryForm.handleSubmit}>
            <FormControl sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant={"h5"} sx={{ textAlign: "center" }}>
                Forgot your password?
              </Typography>
              <TextField
                error={hasError("email")}
                label={hasError("email") ? recoveryForm.errors.email : "Email"}
                margin={"normal"}
                variant={"standard"}
                {...recoveryForm.getFieldProps("email")}
              />
              <Typography>
                <p style={{ opacity: ".7" }}>
                  Enter your email address and we will send you further
                  instructions
                </p>
              </Typography>
              <Button
                type={"submit"}
                variant={"contained"}
                disabled={hasError("email")}
                color={"primary"}
                sx={{ borderRadius: "30px", marginBottom: "30px" }}
              >
                Recovery
              </Button>
              <Typography>
                <p style={{ opacity: ".7" }}>Did you remember your password?</p>
              </Typography>
              <Typography
                style={{ cursor: "pointer" }}
                sx={{ textAlign: "center" }}
              >
                <Link>Try logging in</Link>
              </Typography>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RecoveryPassword;
