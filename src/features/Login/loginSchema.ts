import * as yup from "yup";

export const basicSchema = yup.object().shape({
  email: yup.string().email("Enter valid Email").required("Required"),
  password: yup.string().min(8, "Password is too short").required("Required"),
});
