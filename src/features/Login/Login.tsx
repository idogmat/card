import {
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAllSelector, useAppDispatch } from "../../common/hooks";

import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import { Link } from "react-router-dom";
import { Preloader } from "../../common/components/Preloader/Preloader";
import { appStateSelector } from "app/selectors";
import { hasError } from "../../common/utils/errorHandlers";
import { loginTC } from "./loginThunks";
import styles from "../../common/styles/common/common.module.scss";
import { useFormik } from "formik";
import { validMail } from "../../common/utils/regExp";
import { Input } from "../../common/ui-kit/Input/Input";
import { Checkbox } from "../../common/ui-kit/Checkbox/Checkbox";
import { Flex } from "../../common/ui-kit/Flex/Flex";

interface ILoginErrorType {
  email?: string;
  password?: string;
  rememberMe?: boolean;
}

export const Login = () => {
  // Dispatch & selectors
  const dispatch = useAppDispatch();
  const { isLoading } = useAllSelector(appStateSelector);

  // Local Stataes
  const [showPassword, setShowPassword] = useState(false);

  // Formik
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: ILoginErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!validMail.test(values.email)) {
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

  // Vars
  const loginHasError = hasError.bind(null, loginForm);

  // Utils
  const changePasswordFieldType = () => setShowPassword((prev) => !prev);

  return (
    <Flex justify={"center"}>
      {isLoading && (
        <div className={styles.preventSending}>
          <Preloader />
        </div>
      )}
      <div style={{ padding: "35px", boxShadow: "black 0px 0px 1px 1px" }}>
        <form onSubmit={loginForm.handleSubmit}>
          <FormControl sx={{ width: "100%", textAlign: "center" }}>
            <FormLabel>
              <Typography variant={"h3"} sx={{ textAlign: "center" }}>
                Sign in
              </Typography>
            </FormLabel>
            <FormGroup>
              <Input
                styleType={"underline"}
                error={loginHasError("email") && loginForm.errors.email}
                {...loginForm.getFieldProps("email")}
              ></Input>
              <Input
                padding={true}
                styleType={"underline"}
                type={showPassword ? "text" : "password"}
                error={loginHasError("password") && loginForm.errors.password}
                {...loginForm.getFieldProps("password")}
                endItem={
                  <IconButton onClick={changePasswordFieldType}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
              ></Input>
            </FormGroup>
            <Checkbox
              onChange={() =>
                loginForm.setFieldValue(
                  "rememberMe",
                  !loginForm.values.rememberMe
                )
              }
              checked={loginForm.values.rememberMe}
            >
              <span>Remember me</span>
            </Checkbox>

            <Typography sx={{ marginBottom: "1rem", textAlign: "end" }}>
              <Link to={"/recovery"}>Forgot Password?</Link>
            </Typography>

            <Button
              type={"submit"}
              variant={"contained"}
              disabled={loginHasError("email") || loginHasError("password")}
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
      </div>
    </Flex>
  );
};
