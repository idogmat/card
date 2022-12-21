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
  user:{} as UserType
}
const slice = createSlice({
  name:'auth',
  initialState:initialState,
  reducers:{
    loginAC(state,action:PayloadAction<{ value: boolean }>){
      state.isLoggedIn = action.payload.value
    }
  }
})
const authReducer=slice.reducer
export const loginAC= slice.actions.loginAC
export default authReducer
export const loginThunk = (user: UserType): AppThunkActionType => async (dispatch) => {
  try {
    const res = await API.login(user)
    console.log(res)

    dispatch(loginAC({value: true}))

  } catch (e: any) {
    // handleServerNetworkError(e, dispatch)
    console.log(e)
  }
}


