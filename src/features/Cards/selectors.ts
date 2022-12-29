import { RootState } from "../../app/store";

export const cardsStateSelector = (state: RootState) => state.cards;
export const cardsCardsSelector = (state: RootState) => state.cards.cards;
export const cardsPackOwnerSelector = (state: RootState) =>
  state.cards.packUserId;
export const cardsTotalCountSelector = (state: RootState) =>
  state.cards.cardsTotalCount;
export const cardsCurrentPageSelector = (state: RootState) => state.cards.page;
export const cardsShowPerPageSelector = (state: RootState) =>
  state.cards.pageCount;
export const cardsCardQuestionSelector = (state: RootState) =>
  state.cards.cardQuestion;
