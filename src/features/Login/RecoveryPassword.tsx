import React, { useState } from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../common/hooks/hooks";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import { recoveryThunk } from "./recoveryThunk";
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
      const res = await dispatch(recoveryThunk(values.email));
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
          <Typography variant={"h3"} sx={{ textAlign: "center" }}>
            Check your Email
          </Typography>
          <img src={svg} alt="checkMail" />
          <Typography variant={"h5"} sx={{ textAlign: "center" }}>
            We’ve sent an Email with instructions to example@mail.com
          </Typography>
          <Button
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
                Enter your email for recovery password
              </Typography>
              <TextField
                error={hasError("email")}
                label={hasError("email") ? recoveryForm.errors.email : "Email"}
                margin={"normal"}
                variant={"standard"}
                {...recoveryForm.getFieldProps("email")}
              />
              <Button
                type={"submit"}
                variant={"contained"}
                disabled={hasError("email")}
                color={"primary"}
                sx={{ borderRadius: "30px", marginBottom: "30px" }}
              >
                Recovery
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RecoveryPassword;
