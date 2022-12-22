import { AppThunkActionType } from "../common/hooks/hooks";
import { AuthMeTC } from "../features/Auth/authThunks";
import { AppAC } from "./appReducer";
import { AuthAC } from "../features/Auth/authReducer";
import { baseAPI } from "../common/api/baseAPI";

export const InitAppTC = (): AppThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(AppAC.setIsLoading({ isLoading: true }));
      const res = dispatch(AuthMeTC());
    } catch (e) {
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
      dispatch(AppAC.setIsInit({ isInit: true }));
    }
  };
};
