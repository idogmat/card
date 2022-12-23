import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../app/store";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";

export type AppDispatchType = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = useDispatch<AppDispatchType>;
