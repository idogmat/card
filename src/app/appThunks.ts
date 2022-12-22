import { AppThunkActionType } from "../common/hooks/hooks";
import { AuthMeTC } from "../features/Auth/authThunks";
import { AppAC } from "./appReducer";

export const InitAppTC = (): AppThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(AppAC.setIsLoading({ isLoading: true }));
      const res = await dispatch(AuthMeTC());
    } catch (e) {
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
      dispatch(AppAC.setIsInit({ isInit: true }));
    }
  };
};
