import { AppThunkActionType } from "../../common/hooks/hooks";
import { API } from "../../api/auth";
import { AuthAC } from "../Auth/authReducer";
import { AppAC } from "../../app/appReducer";
import { IUser } from "../../common/models";
import { UserAC } from "../User/userReducer";

export interface IUserFields {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const loginTC =
  (fields: IUserFields): AppThunkActionType =>
  async (dispatch) => {
    dispatch(AppAC.setIsLoading({ isLoading: true }));
    try {
      const res = await API.login(fields);
      const { token, error, rememberMe, ...user } = res.data;
      dispatch(AuthAC.setIsAuth({ isAuth: true }));
      dispatch(UserAC.setUser({ user }));
    } catch (e: any) {
      // handleServerNetworkError(e, dispatch)
      console.log(e);
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };

export const logOutTC = (): AppThunkActionType => {
  return (dispatch) => {
    dispatch(AuthAC.setIsAuth({ isAuth: false }));
    dispatch(UserAC.setUser({ user: {} as IUser }));
  };
};
