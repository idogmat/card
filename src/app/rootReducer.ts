import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { authReducer } from "../features/Auth/authReducer";
import { userReducer } from "../features/User/userReducer";
import { packsReducer } from "../features/Packs/packsReducer";

export const reducers = {
  auth: authReducer,
  app: appReducer,
  user: userReducer,
  packs: packsReducer,
};

export const rootReducer = combineReducers(reducers);
