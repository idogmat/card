import {AppThunkActionType} from "../../common/hooks/hooks";
import {API} from "../../api/auth";
import {AuthAC} from "../Auth/authReducer";

export type UserFieldsType = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export const loginThunk =
    (fields: UserFieldsType): AppThunkActionType =>
        async (dispatch) => {
            // AppAC.setIsLoading({ isLoading: true });
            try {
                const res = await API.login(fields);
                console.log(res);
                const {token, error, rememberMe, ...user} = res.data
                console.log(user)
                dispatch(AuthAC.setIsAuth({isAuth: true}));
                dispatch(AuthAC.setUser({user}));
            } catch (e: any) {
                // handleServerNetworkError(e, dispatch)
                console.log(e);
            } finally {
                // AppAC.setIsLoading({ isLoading: false });
            }
        };