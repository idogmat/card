import { IPackResponse } from "./packsAPI";
import { packsAC, packsReducer } from "./packsReducer";
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
test("setRangeValue/setPackName/setPacksSort/setPreferencePacks", () => {
  const range = [20, 25];
  const isMine = true;
  const type = 1;
  const packName = "test";
  const page = 5;
  const pageCount = 7;
  const changeRangeState = packsReducer(
    initialState,
    packsAC.setRangeValue({ range })
  );
  const changeMyPack = packsReducer(
    initialState,
    packsAC.setPreferencePacks({ isMine })
  );
  const changeSortType = packsReducer(
    initialState,
    packsAC.setPacksSort({ type: { direction: 0, field: "updated" } })
  );
  const changePackName = packsReducer(
    initialState,
    packsAC.setPackName({ packName })
  );
  const changeCurrentPage = packsReducer(
    initialState,
    packsAC.setCurrentPage({ page })
  );
  const changePageCount = packsReducer(
    initialState,
    packsAC.setPageCount({ pageCount })
  );

  expect(changeRangeState.min).toBe(range[0]);
  expect(changeRangeState.max).toBe(range[1]);
  expect(changeMyPack.isMyPack).toBe(isMine);
  expect(changeSortType.sortPacks.direction).toBe(type);
  expect(changePackName.packName).toBe(packName);
  expect(changeCurrentPage.page).toBe(page);
  expect(changePageCount.pageCount).toBe(pageCount);
});
