
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { useAllSelector, useAppDispatch } from "../../common/hooks/hooks";
import { loginThunk } from "./loginThunks";
import { authSelector } from "../Auth/selectors";

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};


export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth: isLogged } = useAllSelector(authSelector);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (values.password.length < 8) {
        errors.password = "Invalid password length";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(loginThunk(values));
    },

  })
  if (isLogged) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <article>{formik.errors.password}</article>
              )}
              {formik.errors.email && formik.touched.email && (
                <article>{formik.errors.email}</article>
              )}


              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                {...formik.getFieldProps("rememberMe")}
              />
              <p onClick={() => navigate("/resetPassword")}>Forgot Password?</p>

              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

