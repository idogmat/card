import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {API} from "../../api/auth";
import {AppThunkActionType} from "../../common/hooks/hooks";
import {loginAC} from "./loginReducer";


const initialState = {

  isInitialized: false as boolean,
}
const slice = createSlice({
  name:'app',
  initialState:initialState,
  reducers:{

    setInitializedAC(state,action:PayloadAction<{ initialized:boolean }>){
      state.isInitialized = action.payload.initialized
    },
  }

})
const appReducer=slice.reducer
export const setInitializedAC= slice.actions.setInitializedAC
export default appReducer

export const AuthMeThunk = (): AppThunkActionType => async (dispatch) => {
  try {
    const res = await API.authMe()
    console.log(res)
    dispatch(setInitializedAC({initialized: true}))
    dispatch(loginAC({isLoggedIn: true}))

  } catch (e: any) {

    console.log(e)
  }
}
