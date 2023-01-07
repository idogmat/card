import { AuthAC } from "./authReducer";
import { Dispatch } from "redux";
import { UserAC } from "../User/userReducer";
import { baseAPI } from "../../common/api/baseAPI";

export const AuthMeTC = () => {
  return (dispatch: Dispatch) => {
    return baseAPI
      .authMeRequest()
      .then(({ data }) => {
        const user = { ...data };
        dispatch(UserAC.setUser({ user }));
        dispatch(AuthAC.setIsAuth({ isAuth: true }));
      })
      .catch((e) => {
        return;
      });
  };
};
