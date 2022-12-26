import {AppThunkActionType} from "../../common/hooks/useAllSelector";
import {cardsAPI, IGetCardsRequest} from "./cardsAPI";
import {CardsAC} from "./cardsSlice";
import {AppAC} from "../../app/appReducer";
import {defaultErrorMessage} from "../../common/utils/errorHandlers";

export const getCardsTC = (model: IGetCardsRequest): AppThunkActionType => {
   return async (dispatch) => {
      try {
         dispatch(AppAC.setIsLoading({isLoading: true}))
         const {data} = await cardsAPI.getCardsRequest(model)
         dispatch(CardsAC.setCards({cards: data.cards}))
      } catch (e) {
         dispatch(AppAC.setError({error: defaultErrorMessage}))
      } finally {
         dispatch(AppAC.setIsLoading({isLoading: false}))
      }
   }
}