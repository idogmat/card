import authReducer from "../features/Login/loginReducer";
import { combineReducers } from "redux";
<<<<<<< HEAD
import { appReducer } from "./appReducer";

export const reducers = {
  auth: authReducer,
  app: appReducer,
=======
import appReducer from "../features/Login/appReducer";

export const reducers = {
  auth: authReducer,
  app:appReducer
>>>>>>> fd76c21 (k)
};
export const rootReducer = combineReducers(reducers);
