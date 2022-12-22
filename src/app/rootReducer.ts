import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { authReducer } from "../features/Auth/authReducer";
import { userReducer } from "../features/User/userReducer";

export const reducers = {
  auth: authReducer,
  app: appReducer,
  user: userReducer,
};

export const rootReducer = combineReducers(reducers);
