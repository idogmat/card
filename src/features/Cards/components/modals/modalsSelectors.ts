import { RootState } from "app/store";

export const cardsModalsStateSelector = (state: RootState) => state.cardsModals;

export const addCardModalSelector = (state: RootState) =>
  state.cardsModals.addCard;
export const updateCardModalSelector = (state: RootState) =>
  state.cardsModals.updateCard;
export const deleteCardModalSelector = (state: RootState) =>
  state.cardsModals.deleteCard;
