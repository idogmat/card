import React from "react";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {registerTC} from "./registerThunks";

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
      registerTC({email: values.email, password: values.password})
    },
  });
  return (
    <Grid container justifyContent={"center"} alignContent={"center"}>
      <Grid item>
        <form onSubmit={registerForm.handleSubmit}>
          <FormControl>
            <FormLabel>
              <Typography variant={'h3'}>Sign up</Typography>
            </FormLabel>
            <FormGroup>
              <TextField
                label={"Email"}
                margin={"normal"}
                {...registerForm.getFieldProps("email")}
              />
              <TextField
                 label={"Password"}
                 margin={"normal"}
                 {...registerForm.getFieldProps("password")}
              />
              <TextField
                 label={"Confirm your password"}
                 margin={"normal"}
                 {...registerForm.getFieldProps("confirmPassword")}
              />
            </FormGroup>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Register
            </Button>
          </FormControl>

        </form>
      </Grid>
    </Grid>
  );
};
