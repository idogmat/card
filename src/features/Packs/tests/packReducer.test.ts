import {initialState, packsAC, packsInitialState, packsReducer} from "../packsReducer";
import {setPacksTC} from "../packsThunks";


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
describe("packs extra reducers", () => {
  test("packsInitialState check default type", () => {
    const result = packsReducer(undefined, {type: ""});

    expect(result).toEqual(packsInitialState);
  });
  test("should set packs changed with setPacks action", () => {
    const action = {
        max: 20,
        min: 10,
        packName: 'string',
        isMyPack: "false",
        sortPacks: { direction: 1, field: "updated" }
    }
    const finalState = packsReducer(
      packsInitialState,
      setPacksTC.fulfilled(action, "", { ...action })
    );

    expect(finalState.max).toEqual(action.max);
    expect(finalState.min).toEqual(action.min);
    expect(finalState.packName).toEqual(action.packName);
    expect(finalState.sortPacks).toEqual(action.sortPacks);
    expect(finalState.isMyPack).toEqual(action.isMyPack);
  });
})
