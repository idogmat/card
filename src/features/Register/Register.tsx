import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { Input } from "common/ui-kit/_Input/_Input";

import { Link } from "react-router-dom";
import { Preloader } from "../../common/components/Preloader/Preloader";
import { appStateSelector } from "app/selectors";
import { hasError } from "../../common/utils/errorHandlers";
import { registerTC } from "./registerThunks";
import styles from "../../common/styles/common/common.module.scss";
import { useFormik } from "formik";
import { validMail } from "../../common/utils/regExp";
import { Button } from "common/ui-kit/Button/Button";
import {
  RegisterContent,
  RegisterForm,
  RegisterOffer,
  RegisterWrapper,
} from "./RegisterStyles";
import { Paper } from "common/ui-kit/Paper/Paper";
import { Typography } from "common/ui-kit/Text/Typography";

export interface IRegisterFormErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAllSelector(appStateSelector);
  const [showPassword, setShowPassword] = useState(false);

  const registerForm = useFormik({
    validate: (values) => {
      const errors = {} as IRegisterFormErrors;
      console.log(values.password);
      if (values.password.length < 8) {
        console.log("in password validate", values.password);

        errors.password = "Incorrect password";
      }

      if (values.confirmPassword !== values.password) {
        console.log("config password not equal to password");

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

  console.log(registerForm.errors);

  return (
    <RegisterWrapper>
      <RegisterContent>
        {isLoading && (
          <div className={styles.preventSending}>
            <Preloader />
          </div>
        )}
        <Paper sx={{ padding: "35px" }}>
          <Typography
            variant={"title"}
            sx={{ textAlign: "center", marginBottom: "0.6rem" }}
          >
            Sign up
          </Typography>
          <RegisterForm onSubmit={registerForm.handleSubmit}>
            <Input
              error={registerHasError("email")}
              label={
                registerHasError("email") ? registerForm.errors.email : "Email"
              }
              {...registerForm.getFieldProps("email")}
            />

            <Input
              error={registerHasError("password")}
              label={
                registerHasError("password")
                  ? registerForm.errors.password
                  : "Password"
              }
              {...registerForm.getFieldProps("email")}
              type={passwordFieldType}
              endItem={
                <Button
                  semantic
                  type="button"
                  onClick={changePasswordFieldType}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </Button>
              }
              {...registerForm.getFieldProps("password")}
            />

            <Input
              error={registerHasError("confirmPassword")}
              label={
                registerHasError("confirmPassword")
                  ? registerForm.errors.confirmPassword
                  : "Confirm password"
              }
              type={passwordFieldType}
              endItem={
                <Button
                  type="button"
                  semantic
                  onClick={changePasswordFieldType}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </Button>
              }
              {...registerForm.getFieldProps("confirmPassword")}
            />
            <Button type="submit" disabled={isLoading} sx={{ width: "100%" }}>
              Sign up
            </Button>
            <RegisterOffer>
              <Typography variant={"sub-title-md"} as={"span"}>
                Already have an account?
              </Typography>
              <Typography sx={{ fontSize: "16px", color: "#366EFF" }}>
                <Link to={"/login"} style={{ color: "inherit" }}>
                  Sign in
                </Link>
              </Typography>
            </RegisterOffer>
          </RegisterForm>
        </Paper>
      </RegisterContent>
    </RegisterWrapper>
  );
};
