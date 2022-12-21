import authReducer from "../features/Login/loginReducer";
import { combineReducers } from "redux";
import appReducer from "../features/Login/appReducer";

export const reducers = {
  auth: authReducer,
  app:appReducer
};

export const rootReducer = combineReducers(reducers);
