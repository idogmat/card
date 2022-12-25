import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPack } from "./packsAPI";
const initialState: IPack[] = [];
const packsSlice = createSlice({
  name: "packs",
  initialState,
  reducers: {
    setPacks: (draft, action: PayloadAction<{ packs: IPack[] }>) => {
      return action.payload.packs;
    },
  },
});

export const packsReducer = packsSlice.reducer;
export const { setPacks } = packsSlice.actions;
