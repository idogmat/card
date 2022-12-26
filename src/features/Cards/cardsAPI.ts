import {instance} from "../../common/api/baseAPI";
import {ICard} from "../../common/models";

export interface IGetCardsRequest {
   cardAnswer?: string,
   cardQuestion?: string,
   cardsPack_id: string,
   min?: string,
   max?: string,
   sortCards?: string,
   page: string | number,
   pageCount: string | number,
}

interface IGetCardsResponse {
   cards: ICard[],
   cardsTotalCount: 3,
   maxGrade: number,
   minGrade: number,
   page: number,
   pageCount: number,
   packUserId: string,
}

const getCardsRequest = (data: IGetCardsRequest) => {
   const requestConfig = {params: data}
   return instance.get<IGetCardsResponse>('/cards/card', requestConfig)
}


export const cardsAPI = {
   getCardsRequest
}