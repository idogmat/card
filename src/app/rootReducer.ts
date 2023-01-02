import { appReducer } from "./appReducer";
import { authReducer } from "../features/Auth/authReducer";
import { cardsModalsReducer } from "./../features/Cards/cardsModalsSlice";
import { cardsReducer } from "../features/Cards/cardsSlice";
import { combineReducers } from "redux";
import { packsReducer } from "../features/Packs/packsReducer";
import { userReducer } from "../features/User/userReducer";

export const reducers = {
  auth: authReducer,
  app: appReducer,
  user: userReducer,
  packs: packsReducer,
  cards: cardsReducer,
  cardsModals: cardsModalsReducer,
};

export const rootReducer = combineReducers(reducers);
