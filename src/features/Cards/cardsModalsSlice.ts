import { FieldFormatsEnum } from "./components/modals/FormatSelect";
import { ICard } from "common/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUpdateCardData {
  answer: string;
  question: string;
  answerImg: string;
  questionImg: string;
  questionFieldType: FieldFormatsEnum;
  answerFieldType: FieldFormatsEnum;
}

const initialState = {
  addCard: {
    isOpen: false,
  },
  updateCard: {
    card: {} as ICard,
    isOpen: false,
    question: "",
    answer: "",
    questionImg: "",
    answerImg: "",
    questionFieldType: FieldFormatsEnum.textFormat,
    answerFieldType: FieldFormatsEnum.textFormat,
  },
  deleteCard: {
    isOpen: false,
    card: {} as ICard,
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
    setInitialUpdateCardData: (
      draft,
      action: PayloadAction<{
        card: ICard;
      }>
    ) => {
      const isQuestionImg = action.payload.card.questionImg !== "undefined";
      const isAnswerImg = action.payload.card.answerImg !== "undefined";

      draft.updateCard.answer = action.payload.card.answer;
      draft.updateCard.question = action.payload.card.question;

      draft.updateCard.questionImg = isQuestionImg
        ? action.payload.card.questionImg
        : "";
      draft.updateCard.answerImg = isAnswerImg
        ? action.payload.card.answerImg
        : "";

      draft.updateCard.answerFieldType = isAnswerImg
        ? FieldFormatsEnum.pictureFormat
        : FieldFormatsEnum.textFormat;

      draft.updateCard.questionFieldType = isQuestionImg
        ? FieldFormatsEnum.pictureFormat
        : FieldFormatsEnum.textFormat;

      draft.updateCard.card = action.payload.card;
    },
    setUpdateCardData: (
      state,
      action: PayloadAction<{ model: IUpdateCardData }>
    ) => {
      state.updateCard = { ...state.updateCard, ...action.payload.model };
    },
    setDeleteCardData: (draft, action: PayloadAction<{ card: ICard }>) => {
      draft.deleteCard.card = action.payload.card;
    },
  },
});

export const cardsModalsReducer = cardsModalsSlice.reducer;
export const CardsModalsAC = cardsModalsSlice.actions;
export const cardsModalsInitialState = cardsModalsSlice.getInitialState();
