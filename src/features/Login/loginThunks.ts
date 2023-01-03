import { AppAC } from "../../app/appReducer";
import { IUser } from "../../common/models";

import {
  defaultErrorMessage,
  errorHandlingThunk,
} from "../../common/utils/errorHandlers";
import { loginAPI } from "./loginAPI";
import { createAppAsyncThunk } from "../../common/utils/AsyncThunk";
import { AuthAC } from "../Auth/authReducer";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { UserAC } from "../User/userReducer";

export interface IUserFields {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// export const loginTC =
//   (fields: IUserFields): AppThunkActionType =>
//   async (dispatch) => {
//     dispatch(AppAC.setIsLoading({ isLoading: true }));
//     try {
//       const res = await loginAPI.login(fields);
//       const { error, ...user } = res.data;
//       dispatch(AuthAC.setIsAuth({ isAuth: true }));
//       dispatch(UserAC.setUser({ user }));
//       dispatch(
//         AppAC.setSuccessMessage({ message: "You have successfully authorized" })
//       );
//     } catch (e: any) {
//       dispatch(AppAC.setError({ error: e.message }));
//     } finally {
//       dispatch(AppAC.setIsLoading({ isLoading: false }));
//     }
//   };
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

// export const logOutTC = (): AppThunkActionType => {
//   return async (dispatch) => {
//     try {
//       const res = await loginAPI.logout();
//       dispatch(AuthAC.setIsAuth({ isAuth: false }));
//       dispatch(UserAC.setUser({ user: {} as IUser }));
//       dispatch(
//         AppAC.setSuccessMessage({ message: "You have successfully logged out" })
//       );
//     } catch (e) {
//       AppAC.setError({ error: defaultErrorMessage });
//     }
//   };
// };
export const logOutTC = createAppAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const res = await loginAPI.logout();
      thunkAPI.dispatch(
        AppAC.setSuccessMessage({ message: "You have successfully logged out" })
      );
      return { user: {} as IUser };
    });
  }
);
