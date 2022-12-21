import authReducer from "../features/Login/loginReducer";
import { combineReducers } from "redux";

export const reducers = {
  auth: authReducer,
};

export const rootReducer = combineReducers(reducers);
