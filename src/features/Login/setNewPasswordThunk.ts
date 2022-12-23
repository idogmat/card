import { AppThunkActionType } from "../../common/hooks/hooks";
import { ISetPWD, loginAPI } from "./loginApi";
import { AppAC } from "../../app/appReducer";

export const setNewPassword =
  (setParams: ISetPWD): AppThunkActionType<any> =>
  (dispatch) => {
    return loginAPI
      .setNewPassword(setParams)
      .then((e) => {
        if (!!e.data.info) {
          dispatch(AppAC.setSuccessMessage({ message: e.data.info }));
          return e.data.info;
        } else {
          dispatch(AppAC.setError({ error: "some error" }));
        }
      })
      .catch((e) => {
        dispatch(AppAC.setError({ error: e.message }));
      });
  };
