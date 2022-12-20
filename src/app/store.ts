import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = typeof store;
