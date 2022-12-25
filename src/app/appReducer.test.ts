import {AppAC, appReducer, IAppState} from "./appReducer";

const initialState: IAppState = {
   isLoading: false,
   error: null,
   successMessage: null,
   isInit: false,
}

test("isLoading should be set to true", () => {
   const finalState = appReducer(initialState, AppAC.setIsLoading({isLoading: true}))
   expect(finalState.isLoading).toBe(true)
})
test('error should be set to string', () => {
   const error = 'error placeholder'
   const finalState = appReducer(initialState, AppAC.setError({error}))
   expect(finalState.error).toBe(error)
})
test('successMessage should be set to string', () => {
   const message = 'error placeholder'
   const finalState = appReducer(initialState, AppAC.setSuccessMessage({message}))
   expect(finalState.successMessage).toBe(message)
})
test('isInit should be set to true', () => {
   const finalState = appReducer(initialState, AppAC.setIsInit({isInit: true}))
   expect(finalState.isInit).toBe(true)
})