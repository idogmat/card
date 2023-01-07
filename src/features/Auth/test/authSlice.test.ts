import { AuthAC, authInitialState, authReducer } from "../authReducer";

describe("auth slice", () => {
  test("should return default state when passed an empty action", () => {
    const action = { type: "", payload: "" };

    const result = authReducer(undefined, action);

    expect(result).toEqual(authInitialState);
  });

  test('should set isAuth with "setIsAuth" action', () => {
    const isAuth = true;
    const action = { type: AuthAC.setIsAuth, payload: { isAuth } };

    const result = authReducer(authInitialState, action);

    expect(result.isAuth).toEqual(isAuth);
  });
});
