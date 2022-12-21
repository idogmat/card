import {AppThunkActionType} from "../../common/hooks/hooks";
import {API} from "../../api/auth";
import {UserType} from "../../common/api/types";


export const loginThunk = (user: any): AppThunkActionType => async (dispatch) => {
    try {
        const res = await API.login(user)
        console.log(res)

        // dispatch(loginAC({value: true}))

    } catch (e: any) {
        // handleServerNetworkError(e, dispatch)
        console.log(e)
    }
}