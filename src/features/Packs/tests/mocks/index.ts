import { IGetModel } from "../../packsThunks";
//packsThunksMocks
export const APIPackMock = {
  _id: "63601a71c2a7d73c18c32f50",
  user_id: "634d7464b8d71d2d44433e40",
  user_name: "pasha1",
  private: false,
  name: "1111",
  path: "/def",
  grade: 0,
  shots: 0,
  cardsCount: 1,
  type: "pack",
  rating: 0,
  created: "2022-10-31T18:56:49.530Z",
  updated: "2022-10-31T18:57:06.446Z",
  more_id: "634d7464b8d71d2d44433e40",
  __v: 0,
};
export const APIPacksMock = {
  cardPacks: [APIPackMock],

};
export const PacksModelMock = {
  packName: "",
  min: "",
  max: "",
  sortPacks: { direction: 0, field: "updated" },
  page: "",
  pageCount: "",
  user_id: "",
};
export const payloadMock = {
  isMyPack: false,
  max: 15,
  min: 0,
  packName: "",
  packs: {cardPacks: [APIPackMock]},
  sortPacks: { direction: 0, field: "updated" },


};
export const mockPacksModel: Partial<IGetModel> = {
  isMyPack: "false",
  sortPacks: { direction: 0, field: "updated" },
  packName: "",
  min: 0,
  max: 99,
  page: 1,
  pageCount: 4,
  user_id: "",
};
export const fieldsMock = {
  id:"1111",
  name: "Jack/Pack",
  deckCover: "nope",
  isPrivate: false,
};