import {
  CardsModalsAC,
  cardsModalsInitialState,
  cardsModalsReducer,
} from "../cardsModalsSlice";

import { FieldFormatsEnum } from "../components/modals/FormatSelect";
import { ICard } from "common/models";

describe("cards modal slice", () => {
  test("should return default state when passed an empty action", () => {
    const result = cardsModalsReducer(undefined, {
      type: "",
      payload: "",
    });

    expect(result).toEqual(cardsModalsInitialState);
  });

  test('should set isOpen to addCardModal with "setAddCardState"', () => {
    const action = {
      type: CardsModalsAC.setAddCardState.type,
      payload: { state: true },
    };

    const result = cardsModalsReducer(cardsModalsInitialState, action);

    expect(result.addCard.isOpen).toEqual(true);
  });

  test('should set isOpen to updateCardModal with "setUpdateCardState"', () => {
    const action = {
      type: CardsModalsAC.setUpdateCardState.type,
      payload: { state: true },
    };

    const result = cardsModalsReducer(cardsModalsInitialState, action);

    expect(result.updateCard.isOpen).toEqual(true);
  });

  test('should set isOpen to deleteCardModal with "setDeleteCardState"', () => {
    const action = {
      type: CardsModalsAC.setDeleteCardState.type,
      payload: { state: true },
    };

    const result = cardsModalsReducer(cardsModalsInitialState, action);

    expect(result.deleteCard.isOpen).toEqual(true);
  });

  test('should set cardID & cardName to deleteCardModal with "setDeleteCardData"', () => {
    const cardID = "placeholder";
    const cardName = "placeholder";
    const action = {
      type: CardsModalsAC.setDeleteCardData.type,
      payload: { cardID, cardName },
    };

    const result = cardsModalsReducer(cardsModalsInitialState, action);

    expect(result.deleteCard.cardID).toEqual(cardID);
    expect(result.deleteCard.cardName).toEqual(cardName);
  });

  test('should set update model to updateCardModal with "setUpdateCardData"', () => {
    const model = {
      answer: "",
      question: "",
      answerImg: "",
      questionImg: "",
      questionFieldType: FieldFormatsEnum.pictureFormat,
      answerFieldType: FieldFormatsEnum.pictureFormat,
    };
    const action = {
      type: CardsModalsAC.setUpdateCardData.type,
      payload: { model },
    };

    const result = cardsModalsReducer(cardsModalsInitialState, action);

    expect(result.updateCard.answer).toEqual(model.answer);
    expect(result.updateCard.question).toEqual(model.question);
    expect(result.updateCard.answerImg).toEqual(model.answerImg);
    expect(result.updateCard.questionImg).toEqual(model.questionImg);
    expect(result.updateCard.answerFieldType).toEqual(model.answerFieldType);
    expect(result.updateCard.questionFieldType).toEqual(
      model.questionFieldType
    );
  });

  test('should set initial model to updateCardModal with "setInitialUpdateCardData"', () => {
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
      answerImg: "undefined",
      questionImg: "undefined",
    };

    const action = {
      type: CardsModalsAC.setInitialUpdateCardData.type,
      payload: { card },
    };

    const result = cardsModalsReducer(cardsModalsInitialState, action);

    expect(result.updateCard.answer).toEqual(card.answer);
    expect(result.updateCard.question).toEqual(card.question);
    expect(result.updateCard.answerImg).toEqual("");
    expect(result.updateCard.questionImg).toEqual("");
    expect(result.updateCard.answerFieldType).toEqual(
      FieldFormatsEnum.textFormat
    );
    expect(result.updateCard.questionFieldType).toEqual(
      FieldFormatsEnum.textFormat
    );
    expect(result.updateCard.card).toEqual(card);
  });
});
