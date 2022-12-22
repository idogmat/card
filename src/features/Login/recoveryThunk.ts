import { AppThunkActionType } from "../../common/hooks/hooks";
import { API } from "./loginApi";

export const recoveryThunk =
  (field: string): AppThunkActionType<any> =>
  async (dispatch) => {
    const recoveryRequest = {
      email: field,
      from: "test-front-admin <ai73a@yandex.by>",
      message: `<div style="background-color: darkslateblue; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/recovery/$token$'>
link</a></div>`,
    };
    return API.recoveryPassword(recoveryRequest).then((res) => {
      if (res.data.success === true) {
        return res.data.success;
      } else {
        return res.data.success;
      }
    });
  };