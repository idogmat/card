import {AppThunkActionType} from "../../common/hooks/hooks";
import {API} from "../../api/auth";


export const loginThunk =
    (user: any): AppThunkActionType =>
        async (dispatch) => {
            try {
                const res = await API.login(user);
                console.log(res);
            } catch (e: any) {
                // handleServerNetworkError(e, dispatch)
                console.log(e);
            }
        }
