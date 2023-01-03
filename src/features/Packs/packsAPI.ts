import { instance } from "../../common/api/baseAPI";

export interface IPackResponse {
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
export interface ResponseGetPacks {
  cardPacks: IPackResponse[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  sortPacks: string;
}

interface IPacksParams {
  packName: string;
  min: string | number;
  max: string | number;
  sortPacks: string;
  page: string | number;
  pageCount: string | number;
  user_id: string;
}

const getPacks = (params: Partial<IPacksParams>) => {
  return instance.get<ResponseGetPacks>("/cards/pack", {
    params,
  });
};
const addPack = (name: string, deckCover: string, isPrivate?: boolean) => {
  const cardsPack = { name, deckCover, private: isPrivate };
  return instance.post("/cards/pack", { cardsPack });
};
const deletePack = (id: string) => {
  return instance.delete(`/cards/pack?id=${id}`);
};
const updatePack = (
  id: string,
  name: string,
  deckCover: string,
  isPrivate?: boolean
) => {
  return instance.put(`/cards/pack`, {
    cardsPack: { _id: id, name, deckCover, private: isPrivate },
  });
};
export const PacksAPI = {
  getPacks,
  addPack,
  deletePack,
  updatePack,
};
