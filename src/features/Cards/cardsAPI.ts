import { instance } from "../../common/api/baseAPI";
import { ICard } from "../../common/models";

export interface IGetCardsRequest {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: string;
  max?: string;
  sortCards?: string;
  page: string | number;
  pageCount: string | number;
}

interface IGetCardsResponse {
  cards: ICard[];
  cardsTotalCount: 3;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
}

export interface IAddCardRequest {
  card: {
    cardsPack_id: string;
    question: string;
    answer: string;
    grade?: number;
    shots?: number;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
  };
}

const getCardsRequest = (data: IGetCardsRequest) => {
  const requestConfig = { params: data };
  return instance.get<IGetCardsResponse>("/cards/card", requestConfig);
};

const addCardRequest = (data: IAddCardRequest) => {
  return instance.post("cards/card", data);
};

const deleteCardRequest = (cardID: string) => {
  const requestConfig = {
    params: {
      id: cardID,
    },
  };
  return instance.delete(`/cards/card/`, requestConfig);
};

export const cardsAPI = {
  getCardsRequest,
  addCardRequest,
  deleteCardRequest,
};
