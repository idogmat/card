import { AppAC } from "../../app/appReducer";
import { recoveryEmail } from "../../common/components/RecoveryEmail/RecoveryEmail";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { loginAPI } from "../Login/loginAPI";

export const recoveryThunk =
  (field: string): AppThunkActionType<Promise<boolean | undefined>> =>
  async (dispatch) => {
    const recoveryRequest = {
      email: field,
      from: "test-front-admin <ai73a@yandex.by>",
      message: recoveryEmail,
    };
    return loginAPI
      .recoveryPassword(recoveryRequest)
      .then((res) => {
        if (res.data.success === true) {
          return res.data.success;
        }
      })
      .catch((e: any) => {
        dispatch(AppAC.setError({ error: e.message }));
        return false;
      });
  };
