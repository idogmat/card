import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPackResponse, ResponseGetPacks } from "./packsAPI";
interface IInitialState {
  cardPacks: IPackResponse[];
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
  min: number;
  max: number;
  sortPacks: string;
  cardPacksTotalCount: number;
}
const initialState: IInitialState | null = {
  cardPacks: [],
  maxCardsCount: 10,
  minCardsCount: 1,
  page: 1,
  pageCount: 1,
  sortPacks: "",
  cardPacksTotalCount: 10,
  min: 0,
  max: 100,
};
const packsSlice = createSlice({
  name: "packs",
  initialState,
  reducers: {
    setPacks: (
      draft,
      action: PayloadAction<{ packs: ResponseGetPacks }>
    ): IInitialState => {
      return { ...action.payload.packs, min: 0, max: 100 };
    },
    setCurrentPage: (draft, action: PayloadAction<{ page: number }>) => {
      draft.page = action.payload.page;
    },
    setRangeValue: (draft, action: PayloadAction<{ range: number[] }>) => {
      draft.min = action.payload.range[0];
      draft.max = action.payload.range[1];
    },
    setPageCount: (draft, action: PayloadAction<{ pageCount: number }>) => {
      draft.pageCount = action.payload.pageCount;
    },
  },
});

export const packsReducer = packsSlice.reducer;
export const { setPacks, setCurrentPage, setPageCount } = packsSlice.actions;
