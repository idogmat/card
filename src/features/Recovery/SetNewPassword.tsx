import React from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { setNewPassword } from "./setNewPasswordThunk";
import { hasError } from "../../common/utils/errorHandlers";
import { Typography } from "../../common/ui-kit/Text/Typography";
import { Input } from "common/ui-kit/_Input/_Input";
import { Button } from "../../common/ui-kit/Button/Button";
import {
  RegisterContent,
  RegisterForm,
  RegisterWrapper,
} from "../Register/RegisterStyles";
import { Paper } from "../../common/ui-kit/Paper/Paper";

const SetNewPassword = () => {
  const navigate = useNavigate();
  let params = useParams();
  const dispatch = useAppDispatch();
  const setPasswordForm = useFormik({
    initialValues: {
      password: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Incorrect password";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const res = await dispatch(
        setNewPassword({
          password: values.password,
          resetPasswordToken: params.id + "",
        })
      );
      !!res && navigate("/login");
    },
  });
  //fix
  const setPasswordFormHasError = hasError.bind(null, setPasswordForm);

  return (
    <RegisterWrapper>
      <RegisterContent>
        <Paper sx={{ margin: "10px" }}>
          <RegisterForm onSubmit={setPasswordForm.handleSubmit}>
            <Typography variant={"title"} sx={{ textAlign: "center" }}>
              Create new password
            </Typography>
            <Input
              error={setPasswordFormHasError("password")}
              label={
                setPasswordFormHasError("password")
                  ? setPasswordForm.errors.password
                  : "Password"
              }
              {...setPasswordForm.getFieldProps("password")}
            />
            <Typography
              style={{ marginBottom: "1rem" }}
              sx={{ textAlign: "start" }}
            >
              <p style={{ opacity: ".7" }}>Enter your new password</p>
            </Typography>
            <Button
              disabled={setPasswordFormHasError("password")}
              color={"primary"}
              sx={{ borderRadius: "30px" }}
            >
              Create new password
            </Button>
          </RegisterForm>
        </Paper>
      </RegisterContent>
    </RegisterWrapper>
  );
};

export default SetNewPassword;
