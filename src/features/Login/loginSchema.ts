import * as yup from "yup";

export const basicSchema = yup.object().shape({
  email: yup.string().required("Required"),
  password: yup.string().min(6, "Password is too short").required("Required"),
});
