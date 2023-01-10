import { ICard } from "../../common/models";
import { configuredAxios } from "../../common/api/baseAPI";

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

export interface IGetCardsResponse {
  cards: ICard[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
}

export interface IAddCardRequest {
  card: {
    cardsPack_id: string;
    question?: string;
    answer?: string;
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
    question?: string;
    answer?: string;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
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
  return configuredAxios.get<IGetCardsResponse>("/cards/card", requestConfig);
};

const addCardRequest = (data: IAddCardRequest) => {
  return configuredAxios.post("cards/card", data);
};

const deleteCardRequest = (cardID: string) => {
  const requestConfig = {
    params: {
      id: cardID,
    },
  };
  return configuredAxios.delete(`/cards/card/`, requestConfig);
};

const updateCardRequest = (model: IUpdateCardRequest) => {
  return configuredAxios.put("/cards/card", model);
};

const updateCardGradeRequest = (model: IUpdateCardGradeRequest) => {
  return configuredAxios.put<IUpdateGradeResponse>("/cards/grade", model);
};

export const cardsAPI = {
  getCardsRequest,
  addCardRequest,
  deleteCardRequest,
  updateCardRequest,
  updateCardGradeRequest,
};
