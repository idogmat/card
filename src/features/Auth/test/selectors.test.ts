import { authStateSelector } from "../selectors";
import { store } from "app/store";

test("should select auth from state", () => {
  const isAuth = false;
  const result = authStateSelector(store.getState());
  expect(result).toEqual({ isAuth });
});
