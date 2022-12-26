import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../common/models";

interface ICardsState {
  cards: ICard[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
}

const initialState: ICardsState = {
  cards: [] as ICard[],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 0,
  packUserId: "",
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCardsData: (draft, action: PayloadAction<{ data: ICardsState }>) => {
      return action.payload.data;
    },
    setCards: (draft, action: PayloadAction<{ cards: ICard[] }>) => {
      draft.cards = action.payload.cards;
    },
    setPage: (draft, action: PayloadAction<{ page: number }>) => {
      draft.page = action.payload.page;
    },
  },
});

export const cardsReducer = cardsSlice.reducer;
export const CardsAC = cardsSlice.actions;
