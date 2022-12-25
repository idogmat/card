import { instance } from "../../common/api/baseAPI";
import { AxiosResponse } from "axios";

export interface IPack {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
  deckCover: string;
}
interface ResponseGetPacks {
  cardPacks: IPack[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  sortPacks: string;
}
interface IPacksParams {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
}
interface INewPack {
  name: string;
  deckCover: string;
  isPrivate?: boolean;
}
const getCardsPack = (cardsPack_id: string, params?: IPacksParams) => {
  return instance.get<ResponseGetPacks>("/cards/pack", {
    params,
  });
};
const addPack = (name: string, deckCover: string, isPrivate?: boolean) => {
  return instance
    .post("/cards/pack", {
      cardsPack: { name, deckCover, private: isPrivate },
    })
    .then((e) => {
      console.log(e);
      return e;
    });
};
const deletePack = (id: string) => {
  return instance.delete(`/cards/pack?id=${id}`);
};
export const PacksAPI = {
  getCardsPack,
  addPack,
  deletePack,
};
