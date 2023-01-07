import {
  packsIsMyPackSelector,
  packsMaxCardsPacksSelector,
  packsMaxSelector,
  packsMinCardsPacksSelector,
  packsMinSelector,
  packsNameSelector,
  packsPageCountSelector,
  packsPageSelector,
  packsSortPacksSelector,
  packsTotalCardsSelector,
} from "../selectors";

import { store } from "app/store";

const state = store.getState();

test("should take pack name from the state", () => {
  const packName = state.packs.packName;

  const result = packsNameSelector(state);

  expect(result).toEqual(packName);
});

test("should take is my pack from the state", () => {
  const isPackMine = state.packs.isMyPack;

  const result = packsIsMyPackSelector(state);

  expect(result).toEqual(isPackMine);
});

test("should take max cards count from the state", () => {
  const maxCardsCount = state.packs.maxCardsCount;

  const result = packsMaxCardsPacksSelector(state);

  expect(result).toEqual(maxCardsCount);
});

test("should take min cards count from the state", () => {
  const minCardsCount = state.packs.minCardsCount;

  const result = packsMinCardsPacksSelector(state);

  expect(result).toEqual(minCardsCount);
});

test("should take count of pages from the state", () => {
  const pageCount = state.packs.pageCount;

  const result = packsPageCountSelector(state);

  expect(result).toEqual(pageCount);
});

test("should take total cards count from the state", () => {
  const totalCardsCount = state.packs.cardPacksTotalCount;

  const result = packsTotalCardsSelector(state);

  expect(result).toEqual(totalCardsCount);
});

test("should take sort value from the state", () => {
  const sortValue = state.packs.sortPacks;

  const result = packsSortPacksSelector(state);

  expect(result).toEqual(sortValue);
});

test("should take selected page from the state", () => {
  const selectedPage = state.packs.page;

  const result = packsPageSelector(state);

  expect(result).toEqual(selectedPage);
});

test("should take max packs count from the state", () => {
  const maxPacksCount = state.packs.max;

  const result = packsMaxSelector(state);

  expect(result).toEqual(maxPacksCount);
});

test("should take min packs count from the state", () => {
  const minPacksCount = state.packs.min;

  const result = packsMinSelector(state);

  expect(result).toEqual(minPacksCount);
});
