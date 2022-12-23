import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AnyAction } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export type AppThunkActionType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export const useAllSelector: TypedUseSelectorHook<RootState> = useSelector;
