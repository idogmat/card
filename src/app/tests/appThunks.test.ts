import { initAppTC } from "app/appThunks";
import { store } from "app/store";

const dispatch = jest.fn();
const getState = store.getState;

describe("app thunks", () => {
  test("should initAppTC with resolved response", async () => {
    const thunk = initAppTC();

    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(3);
    console.log(calls);

    const [pending, sendAuthMeRequest, end] = calls;

    expect(pending[0].type).toBe("app/init/pending");
    expect(end[0].type).toBe("app/init/fulfilled");
    expect(end[0].payload).toStrictEqual({ isInit: true });
  });
});
