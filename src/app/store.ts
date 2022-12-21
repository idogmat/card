import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type RootState = ReturnType<typeof rootReducer>;


