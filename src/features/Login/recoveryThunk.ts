import {AppThunkActionType} from "../../common/hooks/hooks";
import {API} from "./loginApi";



export const recoveryThunk =
    (field: string): AppThunkActionType =>
        async (dispatch) => {
            const recoveryRequest = {
                email: field,
                from: "test-front-admin <ai73a@yandex.by>",
                message: `<div style="background-color: darkslateblue; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/recovery/$token$'>
link</a></div>`
            }

            // AppAC.setIsLoading({ isLoading: true });
            try {
                const res = await API.recoveryPassword(recoveryRequest);
                console.log(res);
                if (res.data.success === true) {
                    console.log('k')
                }

                // dispatch(AuthAC.setUser({user}));
            } catch (e: any) {
                // handleServerNetworkError(e, dispatch)
                console.log(e);
            } finally {
                // AppAC.setIsLoading({ isLoading: false });
            }
        };