import {
  addCardTC,
  deleteCardTC,
  getCardsTC,
  updateCardGradeTC,
  updateCardTC,
} from "../cardsThunks";
import {
  mockAddCard,
  mockDeleteCard,
  mockGetCards,
  mockGetCardsModel,
  mockUpdateCard,
  mockUpdateCardGradeRequest,
  mockUpdateCardGradeResponse,
} from "common/mocks/cardsThunksMocks";

import { AxiosResponse } from "axios";
import { cardsAPI } from "../cardsAPI";
import { store } from "app/store";

const dispatch = jest.fn();
const getState = store.getState;
const errorMessage = "error placeholder";

jest.mock("../cardsAPI.ts");
const cardsAPIMock = cardsAPI as jest.Mocked<typeof cardsAPI>;

//  status, statusText, headers, config;

describe("cards thunks", () => {
  test("should getCards with resolved response", async () => {
    cardsAPIMock.getCardsRequest.mockResolvedValue({
      data: mockGetCards,
    } as AxiosResponse);

    const mockResult = { ...mockGetCards, cardQuestion: "" };
    const thunk = getCardsTC(mockGetCardsModel);
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(4);

    const [start, enableLoading, disableLoading, end] = calls;

    expect(start[0].type).toBe("cards/getCards/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("cards/getCards/fulfilled");
    expect(end[0].payload).toStrictEqual(mockResult);
  });

  test("should getCards with rejected response", async () => {
    cardsAPIMock.getCardsRequest.mockRejectedValue({
      message: errorMessage,
    });
    const thunk = getCardsTC(mockGetCardsModel);
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(5);

    const [start, enableLoading, setError, disableLoading, end] = calls;

    expect(start[0].type).toBe("cards/getCards/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("cards/getCards/rejected");
    expect(end[0].meta.rejectedWithValue).toBe(true);
    expect(end[0].payload).toBe(errorMessage);
  });

  test("should addCardTC with resolved value", async () => {
    cardsAPIMock.addCardRequest.mockResolvedValue({} as AxiosResponse);
    const thunk = addCardTC(mockAddCard);
    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(6);

    const [start, enableLoading, _, setSuccessMessage, disableLoading, end] =
      calls;

    expect(start[0].type).toBe("cards/addCard/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(setSuccessMessage[0].type).toBe("app/setSuccessMessage");
    expect(end[0].type).toBe("cards/addCard/fulfilled");
  });

  test("should addCardTC with rejected value", async () => {
    cardsAPIMock.addCardRequest.mockRejectedValue({ message: errorMessage });
    const thunk = addCardTC(mockAddCard);
    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(5);

    const [start, enableLoading, setError, disableLoading, end] = calls;

    expect(start[0].type).toBe("cards/addCard/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("cards/addCard/rejected");
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });

  test("should deleteCardTC with resolved value", async () => {
    cardsAPIMock.deleteCardRequest.mockResolvedValue({} as AxiosResponse);
    const thunk = deleteCardTC(mockDeleteCard);
    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(6);

    const [
      start,
      enableLoading,
      getCards,
      setSuccessMessage,
      disableLoading,
      end,
    ] = calls;

    expect(start[0].type).toBe("cards/deleteCard/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(setSuccessMessage[0].type).toBe("app/setSuccessMessage");
    expect(end[0].type).toBe("cards/deleteCard/fulfilled");
  });

  test("should deleteCardTC with rejected value", async () => {
    cardsAPIMock.deleteCardRequest.mockRejectedValue({ message: errorMessage });
    const thunk = deleteCardTC(mockDeleteCard);
    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(5);

    const [start, enableLoading, setError, disableLoading, end] = calls;

    expect(start[0].type).toBe("cards/deleteCard/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("cards/deleteCard/rejected");
  });

  test("should updateCardTC with resolved value", async () => {
    cardsAPIMock.updateCardRequest.mockResolvedValue({} as AxiosResponse);
    const thunk = updateCardTC(mockUpdateCard);
    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(6);

    const [
      start,
      enableLoading,
      getCards,
      setSuccessMessage,
      disableLoading,
      end,
    ] = calls;

    expect(start[0].type).toBe("cards/updateCard/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(setSuccessMessage[0].type).toBe("app/setSuccessMessage");
    expect(end[0].type).toBe("cards/updateCard/fulfilled");
  });

  test("should updateCardTC with rejected value", async () => {
    cardsAPIMock.updateCardRequest.mockRejectedValue({ message: errorMessage });
    const thunk = updateCardTC(mockUpdateCard);
    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(5);

    const [start, enableLoading, setError, disableLoading, end] = calls;

    expect(start[0].type).toBe("cards/updateCard/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("cards/updateCard/rejected");
  });

  test("should updateCardGradeTC with resolved value", async () => {
    cardsAPIMock.updateCardGradeRequest.mockResolvedValue({
      data: mockUpdateCardGradeResponse,
    } as AxiosResponse);
    const thunkReturn = { card_id: "1", grade: 1 };
    const thunk = updateCardGradeTC(mockUpdateCardGradeRequest);
    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(4);

    const [start, enableLoading, disableLoading, end] = calls;

    expect(start[0].type).toBe("cards/updateCardGrade/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("cards/updateCardGrade/fulfilled");
    expect(end[0].payload).toStrictEqual(thunkReturn);
  });

  test("should updateCardGradeTC with rejected value", async () => {
    cardsAPIMock.updateCardGradeRequest.mockRejectedValue({
      message: errorMessage,
    });
    const thunk = updateCardGradeTC(mockUpdateCardGradeRequest);
    await thunk(dispatch, getState, "");
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(5);

    const [start, enableLoading, setError, disableLoading, end] = calls;

    expect(start[0].type).toBe("cards/updateCardGrade/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("cards/updateCardGrade/rejected");
  });
});
