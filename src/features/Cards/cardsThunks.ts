import {
  IAddCardRequest,
  IGetCardsRequest,
  IUpdateCardGradeRequest,
  IUpdateCardRequest,
  cardsAPI,
} from "./cardsAPI";

import { AppAC } from "../../app/appSlice";
import { createAppAsyncThunk } from "./../../common/utils/AsyncThunk";
import { errorHandlingThunk } from "./../../common/utils/errorHandlers";
import { setPacksTC } from "../Packs/packsThunks";

export interface IDeleteCardData {
  cardID: string;
  packID: string;
}

export interface IUpdateCardData {
  packID: string;
  model: IUpdateCardRequest;
}

export const getCardsTC = createAppAsyncThunk(
  "cards/getCards",
  async (model: IGetCardsRequest, { dispatch, rejectWithValue }) => {
    return errorHandlingThunk({ dispatch, rejectWithValue }, async () => {
      const { data } = await cardsAPI.getCardsRequest(model);

      return { ...data, cardQuestion: model.cardQuestion };
    });
  }
);

export const addCardTC = createAppAsyncThunk(
  "cards/addCard",
  async (card: IAddCardRequest, { dispatch, getState, rejectWithValue }) => {
    return errorHandlingThunk(
      { dispatch, getState, rejectWithValue },
      async () => {
        const { page, pageCount } = getState().cards;
        const cardsRequestConfig = {
          page,
          pageCount,
          cardsPack_id: card.card.cardsPack_id,
        };
        await cardsAPI.addCardRequest(card);
        dispatch(getCardsTC(cardsRequestConfig));
        dispatch(AppAC.setSuccessMessage({ message: "Successfully added" }));
      }
    );
  }
);

export const deleteCardTC = createAppAsyncThunk(
  "cards/deleteCard",
  async (
    cardData: IDeleteCardData,
    { dispatch, getState, rejectWithValue }
  ) => {
    return errorHandlingThunk(
      { dispatch, getState, rejectWithValue },
      async () => {
        const { page, pageCount } = getState().cards;
        const cardsRequestConfig = {
          page,
          pageCount,
          cardsPack_id: cardData.packID,
        };
        await cardsAPI.deleteCardRequest(cardData.cardID);
        dispatch(getCardsTC(cardsRequestConfig));
        dispatch(AppAC.setSuccessMessage({ message: "Successfully deleted" }));
      }
    );
  }
);

export const updateCardTC = createAppAsyncThunk(
  "cards/updateCard",
  async (
    updateData: IUpdateCardData,
    { dispatch, getState, rejectWithValue }
  ) => {
    return errorHandlingThunk(
      { dispatch, getState, rejectWithValue },
      async () => {
        const { page, pageCount } = getState().cards;
        const cardsRequestConfig = {
          cardsPack_id: updateData.packID,
          page,
          pageCount,
        };
        await cardsAPI.updateCardRequest(updateData.model);
        dispatch(getCardsTC(cardsRequestConfig));
        dispatch(AppAC.setSuccessMessage({ message: "Successfully updated" }));
      }
    );
  }
);

export const updateCardGradeTC = createAppAsyncThunk(
  "cards/updateCardGrade",
  async (model: IUpdateCardGradeRequest, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const { data } = await cardsAPI.updateCardGradeRequest(model);
      return { card_id: model.card_id, grade: data.updatedGrade.grade };
    });
  }
);
