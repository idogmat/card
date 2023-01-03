import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPackResponse, ResponseGetPacks } from "./packsAPI";
import { setPacks } from "./packsThunks";
export const initialState = {
  cardPacks: [] as IPackResponse[],
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
    setPacksSort: (draft, action: PayloadAction<{ type: string }>) => {
      draft.sortPacks = action.payload.type;
    },
    setPreferencePacks: (draft, action: PayloadAction<{ isMine: boolean }>) => {
      draft.isMyPack = action.payload.isMine;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      setPacks.fulfilled,
      (
        state,
        action: PayloadAction<{
          packs: ResponseGetPacks;
          max: number | string;
          min: number | string;
          packName: string;
          isMyPack: boolean;
        }>
      ) => ({
        ...action.payload.packs,
        min: +action.payload.min,
        max: +action.payload.max,
        isMyPack: action.payload.isMyPack,
        packName: action.payload.packName,
      })
    );
  },
});

export const packsReducer = packsSlice.reducer;
export const packsAC = packsSlice.actions;
