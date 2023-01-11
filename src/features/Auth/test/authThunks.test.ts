import { AxiosResponse } from "axios";
import { authMeTC } from "../authThunks";
import { baseAPI } from "common/api/baseAPI";
import { mockAuthMeResponse } from "./mock";
import { store } from "app/store";

const dispatch = jest.fn();
const getState = store.getState;

jest.mock("../../../common/api/baseAPI.ts");
const baseAPIMock = baseAPI as jest.Mocked<typeof baseAPI>;

describe("auth thunks", () => {
  test("should AuthMeTC with resolved response", async () => {
    baseAPIMock.authMeRequest.mockResolvedValue({
      data: mockAuthMeResponse,
    } as AxiosResponse);
    const thunk = authMeTC();

    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, fulfilled] = calls;
    expect(pending[0].type).toBe("auth/authMe/pending");
    expect(fulfilled[0].type).toBe("auth/authMe/fulfilled");
    expect(fulfilled[0].payload).toBe(mockAuthMeResponse);
  });
});
