import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { loginTC } from "./loginThunks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { validMail } from "../../common/utils/regExp";

interface ILoginErrorType {
  email?: string;
  password?: string;
  rememberMe?: boolean;
}
type LoginFormErrorFieldsType = "email" | "password";

export const Login = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: ILoginErrorType = {};
      if (!values.email && !validMail.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (values.password.length < 8) {
        errors.password = "Invalid password length";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(loginTC(values));
    },
  });

  const changePasswordFieldType = () => setShowPassword((prev) => !prev);
  const passwordFieldType = showPassword ? "text" : "password";

  const hasError = (prop: LoginFormErrorFieldsType) => {
    return !!loginForm.errors[prop] && !!loginForm.touched[prop];
  };
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid item justifyContent={"center"} xs={3} sx={{ minWidth: "360px" }}>
        <Paper sx={{ padding: "35px" }}>
          <form onSubmit={loginForm.handleSubmit}>
            <FormControl sx={{ width: "100%", textAlign: "center" }}>
              <FormLabel>
                <Typography variant={"h3"} sx={{ textAlign: "center" }}>
                  Sign in
                </Typography>
              </FormLabel>
              <FormGroup>
                <TextField
                  error={hasError("email")}
                  label={hasError("email") ? loginForm.errors.email : "Email"}
                  margin={"normal"}
                  variant={"standard"}
                  {...loginForm.getFieldProps("email")}
                />
                <TextField
                  sx={{
                    marginBottom: "1rem",
                  }}
                  error={hasError("password")}
                  label={
                    hasError("password")
                      ? loginForm.errors.password
                      : "Password"
                  }
                  margin={"normal"}
                  type={passwordFieldType}
                  variant={"standard"}
                  {...loginForm.getFieldProps("password")}
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
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                {...loginForm.getFieldProps("rememberMe")}
                checked={loginForm.values.rememberMe}
              />
              <Typography sx={{ marginBottom: "1rem", textAlign: "end" }}>
                <Link to={"/recovery"}>Forgot Password?</Link>
              </Typography>

              <Button
                type={"submit"}
                variant={"contained"}
                disabled={hasError("email") || hasError("password")}
                color={"primary"}
                sx={{ borderRadius: "30px", marginBottom: "30px" }}
              >
                Sign in
              </Button>
              <Typography mb={1} variant={"subtitle1"} component={"span"}>
                Haven't account?
              </Typography>
              <Typography sx={{ fontSize: "16px", color: "#366EFF" }}>
                <Link to={"/register"} style={{ color: "inherit" }}>
                  Sign up
                </Link>
              </Typography>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
