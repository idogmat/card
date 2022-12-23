import { baseAPI } from "../../common/api/baseAPI";
import { AuthAC } from "./authReducer";
import { UserAC } from "../User/userReducer";
import { Dispatch } from "redux";

export const AuthMeTC = () => {
  return (dispatch: Dispatch) => {
    return baseAPI
      .authMeRequest()
      .then(({ data }) => {
        const user = { ...data, avatar: null };
        dispatch(UserAC.setUser({ user }));
        dispatch(AuthAC.setIsAuth({ isAuth: true }));
      })
      .catch((e) => {
        return;
      });
  };
};
