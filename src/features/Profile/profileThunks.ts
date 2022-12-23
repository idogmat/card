import { IUpdatedUserInfo, profileAPI } from "./profileAPI";
import { AppAC } from "../../app/appReducer";
import { UserAC } from "../User/userReducer";
import { defaultErrorMessage } from "../../common/utils/errorHandlers";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";

export const updateUserInfoTC = (
  model: IUpdatedUserInfo
): AppThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(AppAC.setIsLoading({ isLoading: true }));
      const { data } = await profileAPI.sendUpdateUserRequest(model);
      dispatch(UserAC.setUser({ user: data.updatedUser }));
      dispatch(
        AppAC.setSuccessMessage({ message: "Profile was successfully updated" })
      );
    } catch (e) {
      AppAC.setError({ error: defaultErrorMessage });
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
