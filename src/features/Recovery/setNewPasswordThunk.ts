import { ISetPWD, loginAPI } from "../Login/loginAPI";
import { AppAC } from "../../app/appSlice";
import { errorHandlingThunk } from "../../common/utils/errorHandlers";
import { createAppAsyncThunk } from "../../common/utils/AsyncThunk";

export const setNewPassword = createAppAsyncThunk(
  "auth/setNewPassword",
  async (setParams: ISetPWD, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const res = await loginAPI.setNewPassword(setParams);
      if (res.statusText === "OK") {
        thunkAPI.dispatch(
          AppAC.setSuccessMessage({
            message: "You have successfully set new password",
          })
        );
      }
    });
  }
);