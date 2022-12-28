import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { registerTC } from "./registerThunks";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { hasError } from "../../common/utils/errorHandlers";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { validMail } from "../../common/utils/regExp";
import { appStateSelect } from "../../app/selectors";
import styles from "../../common/styles/common.module.css";
import { Preloader } from "../../common/components/Preloader/Preloader";

export interface IRegisterFormErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAllSelector(appStateSelect);
  const [showPassword, setShowPassword] = useState(false);

  const registerForm = useFormik({
    validate: (values) => {
      const errors = {} as IRegisterFormErrors;
      if (values.password.length < 8) {
        errors.password = "Incorrect password";
      }
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Different password";
      }
      if (!values.email.length || !validMail.test(values.email)) {
        errors.email = "Enter the correct email";
      }
      return errors;
    },
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      dispatch(registerTC({ email: values.email, password: values.password }));
    },
  });

  const changePasswordFieldType = () => setShowPassword((prev) => !prev);
  const passwordFieldType = showPassword ? "text" : "password";

  const registerHasError = hasError.bind(null, registerForm);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      sx={{
        height: "100vh",
        ["@media (max-width: 768px)"]: {
          paddingTop: "400px",
          paddingBottom: "5vh",
        },
      }}
    >
      <Grid
        item
        justifyContent={"center"}
        xs={3}
        sx={{
          minWidth: "360px",
          position: "relative",
          pointerEvents: `${isLoading ? "none" : "auto"}`,
        }}
      >
        {isLoading && (
          <div className={styles.preventSending}>
            <Preloader />
          </div>
        )}
        <Paper sx={{ padding: "35px" }}>
          <form onSubmit={registerForm.handleSubmit}>
            <FormControl sx={{ width: "100%", textAlign: "center" }}>
              <FormLabel>
                <Typography variant={"h3"} sx={{ textAlign: "center" }}>
                  Sign up
                </Typography>
              </FormLabel>
              <FormGroup>
                <TextField
                  error={registerHasError("email")}
                  label={
                    registerHasError("email")
                      ? registerForm.errors.email
                      : "Email"
                  }
                  margin={"normal"}
                  variant={"standard"}
                  {...registerForm.getFieldProps("email")}
                />
                <TextField
                  error={registerHasError("password")}
                  label={
                    registerHasError("password")
                      ? registerForm.errors.password
                      : "Password"
                  }
                  margin={"normal"}
                  type={passwordFieldType}
                  variant={"standard"}
                  {...registerForm.getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={"end"}>
                        <IconButton onClick={changePasswordFieldType}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  error={registerHasError("confirmPassword")}
                  label={
                    registerHasError("confirmPassword")
                      ? registerForm.errors.confirmPassword
                      : "Confirm password"
                  }
                  margin={"normal"}
                  type={passwordFieldType}
                  variant={"standard"}
                  sx={{ marginBottom: "20px" }}
                  {...registerForm.getFieldProps("confirmPassword")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={"end"}>
                        <IconButton onClick={changePasswordFieldType}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                sx={{ borderRadius: "30px", marginBottom: "30px" }}
                disabled={isLoading}
              >
                Sign up
              </Button>
              <Typography mb={1} variant={"subtitle1"} component={"span"}>
                Already have an account?
              </Typography>
              <Typography sx={{ fontSize: "16px", color: "#366EFF" }}>
                <Link to={"/login"} style={{ color: "inherit" }}>
                  Sign in
                </Link>
              </Typography>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
