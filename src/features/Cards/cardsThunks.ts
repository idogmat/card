import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import {
  cardsAPI,
  IAddCardRequest,
  IGetCardsRequest,
  IUpdateCardRequest,
} from "./cardsAPI";
import { CardsAC } from "./cardsSlice";
import { AppAC } from "../../app/appReducer";
import { defaultErrorMessage } from "../../common/utils/errorHandlers";

export const getCardsTC = (model: IGetCardsRequest): AppThunkActionType => {
  return async (dispatch) => {
    console.log("IN GET CARDS THUNK");
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
    try {
      dispatch(AppAC.setIsLoading({ isLoading: true }));
      const { page, pageCount } = getState().cards;
      const cardsRequestConfig = {
        page,
        pageCount,
        cardsPack_id: card.card.cardsPack_id,
      };
      const res = await cardsAPI.addCardRequest(card);
      const { data } = await cardsAPI.getCardsRequest(cardsRequestConfig);
      dispatch(AppAC.setSuccessMessage({ message: "Successfully added" }));
      dispatch(CardsAC.setCardsData({ data }));
    } catch (e) {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};

export const deleteCardTC = (
  cardID: string,
  packID: string
): AppThunkActionType => {
  return async (dispatch, getState) => {
    try {
      dispatch(AppAC.setIsLoading({ isLoading: true }));
      const { page, pageCount } = getState().cards;
      const cardsRequestConfig = { page, pageCount, cardsPack_id: packID };
      const res = await cardsAPI.deleteCardRequest(cardID);
      const { data } = await cardsAPI.getCardsRequest(cardsRequestConfig);
      dispatch(CardsAC.setCardsData({ data }));
      dispatch(AppAC.setSuccessMessage({ message: "Successfully deleted" }));
    } catch {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};

export const updateCardTC = (
  packID: string,
  model: IUpdateCardRequest
): AppThunkActionType => {
  return async (dispatch, getState) => {
    try {
      dispatch(AppAC.setIsLoading({ isLoading: true }));
      const { page, pageCount } = getState().cards;
      const cardsRequestConfig = { cardsPack_id: packID, page, pageCount };
      const res = await cardsAPI.updateCardRequest(model);
      const { data } = await cardsAPI.getCardsRequest(cardsRequestConfig);
      dispatch(CardsAC.setCardsData({ data }));
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
      dispatch(AppAC.setSuccessMessage({ message: "Successfully updated" }));
    } catch {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
