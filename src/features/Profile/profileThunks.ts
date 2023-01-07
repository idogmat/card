import { IUpdatedUserInfo, profileAPI } from "./profileAPI";

import { AppAC } from "../../app/appReducer";
import { createAppAsyncThunk } from "./../../common/utils/AsyncThunk";
import { errorHandlingThunk } from "./../../common/utils/errorHandlers";

export const updateUserInfoTC = createAppAsyncThunk(
  "profile/updateProfile",
  async (model: IUpdatedUserInfo, { dispatch }) => {
    return errorHandlingThunk({ dispatch }, async () => {
      const { data } = await profileAPI.sendUpdateUserRequest(model);
      dispatch(
        AppAC.setSuccessMessage({ message: "Profile was successfully updated" })
      );
      return data.updatedUser;
    });
  }
);
