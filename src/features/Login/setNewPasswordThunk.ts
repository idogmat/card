import { AppThunkActionType } from "../../common/hooks/hooks";
import { API } from "./loginApi";
import { AppAC } from "../../app/appReducer";

interface ISetPWD {
  password: string;
  resetPasswordToken: string;
}
export const setNewPassword =
  (setParams: ISetPWD): AppThunkActionType<any> =>
  (dispatch) => {
    return API.setNewPassword(setParams);
    // .then((e)=>{
    //     if (!!e.data.info) {
    //
    //     }
    // })
  };
