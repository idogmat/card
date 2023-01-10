import { IPackResponse } from "../packsAPI";
import { packsAC, packsReducer } from "../packsReducer";
import { AuthAC, authInitialState, authReducer } from "../../Auth/authReducer";
import { packsModalsAC, packsModalsReducer } from "../packsModalsSlice";
import { IGetModel, setPacksTC } from "../packsThunks";
import { store } from "../../../app/store";
import { APIMock } from "../../../common/mocks/packsThunksMocks";

global.fetch = jest.fn();
describe("packs Thunks", () => {
  it("should fetchPacks with rejected response", async () => {
    const dispatch = jest.fn();
    const thunk = setPacksTC({});

    await thunk(dispatch, store.getState, "packs/setPacks/pending");

    const { calls } = dispatch.mock;
    const [start, ...rest] = calls;
    // console.log(calls);
    // console.log(calls);
    // expect(calls).toHaveLength(2);
    expect(calls[0][0].type).toBe("packs/setPacks/pending");
  });

  it("should fetchPacks with resolved response", async () => {
    const dispatch = jest.fn();
    fetch.mockResolvedValue(Promise.resolve(APIMock));
    const thunk = setPacksTC({});
    await thunk(dispatch, store.getState, "");

    const { calls } = dispatch.mock;
    const [start, ...rest] = calls;
    // console.log(calls);
    // console.log(calls[calls.length - 1].type);
    console.log(fetch.mock);
    // expect(calls).toHaveLength(2);
    // expect(calls[0][0].type).toBe("packs/setPacks/pending");
  });
});
