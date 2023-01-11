import { AppAC } from "../../app/appSlice";
import { loginAPI } from "../Login/loginAPI";
import { recoveryEmail } from "../../common/components/RecoveryEmail/RecoveryEmail";
import { createAppAsyncThunk } from "../../common/utils/AsyncThunk";
import { errorHandlingThunk } from "../../common/utils/errorHandlers";

export const recoveryThunk = createAppAsyncThunk(
  "auth/recovery",
  async (field: string, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const recoveryRequest = {
        email: field,
        from: "test-front-admin <ai73a@yandex.by>",
        message: recoveryEmail,
      };
      const res = await loginAPI.recoveryPassword(recoveryRequest);
      if (res.data.success) {
        thunkAPI.dispatch(
          AppAC.setSuccessMessage({
            message: "Check your email",
          })
        );
        return res.data.success;
      }
    });
  }
);