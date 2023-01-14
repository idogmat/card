import React, { useState } from "react";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
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
import { Typography } from "../../common/ui-kit/Text/Typography";
import { Button } from "../../common/ui-kit/Button/Button";
import { BiHide, BiShow } from "react-icons/bi";

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
    <Flex justify={"center"} sx={{ paddingTop: "8rem" }}>
      {isLoading && (
        <div className={styles.preventSending}>
          <Preloader />
        </div>
      )}
      <Flex
        style={{
          padding: "35px",
          borderRadius: "5px",
          boxShadow: "black 0px 0px 1px 1px",
        }}
      >
        <form onSubmit={loginForm.handleSubmit}>
          <Flex
            fDirection={"column"}
            sx={{ width: "100%", textAlign: "center" }}
          >
            <Typography
              variant={"title"}
              sx={{ textAlign: "center", fontSize: "3rem" }}
            >
              Sign in
            </Typography>
            <Input
              styleType={"underline"}
              error={loginHasError("email") && loginForm.errors.email}
              {...loginForm.getFieldProps("email")}
            ></Input>
            <Input
              padding={true}
              styleType={"underline"}
              topPosition={"30px"}
              type={showPassword ? "text" : "password"}
              error={loginHasError("password") && loginForm.errors.password}
              {...loginForm.getFieldProps("password")}
              endItem={
                <Button semantic onClick={changePasswordFieldType}>
                  {showPassword ? <BiShow /> : <BiHide />}
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

            <Typography sx={{ margin: "1rem 0", textAlign: "end" }}>
              <Link to={"/recovery"}>Forgot Password?</Link>
            </Typography>

            <Button
              type={"submit"}
              disabled={loginHasError("email") || loginHasError("password")}
              color={"primary"}
              sx={{ borderRadius: "30px", marginBottom: "30px" }}
            >
              Sign in
            </Button>
            <Flex
              fDirection={"column"}
              sx={{ width: "100%", textAlign: "center" }}
            >
              <Typography>Haven't account?</Typography>
              <Typography sx={{ fontSize: "16px", color: "#366EFF" }}>
                <Link to={"/register"} style={{ color: "inherit" }}>
                  Sign up
                </Link>
              </Typography>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
