import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import app from "./App";

export interface IAppState {
  isLoading: boolean;
  error: string | null;
  isInit: boolean;
}

const initialState: IAppState = {
  isLoading: false,
  error: null,
  isInit: false,
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
    setIsInit: (draft, action: PayloadAction<{ isInit: boolean }>) => {
      draft.isInit = action.payload.isInit;
    },
  },
});

export const appReducer = appSlice.reducer;
export const AppAC = appSlice.actions;
