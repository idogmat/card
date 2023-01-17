import { mockUpdateUserInfo, mockUpdateUserResponse } from "./mock";

import { AxiosResponse } from "axios";
import { profileAPI } from "../profileAPI";
import { store } from "app/store";
import { updateUserInfoTC } from "../profileThunks";

const dispatch = jest.fn();
const getState = store.getState;
const errorMessage = "error placeholder";

jest.mock("../profileAPI.ts");
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>;

describe("profile thunks", () => {
  test("should updateUserInfoTC with resolved response", async () => {
    profileAPIMock.sendUpdateUserRequest.mockResolvedValue({
      data: mockUpdateUserResponse,
    } as AxiosResponse);
    const thunk = updateUserInfoTC(mockUpdateUserInfo);

    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(5);
    const [pending, setLoading, setSuccessMessage, disableLoading, fulfilled] =
      calls;
    expect(pending[0].type).toBe("profile/updateProfile/pending");
    expect(setLoading[0].type).toBe("app/setIsLoading");
    expect(setSuccessMessage[0].type).toBe("app/setSuccessMessage");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(fulfilled[0].type).toBe("profile/updateProfile/fulfilled");
    expect(fulfilled[0].payload).toStrictEqual(
      mockUpdateUserResponse.updatedUser
    );
  });

  test("should updateUserInfoTC with rejected response", async () => {
    profileAPIMock.sendUpdateUserRequest.mockRejectedValue({
      message: errorMessage,
    });

    const thunk = updateUserInfoTC(mockUpdateUserInfo);

    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(5);
    const [pending, setLoading, , disableLoading, rejected] = calls;
    expect(pending[0].type).toBe("profile/updateProfile/pending");
    expect(setLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(rejected[0].type).toBe("profile/updateProfile/rejected");
    expect(rejected[0].meta.rejectedWithValue).toBe(true);
  });
});
