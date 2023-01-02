import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { BuildCircleSharp } from "@mui/icons-material";
import { ICard } from "../../common/models";
import { updateCardGradeTC } from "./cardsThunks";

interface ICardsState {
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
    setCardsData: (draft, action: PayloadAction<{ data: ICardsState }>) => {
      return action.payload.data;
    },
    setCards: (draft, action: PayloadAction<{ cards: ICard[] }>) => {
      draft.cards = action.payload.cards;
    },
    setPage: (draft, action: PayloadAction<{ page: number }>) => {
      draft.page = action.payload.page;
    },
    setPageCount: (draft, action: PayloadAction<{ showPerPage: number }>) => {
      draft.pageCount = action.payload.showPerPage;
    },
    setCardQuestion: (draft, action: PayloadAction<{ value: string }>) => {
      draft.cardQuestion = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCardGradeTC.fulfilled, (draft, action) => {
      console.log(action.payload.card_id);

      const card = draft.cards.find(
        (card) => card._id === action.payload.card_id
      );
      if (card) {
        card.grade = action.payload.grade;
        card.shots += 1;
      }
    });
  },
});

export const cardsReducer = cardsSlice.reducer;
export const CardsAC = cardsSlice.actions;
