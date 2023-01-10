import { mockGetCards, mockGetCardsModel } from "common/mocks/cardsThunksMocks";

import { AxiosResponse } from "axios";
import { cardsAPI } from "../cardsAPI";
import { getCardsTC } from "../cardsThunks";
import { store } from "app/store";

const dispatch = jest.fn();
const getState = store.getState;

jest.mock("../cardsAPI.ts");
const cardsAPIMock = cardsAPI as jest.Mocked<typeof cardsAPI>;

//  status, statusText, headers, config;

describe("cards thunks", () => {
  beforeEach(() => {
    cardsAPIMock.getCardsRequest.mockResolvedValue({
      data: mockGetCards,
    } as AxiosResponse);
  });

  test("should getCards with resolved response", async () => {
    const mockResult = { ...mockGetCards, cardQuestion: "" };
    const thunk = getCardsTC(mockGetCardsModel);
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(4);
    console.log(calls);

    const [start, enableLoading, disableLoading, end] = calls;

    expect(start[0].type).toBe("cards/getCards/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("cards/getCards/fulfilled");
    expect(end[0].payload).toStrictEqual(mockResult);
  });
});
