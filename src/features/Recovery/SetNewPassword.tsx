import React from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../common/hooks";
import { setNewPassword } from "./setNewPasswordThunk";
import { Flex } from "../../common/ui-kit/Flex/Flex";
import { Typography } from "../../common/ui-kit/Text/Typography";
import { Input } from "../../common/ui-kit/Input/Input";
import { Button } from "../../common/ui-kit/Button/Button";

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
  const hasError = (prop: "password") => {
    return !!setPasswordForm.errors[prop] && !!setPasswordForm.touched[prop];
  };

  return (
    <Flex justify={"center"} sx={{ paddingTop: "8rem", margin: "0 2rem" }}>
      <Flex
        sx={{
          padding: "35px",
          borderRadius: "5px",
          boxShadow: "black 0px 0px 1px 1px",
        }}
      >
        <form onSubmit={setPasswordForm.handleSubmit}>
          <Flex
            fDirection={"column"}
            sx={{ width: "100%", textAlign: "center" }}
          >
            <Typography variant={"title"} sx={{ textAlign: "center" }}>
              Create new password
            </Typography>
            <Input
              styleType={"underline"}
              error={hasError("password") && setPasswordForm.errors.password}
              label={
                hasError("password")
                  ? setPasswordForm.errors.password
                  : "Password"
              }
              {...setPasswordForm.getFieldProps("password")}
            />
            <Typography
              style={{ marginBottom: "3rem" }}
              sx={{ textAlign: "start" }}
            >
              <p style={{ opacity: ".7" }}>
                Enter your email address and we will send you further
                instructions
              </p>
            </Typography>
            <Button
              type={"submit"}
              disabled={hasError("password")}
              color={"primary"}
              sx={{ borderRadius: "30px", marginBottom: "30px" }}
            >
              Create new password
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default SetNewPassword;
