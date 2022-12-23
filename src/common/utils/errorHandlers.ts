import { FormikProps } from "formik";

export const defaultErrorMessage = "Some errors occurred";

export function hasError(form: FormikProps<any>, prop: string): boolean {
  return !!form.errors[prop] && !!form.touched[prop];
}
