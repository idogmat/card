import { AuthAC, IAuthState, authReducer } from "./authSlice";

const initialState: IAuthState = {
  isAuth: false,
};

test("isAuth should switch to true", () => {
  const finalState = authReducer(
    initialState,
    AuthAC.setIsAuth({ isAuth: true })
  );
  expect(finalState.isAuth).toBe(true);
});
