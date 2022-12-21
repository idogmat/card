import React from "react";
import {useFormik} from "formik";
import {Button, FormControl, FormGroup, FormLabel, Grid, TextField, Typography,} from "@mui/material";

import {registerTC} from "./registerThunks";
import {useAppDispatch} from "../../common/hooks/hooks";


export interface IRegisterFormErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {

  const dispatch = useAppDispatch();

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
      dispatch(registerTC({ email: values.email, password: values.password }));
    },
  });

  return (
    <Grid container justifyContent={"center"} alignContent={"center"}>
      <Grid item>
        <form onSubmit={registerForm.handleSubmit}>
          <FormControl>
            <FormLabel>
              <Typography variant={"h3"}>Sign up</Typography>
            </FormLabel>
            <FormGroup>
              <TextField
                label={"Email"}
                margin={"normal"}
                {...registerForm.getFieldProps("email")}
              />
              {registerForm.errors.email ? (
                <p>{registerForm.errors.email}</p>
              ) : (
                ""
              )}
              <TextField
                label={"Password"}
                margin={"normal"}
                {...registerForm.getFieldProps("password")}
              />
              {registerForm.errors.password ? (
                <p>{registerForm.errors.password}</p>
              ) : (
                ""
              )}
              <TextField
                label={"Confirm your password"}
                margin={"normal"}
                {...registerForm.getFieldProps("confirmPassword")}
              />
              {registerForm.errors.confirmPassword ? (
                <p>{registerForm.errors.confirmPassword}</p>
              ) : (
                ""
              )}
            </FormGroup>
            <Button type={"submit"} variant={"contained"} color={"primary"}>
              Register
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
