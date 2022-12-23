import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { ISetPWD, loginAPI } from "./loginAPI";

export const setNewPassword =
  (setParams: ISetPWD): AppThunkActionType<any> =>
  (dispatch) => {
    return loginAPI.setNewPassword(setParams);
  };
