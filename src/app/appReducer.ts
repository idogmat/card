import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import app from "./App";

export interface IAppState {
  isLoading: boolean;
  error: string | null;
}

const initialState: IAppState = {
  isLoading: false,
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoading: (draft, action: PayloadAction<{ isLoading: boolean }>) => {
      draft.isLoading = action.payload.isLoading;
    },
    setError: (draft, action: PayloadAction<{ error: string | null }>) => {
      draft.error = action.payload.error;
    },
  },
});

export const appReducer = appSlice.reducer;
export const AppAC = appSlice.actions;
