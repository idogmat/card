import { IUpdatedUserInfo, profileAPI } from "./profileAPI";

import { AppAC } from "../../app/appSlice";
import { createAppAsyncThunk } from "./../../common/utils/AsyncThunk";
import { errorHandlingThunk } from "./../../common/utils/errorHandlers";

export const updateUserInfoTC = createAppAsyncThunk(
  "profile/updateProfile",
  async (model: IUpdatedUserInfo, { dispatch, rejectWithValue }) => {
    return errorHandlingThunk({ dispatch, rejectWithValue }, async () => {
      const { data } = await profileAPI.sendUpdateUserRequest(model);
      dispatch(
        AppAC.setSuccessMessage({ message: "Profile was successfully updated" })
      );
      return data.updatedUser;
    });
  }
);
