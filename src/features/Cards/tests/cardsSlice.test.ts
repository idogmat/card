import {
  CardsAC,
  ICardsState,
  cardsInitialState,
  cardsReducer,
} from "../cardsSlice";
import { getCardsTC, updateCardGradeTC } from "../cardsThunks";
import {
  mockGetCards,
  mockGetCardsModel,
  mockUpdateCardGradeRequest,
} from "common/mocks/cardsThunksMocks";

import { ICard } from "common/models";

describe("cards slice", () => {
  test("should return default state when passed an empty action", () => {
    const result = cardsReducer(undefined, { type: "" });

    expect(result).toEqual(cardsInitialState);
  });

  test("should set cards with 'setCards' action", () => {
    const card: ICard = {
      answer: "",
      question: "",
      cardsPack_id: "",
      grade: 10,
      shots: 20,
      user_id: "",
      created: new Date(),
      updated: new Date(),
      _id: "",
      answerImg: "",
      questionImg: "",
    };
    const cards = [card];
    const action = { type: CardsAC.setCards.type, payload: { cards } };

    const result = cardsReducer(cardsInitialState, action);

    expect(result.cards).toEqual(cards);
  });

  test('should set page with "setPage" action', () => {
    const page = 10;
    const action = { type: CardsAC.setPage.type, payload: { page } };

    const result = cardsReducer(cardsInitialState, action);

    expect(result.page).toEqual(page);
  });

  test('should set page count with "setPageCount" action', () => {
    const showPerPage = 5;
    const action = {
      type: CardsAC.setPageCount.type,
      payload: { showPerPage },
    };

    const result = cardsReducer(cardsInitialState, action);

    expect(result.pageCount).toEqual(showPerPage);
  });

  test('should set card question with "setCardQuestion" action', () => {
    const cardQuestion = "question placeholder";
    const action = {
      type: CardsAC.setCardQuestion.type,
      payload: { value: cardQuestion },
    };

    const result = cardsReducer(cardsInitialState, action);

    expect(result.cardQuestion).toEqual(cardQuestion);
  });
});

describe("cards extra reducers", () => {
  test("should update card grade and attemps with 'updateCardGradeTC.fulfilled'", () => {
    const updateGradeInitialState = {
      cards: [{ _id: "1", grade: 0 } as ICard],
    } as ICardsState;
    const thunkResult = { card_id: "1", grade: 2 };

    const finalState = cardsReducer(
      updateGradeInitialState,
      updateCardGradeTC.fulfilled(thunkResult, "", mockUpdateCardGradeRequest)
    );

    expect(finalState.cards[0].grade).toBe(thunkResult.grade);
  });
  test("should set new state with 'getCardsTC.fulfilled'", () => {
    const finalState = cardsReducer(
      cardsInitialState,
      getCardsTC.fulfilled(mockGetCards, "", mockGetCardsModel)
    );

    expect(finalState).toStrictEqual(mockGetCards);
  });
});
