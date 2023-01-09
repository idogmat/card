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
    setCurrentPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page;
    },
    setRangeValue: (state, action: PayloadAction<{ range: number[] }>) => {
      state.min = action.payload.range[0];
      state.max = action.payload.range[1];
    },
    setPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
      state.pageCount = action.payload.pageCount;
    },
    setPackName: (state, action: PayloadAction<{ packName: string }>) => {
      state.packName = action.payload.packName;
    },
    setPacksSort: (
      state,
      action: PayloadAction<{ type: { direction: number; field: string } }>
    ) => {
      state.sortPacks = action.payload.type;
    },
    setPreferencePacks: (state, action: PayloadAction<{ isMine: boolean }>) => {
      state.isMyPack = action.payload.isMine;
    },
    clearSettings: (state, action) => {
      state = { ...initialState };
      return state;
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
