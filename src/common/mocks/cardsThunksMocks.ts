import { IGetCardsRequest, IGetCardsResponse } from "features/Cards/cardsAPI";

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

export const mockGetCards: IGetCardsResponse = {
  cards: [mockCard],
  cardsTotalCount: 1,
  maxGrade: 1,
  minGrade: 1,
  page: 1,
  pageCount: 1,
  packUserId: "",
};
