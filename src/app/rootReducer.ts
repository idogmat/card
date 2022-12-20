import { loginReducer } from "../features/Login/loginReducer";
import { combineReducers } from "redux";

export const reducers = {
  login: loginReducer,
};

export const rootReducer = combineReducers(reducers);
