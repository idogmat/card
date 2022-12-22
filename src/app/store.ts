import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type RootState = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
