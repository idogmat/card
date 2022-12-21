import {createSlice, PayloadAction} from "@reduxjs/toolkit";
<<<<<<< HEAD
=======

>>>>>>> fd76c21 (k)
import {API} from "../../api/auth";
import {AppThunkActionType} from "../../common/hooks/hooks";

export type UserType = {
  email: string
  password: string
  rememberMe?: boolean
}
const initialState = {
  isLoggedIn: false as boolean,

}
const slice = createSlice({
  name:'auth',
  initialState:initialState,
  reducers:{
    loginAC(state,action:PayloadAction<{ isLoggedIn: boolean }>){
      state.isLoggedIn = action.payload.isLoggedIn
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

    dispatch(loginAC({isLoggedIn: true}))

  } catch (e: any) {
    // handleServerNetworkError(e, dispatch)
    console.log(e)
  }
}


<<<<<<< HEAD
=======
    console.log(e)
  }
}
// export const AuthMeThunk = (): AppThunkActionType => async (dispatch) => {
//   try {
//     const res = await API.authMe()
//     console.log(res)
//     dispatch(loginAC({isLoggedIn: true}))
//
//   } catch (e: any) {
//
//     console.log(e)
//   }
// }
>>>>>>> fd76c21 (k)
