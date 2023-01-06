import { ICard } from "common/models";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addCard: {
    isOpen: false,
  },
  updateCard: {
    card: {} as ICard,
    isOpen: false,
    question: "",
    answer: "",
  },
  deleteCard: {
    isOpen: false,
    cardID: "",
    cardName: "",
  },
};

const cardsModalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setAddCardState: (draft, action: PayloadAction<{ state: boolean }>) => {
      draft.addCard.isOpen = action.payload.state;
    },
    setUpdateCardState: (draft, action: PayloadAction<{ state: boolean }>) => {
      draft.updateCard.isOpen = action.payload.state;
    },
    setDeleteCardState: (draft, action: PayloadAction<{ state: boolean }>) => {
      draft.deleteCard.isOpen = action.payload.state;
    },
    setUpdateCardData: (
      draft,
      action: PayloadAction<{
        card: ICard;
      }>
    ) => {
      draft.updateCard.answer = action.payload.card.answer;
      draft.updateCard.question = action.payload.card.question;
      draft.updateCard.card = action.payload.card;
    },
    setUpdateCardQuestion: (
      draft,
      action: PayloadAction<{ question: string }>
    ) => {
      draft.updateCard.question = action.payload.question;
    },
    setUpdateCardAnswer: (draft, action: PayloadAction<{ answer: string }>) => {
      draft.updateCard.answer = action.payload.answer;
    },
    setDeleteCardData: (
      draft,
      action: PayloadAction<{ cardID: string; cardName: string }>
    ) => {
      draft.deleteCard.cardID = action.payload.cardID;
      draft.deleteCard.cardName = action.payload.cardName;
    },
  },
});

export const cardsModalsReducer = cardsModalsSlice.reducer;
export const CardsModalsAC = cardsModalsSlice.actions;
