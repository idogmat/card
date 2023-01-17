import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initAppTC } from "./appThunks";

export interface IAppState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  isInit: boolean;
}

const initialState: IAppState = {
  isLoading: false,
  error: null,
  successMessage: null,
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
    setSuccessMessage: (
      draft,
      action: PayloadAction<{ message: string | null }>
    ) => {
      draft.successMessage = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAppTC.fulfilled, (state) => {
      state.isInit = true;
    });
  },
});

export const appReducer = appSlice.reducer;
export const AppAC = appSlice.actions;
export const appInitialState = appSlice.getInitialState();
