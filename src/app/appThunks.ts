import { authMeTC } from "../features/Auth/authThunks";
import { createAppAsyncThunk } from "common/utils/AsyncThunk";

export const initAppTC = createAppAsyncThunk(
  "app/init",
  async (_, thunkAPI) => {
    await thunkAPI.dispatch(authMeTC());
    return { isInit: true };
  }
);
