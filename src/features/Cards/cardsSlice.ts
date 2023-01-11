import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCardsTC, updateCardGradeTC } from "./cardsThunks";

import { ICard } from "../../common/models";

export interface ICardsState {
  cards: ICard[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
  cardQuestion?: string;
}

const initialState: ICardsState = {
  cards: [] as ICard[],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 4,
  packUserId: "",
  cardQuestion: "",
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<{ cards: ICard[] }>) => {
      state.cards = action.payload.cards;
    },
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page;
    },
    setPageCount: (state, action: PayloadAction<{ showPerPage: number }>) => {
      state.pageCount = action.payload.showPerPage;
    },
    setCardQuestion: (state, action: PayloadAction<{ value: string }>) => {
      state.cardQuestion = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCardGradeTC.fulfilled, (state, action) => {
        const card = state.cards.find(
          (card) => card._id === action.payload.card_id
        );
        if (card) {
          card.grade = action.payload.grade;
          card.shots += 1;
        }
      })
      .addCase(getCardsTC.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const cardsReducer = cardsSlice.reducer;
export const CardsAC = cardsSlice.actions;
export const cardsInitialState = cardsSlice.getInitialState();
