import { AppThunkActionType } from "../../common/hooks/hooks";
import { API } from "../../api/auth";
import { loginAC, UserType } from "./loginReducer";

export const loginThunk =
  (user: UserType): AppThunkActionType =>
  async (dispatch) => {
    try {
      const res = await API.login(user);
      console.log(res);
    } catch (e: any) {
      // handleServerNetworkError(e, dispatch)
      console.log(e);
    }
  };
