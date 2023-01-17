import { appStateSelector } from "app/selectors";
import { store } from "app/store";

const state = store.getState();

test("should take the whole app state", () => {
  const appState = state.app;

  const result = appStateSelector(state);

  expect(result).toEqual(appState);
});
