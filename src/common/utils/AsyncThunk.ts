import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AppDispatchType } from "../hooks/useAppDispatch";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatchType;
  rejectValue: any;
}>();
