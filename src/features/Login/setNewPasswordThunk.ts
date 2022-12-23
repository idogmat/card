import { AppThunkActionType } from "../../common/hooks/hooks";
import { loginAPI } from "./loginApi";

interface ISetPWD {
  password: string;
  resetPasswordToken: string;
}
export const setNewPassword =
  (setParams: ISetPWD): AppThunkActionType<any> =>
  (dispatch) => {
    return loginAPI.setNewPassword(setParams);
  };
