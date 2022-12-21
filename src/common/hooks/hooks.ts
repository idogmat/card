import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../app/store";
import { ThunkAction } from "@reduxjs/toolkit";

export type AppThunkActionType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export type AppDispatchType = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAllSelector: TypedUseSelectorHook<RootState> = useSelector;
