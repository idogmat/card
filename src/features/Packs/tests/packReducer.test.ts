import { packsAC, packsReducer } from "../packsReducer";

import { IPackResponse } from "../packsAPI";
import axios from "axios";

const initialState = {
  cardPacks: [] as IPackResponse[],
  maxCardsCount: 10,
  minCardsCount: 0,
  max: 15,
  min: 0,
  page: 1,
  pageCount: 4,
  sortPacks: { direction: 0, field: "updated" },
  cardPacksTotalCount: 10,
  isMyPack: false,
  packName: "",
};

describe("Packs slice", () => {
  test("setRangeValue", () => {
    const range = [20, 25];
    const changeRangeState = packsReducer(
      initialState,
      packsAC.setRangeValue({ range })
    );

    expect(changeRangeState.min).toBe(range[0]);
    expect(changeRangeState.max).toBe(range[1]);
  });

  test("setPackName", () => {
    const packName = "test";
    const changePackName = packsReducer(
      initialState,
      packsAC.setPackName({ packName })
    );
    expect(changePackName.packName).toBe(packName);
  });

  test("setPacksSort", () => {
    const type = { direction: 0, field: "updated" };
    const changeSortType = packsReducer(
      initialState,
      packsAC.setPacksSort({ type })
    );
    expect(changeSortType.sortPacks).toBe(type);
  });

  test("setPreferencePacks", () => {
    const isMine = true;
    const changeMyPack = packsReducer(
      initialState,
      packsAC.setPreferencePacks({ isMine })
    );
    expect(changeMyPack.isMyPack).toBe(isMine);
  });
  test("setCurrentPage", () => {
    const page = 5;
    const changeCurrentPage = packsReducer(
      initialState,
      packsAC.setCurrentPage({ page })
    );
    expect(changeCurrentPage.page).toBe(page);
  });
  test("setPageCount", () => {
    const pageCount = 7;
    const changePageCount = packsReducer(
      initialState,
      packsAC.setPageCount({ pageCount })
    );
    expect(changePageCount.pageCount).toBe(pageCount);
  });
});
