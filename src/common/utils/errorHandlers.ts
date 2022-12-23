import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import { RegisterFormErrorFieldsType } from "../../features/Register/Register";
import { FormikConfig, FormikProps } from "formik";
type SetAppErrorActionType = any;

export const defaultErrorMessage = "Some errors occurred";

export function hasError(form: FormikProps<any>, prop: string): boolean {
  return !!form.errors[prop] && !!form.touched[prop];
}

export const errorUtils = (
  e: Error | AxiosError<{ error: string }>,
  dispatch: Dispatch<SetAppErrorActionType>
) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message;
    // dispatch(setAppErrorAC(error))
  } else {
    // dispatch(setAppErrorAC(`Native error ${err.message}`))
  }
};
