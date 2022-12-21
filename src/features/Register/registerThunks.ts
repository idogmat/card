import { registerAPI } from "./registerAPI";
import { AppAC } from "../../app/appReducer";
import { AuthAC } from "../Auth/authReducer";
import { IRegisterData } from "../../api/auth";
import { AppThunkActionType } from "../../common/hooks/hooks";

export const registerTC = ({
  email,
  password,
}: IRegisterData): AppThunkActionType => {
  return async (dispatch) => {
    AppAC.setIsLoading({ isLoading: true });
    try {
      const payload = { email, password };
      const { data } = await registerAPI.sendRegisterRequest(payload);
      console.log(data.addedUser);
      const user = {
        ...data.addedUser,
        avatar: null,
      };
      dispatch(AuthAC.setIsAuth({ isAuth: true }));
      dispatch(AuthAC.setUser({ user }));
    } catch (e) {
      console.log(e);
    } finally {
      AppAC.setIsLoading({ isLoading: false });
    }
  };
};
