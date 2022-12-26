import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { cardsAPI, IAddCardRequest, IGetCardsRequest } from "./cardsAPI";
import { CardsAC } from "./cardsSlice";
import { AppAC } from "../../app/appReducer";
import { defaultErrorMessage } from "../../common/utils/errorHandlers";

export const getCardsTC = (model: IGetCardsRequest): AppThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(AppAC.setIsLoading({ isLoading: true }));
      const { data } = await cardsAPI.getCardsRequest(model);
      dispatch(CardsAC.setCardsData({ data }));
    } catch (e) {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};

export const addCardTC = (card: IAddCardRequest): AppThunkActionType => {
  return async (dispatch, getState) => {
    const { page, pageCount } = getState().cards;
    const model = { page, pageCount, cardsPack_id: card.card.cardsPack_id };
    const res = await cardsAPI.addCardRequest(card);
    const { data } = await cardsAPI.getCardsRequest(model);
    dispatch(CardsAC.setCardsData({ data }));
  };
};

export const deleteCardTC = (
  cardID: string,
  packID: string
): AppThunkActionType => {
  return async (dispatch, getState) => {
    const { page, pageCount } = getState().cards;
    const model = { page, pageCount, cardsPack_id: packID };
    const res = await cardsAPI.deleteCardRequest(cardID);
    const { data } = await cardsAPI.getCardsRequest(model);
    dispatch(CardsAC.setCardsData({ data }));
  };
};
