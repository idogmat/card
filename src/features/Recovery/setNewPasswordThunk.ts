import { AppAC } from "../../app/appReducer";
import { defaultErrorMessage } from "../../common/utils/errorHandlers";
import { ISetPWD, loginAPI } from "../Login/loginAPI";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";

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
