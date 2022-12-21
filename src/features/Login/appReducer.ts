import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {API} from "../../api/auth";
import {AppThunkActionType} from "../../common/hooks/hooks";

export type UserType = {
  email: string
  password: string
  rememberMe?: boolean
}
const initialState = {
  isLoggedIn: false as boolean,
  isInitialized: false as boolean,
}
const slice = createSlice({
  name:'auth',
  initialState:initialState,
  reducers:{
    loginAC(state,action:PayloadAction<{ isLoggedIn: boolean }>){
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setInitializedAC(state,action:PayloadAction<{ initialized:boolean }>){
      state.isInitialized = action.payload.initialized
    },
  }

})
const authReducer=slice.reducer
export const loginAC= slice.actions.loginAC
export const setInitializedAC= slice.actions.setInitializedAC
export default authReducer
export const loginThunk = (user: UserType): AppThunkActionType => async (dispatch) => {
  try {
    const res = await API.login(user)
    console.log(res)

    dispatch(loginAC({isLoggedIn: true}))

  } catch (e: any) {
    // handleServerNetworkError(e, dispatch)
    console.log(e)
  }
}
export const registrationThunk = (user: UserType): AppThunkActionType => async (dispatch) => {
  try {
    const res = await API.register(user)
    console.log(res)

  } catch (e: any) {

    console.log(e)
  }
}
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
