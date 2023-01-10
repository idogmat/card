import { AppAC, appInitialState, appReducer } from "./appSlice";

describe("app reducer", () => {
  test("isLoading should be set to true", () => {
    const finalState = appReducer(
      appInitialState,
      AppAC.setIsLoading({ isLoading: true })
    );
    expect(finalState.isLoading).toBe(true);
  });
  test("error should be set to string", () => {
    const error = "error placeholder";
    const finalState = appReducer(appInitialState, AppAC.setError({ error }));
    expect(finalState.error).toBe(error);
  });
  test("successMessage should be set to string", () => {
    const message = "error placeholder";
    const finalState = appReducer(
      appInitialState,
      AppAC.setSuccessMessage({ message })
    );
    expect(finalState.successMessage).toBe(message);
  });
});
