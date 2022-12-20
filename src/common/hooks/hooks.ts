import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../app/store";

export type AppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>;
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAllSelector = useSelector<AppStateType>;
