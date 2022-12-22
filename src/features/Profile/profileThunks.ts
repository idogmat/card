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
      console.log(data);
      dispatch(UserAC.setUser({ user: data.updatedUser }));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
