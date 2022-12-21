
import React from "react";
import { useFormik } from "formik";
import { Grid, Typography } from "@mui/material";

export interface IRegisterFormErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const registerForm = useFormik({
    validate: (values) => {
      const errors = {} as IRegisterFormErrors;
      if (values.password.length < 8) errors.password = "Incorrect password";
      if (values.confirmPassword !== values.password)
        errors.confirmPassword = "Different password";
      if (!values.email.length) errors.email = "Field is required";
    },
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Grid container justifyContent={"center"} alignContent={"center"}>
      <Grid item>
        <Typography variant={"h2"}>Sign up</Typography>
        <form onSubmit={registerForm.handleSubmit}></form>
      </Grid>
    </Grid>
  );

};
