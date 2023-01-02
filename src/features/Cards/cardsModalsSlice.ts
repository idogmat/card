import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addCard: {
    isOpen: false,
  },
  updateCard: {
    isOpen: false,
    question: "",
    answer: "",
    cardID: "",
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
        question: string;
        answer: string;
        cardID: string;
      }>
    ) => {
      draft.updateCard.answer = action.payload.answer;
      draft.updateCard.question = action.payload.question;
      draft.updateCard.cardID = action.payload.cardID;
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
