import { baseAPI } from "../../common/api/baseAPI";
import { createAppAsyncThunk } from "common/utils/AsyncThunk";

export const authMeTC = createAppAsyncThunk(
  "auth/authMe",
  async (a, thunkAPI) => {
    const { data } = await baseAPI.authMeRequest();
    return data;
  }
);
