import { combineReducers, createStore } from "redux";

import { reducers } from "./reducers/index";

const rootReducer = combineReducers(reducers);
export const store = createStore(rootReducer);

export type AppStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = typeof store;
