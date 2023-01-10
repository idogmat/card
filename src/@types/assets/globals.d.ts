import { mockGetCards } from "common/mocks/cardsThunksMocks";

declare global {
  var cardsAPI: {
    getCardsRequest: jest.Mock;
  };
}
