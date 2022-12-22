import { AppThunkActionType } from "../../common/hooks/hooks";
import { API } from "./loginApi";

interface ISetPWD {
  password: string;
  resetPasswordToken: string;
}
export const setNewPassword =
  (setParams: ISetPWD): AppThunkActionType<any> =>
  (dispatch) => {
    return API.setNewPassword(setParams);
  };
