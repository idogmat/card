import {AuthAC, authReducer, IAuthState} from "./authReducer";

const initialState: IAuthState = {
   isAuth: false
}

test('isAuth should switch to true', () => {
   const finalState = authReducer(initialState, AuthAC.setIsAuth({isAuth: true}))
   expect(finalState.isAuth).toBe(true)
})