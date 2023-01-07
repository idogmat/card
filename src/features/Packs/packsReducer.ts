import { IPackResponse, ResponseGetPacks } from "./packsAPI";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { setPacksTC } from "./packsThunks";

export const initialState = {
  cardPacks: [] as IPackResponse[],
  maxCardsCount: 10,
  minCardsCount: 0,
  max: 15,
  min: 0,
  page: 1,
  pageCount: 4,
  sortPacks: { direction: 0, field: "updated" },
  cardPacksTotalCount: 10,
  isMyPack: false,
  packName: "",
};
type StateType = typeof initialState;
const packsSlice = createSlice({
  name: "packs",
  initialState,
  reducers: {
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
    setPacksSort: (
      draft,
      action: PayloadAction<{ type: { direction: number; field: string } }>
    ) => {
      draft.sortPacks = action.payload.type;
    },
    setPreferencePacks: (draft, action: PayloadAction<{ isMine: boolean }>) => {
      draft.isMyPack = action.payload.isMine;
    },
    clearSettings: (draft, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      setPacksTC.fulfilled,
      (
        state,
        action: PayloadAction<{
          packs: ResponseGetPacks;
          max: number | string;
          min: number | string;
          packName: string;
          isMyPack: boolean;
          sortPacks: { direction: number; field: string };
        }>
      ) => ({
        ...action.payload.packs,
        min: +action.payload.min,
        max: +action.payload.max,
        isMyPack: action.payload.isMyPack,
        packName: action.payload.packName,
        sortPacks: action.payload.sortPacks,
      })
    );
  },
});

export const packsReducer = packsSlice.reducer;
export const packsAC = packsSlice.actions;
