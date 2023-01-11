import {
  defaultErrorMessage,
  errorHandlingThunk,
} from "../../common/utils/errorHandlers";

import { AppAC } from "../../app/appSlice";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { AuthAC } from "../Auth/authSlice";
import { IUser } from "../../common/models";
import { UserAC } from "../User/userReducer";
import { createAppAsyncThunk } from "../../common/utils/AsyncThunk";
import { loginAPI } from "./loginAPI";

export interface IUserFields {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const loginTC = createAppAsyncThunk(
  "auth/login",
  async (fields: IUserFields, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const res = await loginAPI.login(fields);
      const { error, ...user } = res.data;
      thunkAPI.dispatch(
        AppAC.setSuccessMessage({ message: "You have successfully authorized" })
      );
      return { user };
    });
  }
);

export const logOutTC = createAppAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      await loginAPI.logout();
      thunkAPI.dispatch(
        AppAC.setSuccessMessage({ message: "You have successfully logged out" })
      );
      return { user: {} as IUser };
    });
  }
);
