import { AppAC, appInitialState, appReducer } from "./appSlice";

import { initAppTC } from "./appThunks";

describe("app reducer", () => {
  test("should return default state when passed an empty action", () => {
    const action = { type: "", payload: "" };

    const result = appReducer(undefined, action);

    expect(result).toBe(appInitialState);
  });

  test("should set isLoading with 'setIsLoading' action", () => {
    const action = {
      type: AppAC.setIsLoading.type,
      payload: { isLoading: true },
    };

    const finalState = appReducer(appInitialState, action);

    expect(finalState.isLoading).toBe(true);
  });

  test("should set error with 'setError' action", () => {
    const error = "error placeholder";
    const action = { type: AppAC.setError, payload: { error } };

    const finalState = appReducer(appInitialState, action);

    expect(finalState.error).toBe(error);
  });

  test("should set successMessage with 'setSuccessMessage' action", () => {
    const message = "error placeholder";
    const action = { type: AppAC.setSuccessMessage.type, payload: { message } };

    const finalState = appReducer(appInitialState, action);

    expect(finalState.successMessage).toBe(message);
  });
});

describe("app extra reducers", () => {
  test("isInit should be set with 'initAppTC.fulfilled'", () => {
    const finalState = appReducer(
      appInitialState,
      initAppTC.fulfilled({ isInit: true }, "")
    );

    expect(finalState.isInit).toEqual(true);
  });
});
