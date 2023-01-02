import { RootState } from "./store";

export const appStateSelect = (state: RootState) => state.app;
export const userStateSelect = (state: RootState) => state.user;
export const packsNameSelector = (state: RootState) => state.packs.packName;
export const packsIsMyPackSelector = (state: RootState) => state.packs.isMyPack;
export const packsMaxSelector = (state: RootState) => state.packs.max;
export const packsMinSelector = (state: RootState) => state.packs.min;
export const packsPageSelector = (state: RootState) => state.packs.page;
export const packsSortPacksSelector = (state: RootState) =>
  state.packs.sortPacks;
export const packsTotalCardsSelector = (state: RootState) =>
  state.packs.cardPacksTotalCount;
export const packsPageCountSelector = (state: RootState) =>
  state.packs.pageCount;
export const packsCardsPacksSelector = (state: RootState) =>
  state.packs.cardPacks;
export const packsMaxCardsPacksSelector = (state: RootState) =>
  state.packs.maxCardsCount;
export const packsMinCardsPacksSelector = (state: RootState) =>
  state.packs.minCardsCount;
