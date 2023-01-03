import { registerAPI } from "./registerAPI";
import { AppAC } from "../../app/appReducer";
import { AuthAC } from "../Auth/authReducer";
import { UserAC } from "../User/userReducer";
import {
  defaultErrorMessage,
  errorHandlingThunk,
} from "../../common/utils/errorHandlers";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { loginTC } from "../Login/loginThunks";
import { createAppAsyncThunk } from "../../common/utils/AsyncThunk";

export interface IRegisterData {
  email: string;
  password: string;
}

// export const registerTC = ({
//   email,
//   password,
// }: IRegisterData): AppThunkActionType => {
//   return async (dispatch) => {
//     AppAC.setIsLoading({ isLoading: true });
//     try {
//       const payload = { email, password };
//       const { data } = await registerAPI.sendRegisterRequest(payload);
//       const user = { ...data.addedUser, avatar: null };
//       dispatch(AuthAC.setIsAuth({ isAuth: true }));
//       dispatch(loginTC(payload));
//       return { user };
//     } catch (e) {
//       dispatch(AppAC.setError({ error: defaultErrorMessage }));
//     } finally {
//       dispatch(AppAC.setIsLoading({ isLoading: false }));
//     }
//   };
// };

export const registerTC = createAppAsyncThunk(
  "auth/register",
  async ({ email, password }: IRegisterData, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const payload = { email, password };
      const { data } = await registerAPI.sendRegisterRequest(payload);
      thunkAPI.dispatch(loginTC(payload));
    });
  }
);
