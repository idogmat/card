import {AppThunkActionType} from "../../common/hooks/hooks";
import {API} from "./loginApi";
import {AppAC} from "../../app/appReducer";
import {AuthAC} from "../Auth/authReducer";
interface ISetPWD{
    password: string
    resetPasswordToken: string
}
export const setNewPassword =
    (setParams: ISetPWD): AppThunkActionType =>
        async (dispatch) => {


            AppAC.setIsLoading({ isLoading: true });
            try {
                const res = await API.setNewPassword(setParams);
                console.log(res);
                if (!!res.data.info) {

                }
                dispatch(AuthAC.setIsAuth({isAuth: true}));
                // dispatch(AuthAC.setUser({user}));
            } catch (e: any) {
                // handleServerNetworkError(e, dispatch)
                console.log(e);
            } finally {
                AppAC.setIsLoading({ isLoading: false });
            }
        };