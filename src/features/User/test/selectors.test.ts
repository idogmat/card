import { store } from "app/store";
import { userStateSelector } from "../selectors";

const state = store.getState();
test("should take the whole user state", () => {
  const userState = state.user;

  const result = userStateSelector(state);

  expect(result).toEqual(userState);
});
