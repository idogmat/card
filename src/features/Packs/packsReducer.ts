import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPackResponse, ResponseGetPacks } from "./packsAPI";
interface IInitialState {
  cardPacks: IPackResponse[];
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
  sortPacks: string;
  cardPacksTotalCount: number;
  isMyPack: boolean;
  packName: string;
}
const initialState: IInitialState | null = {
  cardPacks: [],
  maxCardsCount: 10,
  minCardsCount: 0,
  page: 1,
  pageCount: 10,
  sortPacks: "",
  cardPacksTotalCount: 10,
  isMyPack: false,
  packName: "",
};
const packsSlice = createSlice({
  name: "packs",
  initialState,
  reducers: {
    setPacks: (
      draft,
      action: PayloadAction<{ packs: ResponseGetPacks }>
    ): IInitialState => {
      return {
        ...action.payload.packs,
        minCardsCount: draft.minCardsCount,
        maxCardsCount: draft.maxCardsCount,
        isMyPack: draft.isMyPack,
        packName: draft.packName,
      };
    },
    setCurrentPage: (draft, action: PayloadAction<{ page: number }>) => {
      draft.page = action.payload.page;
    },
    setRangeValue: (draft, action: PayloadAction<{ range: number[] }>) => {
      draft.minCardsCount = action.payload.range[0];
      draft.maxCardsCount = action.payload.range[1];
    },
    setPageCount: (draft, action: PayloadAction<{ pageCount: number }>) => {
      draft.pageCount = action.payload.pageCount;
    },
    setPackName: (draft, action: PayloadAction<{ packName: string }>) => {
      draft.packName = action.payload.packName;
    },
    setPacksSort: (draft, action: PayloadAction<{ type: string }>) => {
      draft.sortPacks = action.payload.type;
    },
    setPreferencePacks: (
      draft,
      action: PayloadAction<{ param: "my" | "all" }>
    ) => {
      draft.isMyPack = action.payload.param === "my" ? true : false;
    },
  },
});

export const packsReducer = packsSlice.reducer;
export const {
  setPacks,
  setCurrentPage,
  setPageCount,
  setRangeValue,
  setPreferencePacks,
  setPackName,
  setPacksSort,
} = packsSlice.actions;
