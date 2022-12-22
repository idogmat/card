import { AppThunkActionType } from "../../common/hooks/hooks";
import { baseAPI } from "../../common/api/baseAPI";
import { AuthAC } from "./authReducer";
import { UserAC } from "../User/userReducer";

export const AuthMeTC = (): AppThunkActionType => {
  return (dispatch) => {
    return baseAPI.authMeRequest().then(({ data }) => {
      const user = { ...data, avatar: null };
      dispatch(UserAC.setUser({ user }));
      dispatch(AuthAC.setIsAuth({ isAuth: true }));
    });
  };
};
