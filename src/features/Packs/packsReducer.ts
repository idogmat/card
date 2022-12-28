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
  max: string | number;
  min: string | number;
}
export const initialState: IInitialState = {
  cardPacks: [],
  maxCardsCount: 10,
  minCardsCount: 0,
  max: 15,
  min: 0,
  page: 1,
  pageCount: 4,
  sortPacks: "0updated",
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
      action: PayloadAction<{
        packs: ResponseGetPacks;
        max: number | string;
        min: number | string;
        packName: string;
      }>
    ): IInitialState => {
      return {
        ...action.payload.packs,
        min: +action.payload.min,
        max: +action.payload.max,
        isMyPack: draft.isMyPack,
        packName: action.payload.packName,
      };
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
