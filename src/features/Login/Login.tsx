import React, { useState } from "react";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { Link } from "react-router-dom";
import { Preloader } from "../../common/components/Preloader/Preloader";
import { appStateSelector } from "app/selectors";
import { hasError } from "../../common/utils/errorHandlers";
import { loginTC } from "./loginThunks";
import styles from "../../common/styles/common/common.module.scss";
import { useFormik } from "formik";
import { Input } from "common/ui-kit/Input/Input";
import { Checkbox } from "../../common/ui-kit/Checkbox/Checkbox";
import { Typography } from "../../common/ui-kit/Text/Typography";
import { Button } from "../../common/ui-kit/Button/Button";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {
  RegisterContent,
  RegisterForm,
  RegisterOffer,
  RegisterWrapper,
} from "../Register/RegisterStyles";
import { Paper } from "../../common/ui-kit/Paper/Paper";
import { basicSchema } from "./loginSchema";

export const Login = () => {
  // Dispatch & selectors
  const dispatch = useAppDispatch();
  const { isLoading } = useAllSelector(appStateSelector);

  // Local State
  const [showPassword, setShowPassword] = useState(false);
  const passwordIcon = showPassword ? <MdVisibility /> : <MdVisibilityOff />;
  // Formik

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: basicSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(loginTC(values));
    },
  });

  // Vars
  const loginHasError = hasError.bind(null, loginForm);

  // Utils
  const changePasswordFieldType = () => setShowPassword((prev) => !prev);
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
            Sign in
          </Typography>
          <RegisterForm onSubmit={loginForm.handleSubmit}>
            <Input
              type={"text"}
              error={loginHasError("email")}
              label={loginHasError("email") ? loginForm.errors.email : "Email"}
              {...loginForm.getFieldProps("email")}
            ></Input>
            <Input
              type={showPassword ? "text" : "password"}
              error={loginHasError("password")}
              label={
                loginHasError("password")
                  ? loginForm.errors.password
                  : "Password"
              }
              {...loginForm.getFieldProps("password")}
              endItem={
                <Button
                  type="button"
                  semantic
                  onClick={changePasswordFieldType}
                >
                  {passwordIcon}
                </Button>
              }
            ></Input>
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

            <Typography
              sx={{ fontSize: "16px", color: "#366EFF", textAlign: "end" }}
            >
              <Link to={"/recovery"}>Forgot Password?</Link>
            </Typography>
            <Button
              type={"submit"}
              disabled={loginHasError("email") || loginHasError("password")}
            >
              Sign in
            </Button>
            <RegisterOffer>
              <Typography variant={"sub-title-md"} as={"span"}>
                Haven't account?
              </Typography>
              <Typography sx={{ fontSize: "16px", color: "#366EFF" }}>
                <Link to={"/register"}>Sign up</Link>
              </Typography>
            </RegisterOffer>
          </RegisterForm>
        </Paper>
      </RegisterContent>
    </RegisterWrapper>
  );
};
