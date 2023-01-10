import { IPackResponse } from "../packsAPI";
import { packsAC, packsReducer } from "../packsReducer";
import { AuthAC, authInitialState, authReducer } from "../../Auth/authReducer";
import { packsModalsAC, packsModalsReducer } from "../packsModalsSlice";
import { IGetModel, setPacksTC } from "../packsThunks";
import { store } from "../../../app/store";

const APIMock = {
  cardPacks: [
    {
      _id: "63601a71c2a7d73c18c32f50",
      user_id: "634d7464b8d71d2d44433e40",
      user_name: "pasha1",
      private: false,
      name: "1111",
      path: "/def",
      grade: 0,
      shots: 0,
      cardsCount: 1,
      type: "pack",
      rating: 0,
      created: "2022-10-31T18:56:49.530Z",
      updated: "2022-10-31T18:57:06.446Z",
      more_id: "634d7464b8d71d2d44433e40",
      __v: 0,
    },
    {
      _id: "635ce2ac6bf29218ccf37df6",
      user_id: "634d7464b8d71d2d44433e40",
      user_name: "pasha1",
      private: false,
      name: "11111",
      path: "/def",
      grade: 0,
      shots: 0,
      cardsCount: 0,
      type: "pack",
      rating: 0,
      created: "2022-10-29T08:22:04.175Z",
      updated: "2022-10-29T16:12:58.048Z",
      more_id: "634d7464b8d71d2d44433e40",
      __v: 0,
      deckCover: null,
    },
    {
      _id: "633b38344bbf5d0100b99ed2",
      user_id: "6331b0594c722b2330529fe0",
      user_name: "Roman",
      private: false,
      name: "11111",
      path: "/def",
      grade: 0,
      shots: 0,
      cardsCount: 0,
      type: "pack",
      rating: 0,
      created: "2022-10-03T19:29:56.620Z",
      updated: "2022-10-03T19:29:56.620Z",
      more_id: "6331b0594c722b2330529fe0",
      __v: 0,
    },
  ],
  page: 5,
  pageCount: 4,
  cardPacksTotalCount: 19,
  minCardsCount: 0,
  maxCardsCount: 53,
  token: "7d4fdea0-9016-11ed-b34f-513d5598287e",
  tokenDeathTime: 1673276978442,
};
const initialState = {
  cardPacks: [] as IPackResponse[],
  maxCardsCount: 10,
  minCardsCount: 0,
  max: 15,
  min: 0,
  page: 1,
  pageCount: 4,
  sortPacks: { direction: 0, field: "updated" },
  cardPacksTotalCount: 10,
  isMyPack: false,
  packName: "",
};
const mockPacksModel: Partial<IGetModel> = {
  isMyPack: "false",
  sortPacks: { direction: 0, field: "updated" },
  packName: "",
  min: 0,
  max: 99,
  page: 1,
  pageCount: 4,
  user_id: "",
};
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
    // fetch.mockResolvedValue(() =>
    //   Promise.resolve({
    //     data: APIMock.cardPacks,
    //     min: 0,
    //     max: 15,
    //     packName: "",
    //     isMyPack: "false",
    //     sortPacks: { direction: 0, field: "update" },
    //   })
    // );
    const thunk = setPacksTC({ isMyPack: "true" });
    await thunk(dispatch, store.getState, "packs/setPacks/fulfilled");

    const { calls } = dispatch.mock;
    const [start, ...rest] = calls;
    console.log(calls);
    console.log(calls[calls.length - 1].type);
    // expect(calls).toHaveLength(2);
    expect(calls[0][0].type).toBe("packs/setPacks/pending");
  });
});
