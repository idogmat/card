import { ISetPWD, loginAPI } from "../Login/loginAPI";

import { AppAC } from "../../app/appSlice";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { defaultErrorMessage } from "../../common/utils/errorHandlers";

export const setNewPassword =
  (setParams: ISetPWD): AppThunkActionType<Promise<any>> =>
  (dispatch) => {
    return loginAPI
      .setNewPassword(setParams)
      .then((e) => {
        if (!!e.data.info) {
          dispatch(AppAC.setSuccessMessage({ message: e.data.info }));
          return e.data.info;
        }
        dispatch(AppAC.setError({ error: defaultErrorMessage }));
      })
      .catch((e) => {
        dispatch(AppAC.setError({ error: e.message }));
      });
  };
