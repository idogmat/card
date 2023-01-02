import { ICard } from "../../common/models";
import { instance } from "../../common/api/baseAPI";

export interface IGetCardsRequest {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: string;
  max?: string;
  sortCards?: string;
  page?: string | number;
  pageCount?: string | number;
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

export interface IUpdateCardRequest {
  card: {
    _id: string;
    question: string;
    answer: string;
  };
}

export interface IUpdateGradeResponse {
  updatedGrade: {
    _id: string;
    cardsPack_id: number;
    card_id: string;
    user_id: string;
    grade: number;
    shots: number;
  };
}

export interface IUpdateCardGradeRequest {
  grade: number;
  card_id: string;
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

const updateCardRequest = (model: IUpdateCardRequest) => {
  return instance.put("/cards/card", model);
};

const updateCardGradeRequest = (model: IUpdateCardGradeRequest) => {
  return instance.put<IUpdateGradeResponse>("/cards/grade", model);
};

export const cardsAPI = {
  getCardsRequest,
  addCardRequest,
  deleteCardRequest,
  updateCardRequest,
  updateCardGradeRequest,
};
