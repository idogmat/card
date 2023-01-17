import { authInitialState, authReducer } from "../authSlice";
import { logOutTC, loginTC } from "features/Login/loginThunks";
import { mockNewUser, mockUserFields } from "features/User/test/mock";

import { IUser } from "common/models";
import { authMeTC } from "../authThunks";
import { mockAuthMeResponse } from "./mock";

describe("auth extra reducers", () => {
  test("should set isAuth to true with 'loginTC.fulfilled'", () => {
    const finalState = authReducer(
      authInitialState,
      loginTC.fulfilled({ user: mockNewUser }, "", mockUserFields)
    );

    expect(finalState.isAuth).toBe(true);
  });

  test("should set isAuth to false with 'logOutTC.fulfilled'", () => {
    const finalState = authReducer(
      authInitialState,
      logOutTC.fulfilled({ user: {} as IUser }, "")
    );

    expect(finalState.isAuth).toBe(false);
  });

  test("should set isAuth true with 'authMeTC.fulfilled'", () => {
    const finalState = authReducer(
      authInitialState,
      authMeTC.fulfilled(mockAuthMeResponse, "")
    );
    expect(finalState.isAuth).toBe(true);
  });
});
