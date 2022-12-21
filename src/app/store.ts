import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>
export type AppThunkActionType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppStoreType = typeof store;
