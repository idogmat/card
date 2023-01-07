import { AppAC } from "./../../app/appReducer";
import { FormikProps } from "formik";

export const defaultErrorMessage = "Some errors occurred";

export function hasError(form: FormikProps<any>, prop: string): boolean {
  return !!form.errors[prop] && !!form.touched[prop];
}

export const errorHandlingThunk = async (thunkAPI: any, logic: Function) => {
  thunkAPI.dispatch(AppAC.setIsLoading({ isLoading: true }));
  try {
    return await logic();
  } catch (e: any) {
    const error = e.response ? e.response.data.error : e.message;
    thunkAPI.dispatch(AppAC.setError({ error }));
    return thunkAPI.rejectWithValue({ error });
  } finally {
    thunkAPI.dispatch(AppAC.setIsLoading({ isLoading: false }));
  }
};
