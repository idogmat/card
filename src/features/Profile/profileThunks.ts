import { IUpdatedUserInfo, profileAPI } from "./profileAPI";
import { AppThunkActionType } from "../../common/hooks/hooks";
import { AppAC } from "../../app/appReducer";
import { UserAC } from "../User/userReducer";

export const updateUserInfoTC = (
  model: IUpdatedUserInfo
): AppThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(AppAC.setIsLoading({ isLoading: true }));
      const { data } = await profileAPI.sendUpdateUserRequest(model);
      dispatch(UserAC.setUser({ user: data.data.updatedUser }));
    } catch (e) {
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
