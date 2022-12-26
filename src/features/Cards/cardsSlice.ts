import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICard} from "../../common/models";


interface ICardsState {
   cards: ICard[]
}

const initialState: ICardsState = {
   cards: [] as ICard[]
}

const cardsSlice = createSlice({
   name: 'cards',
   initialState,
   reducers: {
      setCards: (draft, action: PayloadAction<{cards: ICard[]}>) => {
         draft.cards = action.payload.cards
      }
   }
})

export const cardsReducer = cardsSlice.reducer
export const CardsAC = cardsSlice.actions