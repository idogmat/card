import { registerAPI } from "./registerAPI";
import { AppAC } from "../../app/appReducer";
import { AuthAC } from "../Auth/authReducer";
import { IRegisterData } from "../../api/auth";
import { AppThunkActionType } from "../../common/hooks/hooks";
import { UserAC } from "../User/userReducer";
import { defaultErrorMessage } from "../../common/utils/errorHandlers";

export const registerTC = ({
  email,
  password,
}: IRegisterData): AppThunkActionType => {
  return async (dispatch) => {
    AppAC.setIsLoading({ isLoading: true });
    try {
      const payload = { email, password };
      const { data } = await registerAPI.sendRegisterRequest(payload);
      const user = {
        ...data.addedUser,
        avatar: null,
      };
      dispatch(AuthAC.setIsAuth({ isAuth: true }));
      dispatch(UserAC.setUser({ user }));
    } catch (e) {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
