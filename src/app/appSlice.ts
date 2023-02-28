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
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setSuccessMessage: (
      state,
      action: PayloadAction<{ message: string | null }>
    ) => {
      state.successMessage = action.payload.message;
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
