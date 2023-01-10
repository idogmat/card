import {
  IAddCardRequest,
  IGetCardsRequest,
  IGetCardsResponse,
  IUpdateCardGradeRequest,
  IUpdateGradeResponse,
} from "features/Cards/cardsAPI";
import { IDeleteCardData, IUpdateCardData } from "features/Cards/cardsThunks";

export const mockGetCardsModel: IGetCardsRequest = {
  cardAnswer: "",
  cardQuestion: "",
  cardsPack_id: "",
  min: "",
  max: "",
  sortCards: "",
  page: 1,
  pageCount: 1,
};

export const mockCard = {
  answer: "",
  question: "",
  cardsPack_id: "",
  grade: 1,
  shots: 1,
  user_id: "",
  created: new Date(),
  updated: new Date(),
  _id: "",
  answerImg: "",
  questionImg: "",
};

export const mockAddCard: IAddCardRequest = {
  card: {
    cardsPack_id: "",
  },
};

export const mockDeleteCard: IDeleteCardData = {
  cardID: "",
  packID: "",
};

export const mockUpdateCard: IUpdateCardData = {
  packID: "",
  model: {
    card: { _id: "" },
  },
};

export const mockGetCards: IGetCardsResponse = {
  cards: [mockCard],
  cardsTotalCount: 1,
  maxGrade: 1,
  minGrade: 1,
  page: 1,
  pageCount: 1,
  packUserId: "",
};

export const mockUpdateCardGradeResponse: IUpdateGradeResponse = {
  updatedGrade: {
    _id: "",
    cardsPack_id: 1,
    card_id: "",
    user_id: "",
    grade: 1,
    shots: 1,
  },
};
export const mockUpdateCardGradeRequest: IUpdateCardGradeRequest = {
  grade: 1,
  card_id: "",
};
