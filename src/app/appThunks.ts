import { AuthMeTC } from "../features/Auth/authThunks";
import { createAppAsyncThunk } from "common/utils/AsyncThunk";
import { errorHandlingThunk } from "common/utils/errorHandlers";

export const initAppTC = createAppAsyncThunk(
  "app/init",
  async (_, thunkAPI) => {
    await thunkAPI.dispatch(AuthMeTC());
    return { isInit: true };
  }
);
