import { AppThunkActionType } from "../../common/hooks/hooks";
import { loginAPI } from "./loginApi";
import { AppAC } from "../../app/appReducer";

export const recoveryThunk =
  (field: string): AppThunkActionType<any> =>
  async (dispatch) => {
    const recoveryRequest = {
      email: field,
      from: "test-front-admin <ai73a@yandex.by>",
      message: `<div style="padding: 15px">
Password recovery
<a href='http://localhost:3000/#/recovery/$token$'>
link</a></div>`,
    };
    return loginAPI
      .recoveryPassword(recoveryRequest)
      .then((res) => {
        if (res.data.success === true) {
          AppAC.setSuccessMessage({ message: "Check your email" });
          return res.data.success;
        }
      })
      .catch((e: any) => {
        dispatch(AppAC.setError({ error: e.message }));
      });
  };
