import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password is too short").required("Required"),
  confirmPassword: Yup.string()
    .min(8)
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
