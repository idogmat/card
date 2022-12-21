import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { authReducer } from "../features/Auth/authReducer";

export const reducers = {
  auth: authReducer,
  app: appReducer,
};
export const rootReducer = combineReducers(reducers);
