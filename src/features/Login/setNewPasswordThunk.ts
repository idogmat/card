import { loginAPI } from "./loginAPI";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";

export interface ISetPWD {
  password: string;
  resetPasswordToken: string;
}
export const setNewPasswordTC = (
  setParams: ISetPWD
): AppThunkActionType<any> => {
  return (dispatch) => {
    return loginAPI.setNewPassword(setParams);
  };
};
