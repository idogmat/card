import {
  cardsCardQuestionSelector,
  cardsCardsSelector,
  cardsCurrentPageSelector,
  cardsPackOwnerSelector,
  cardsShowPerPageSelector,
  cardsStateSelector,
  cardsTotalCountSelector,
} from "../selectors";

import { store } from "app/store";

const state = store.getState();

test("should take the whole cards part of the state", () => {
  const cardsState = state.cards;

  const result = cardsStateSelector(state);

  expect(result).toEqual(cardsState);
});

test("should take cards array from the cards state", () => {
  const cards = state.cards.cards;

  const result = cardsCardsSelector(state);

  expect(result).toEqual(cards);
});

test("should take pack owner from the state", () => {
  const packOwner = state.cards.packUserId;

  const result = cardsPackOwnerSelector(state);

  expect(result).toEqual(packOwner);
});

test("should take total count of cards from the state", () => {
  const totalCardsCount = state.cards.cardsTotalCount;

  const result = cardsTotalCountSelector(state);

  expect(result).toEqual(totalCardsCount);
});

test("should take selected page from the state", () => {
  const selectedPage = state.cards.page;

  const result = cardsCurrentPageSelector(state);

  expect(result).toEqual(selectedPage);
});

test("should take show per page value from the state", () => {
  const showPerPage = state.cards.pageCount;

  const result = cardsShowPerPageSelector(state);

  expect(result).toEqual(showPerPage);
});

test("should card question from the state", () => {
  const cardQuestion = state.cards.cardQuestion;

  const result = cardsCardQuestionSelector(state);

  expect(result).toEqual(cardQuestion);
});
