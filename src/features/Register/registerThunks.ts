import { createAppAsyncThunk } from "../../common/utils/AsyncThunk";
import { errorHandlingThunk } from "../../common/utils/errorHandlers";
import { loginTC } from "../Login/loginThunks";
import { registerAPI } from "./registerAPI";

export interface IRegisterData {
  email: string;
  password: string;
}

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
