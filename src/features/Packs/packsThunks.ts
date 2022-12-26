import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import {
  setCurrentPage,
  setPacks,
  setPageCount,
  setPreferencePacks,
} from "./packsReducer";

export const setPacksTC = (): AppThunkActionType => {
  return (dispatch, getState) => {
    try {
      const { pageCount, page, min, max, isMyPack } = getState().packs;
      const { _id } = getState().user;
      PacksAPI.getPacks({
        user_id: isMyPack ? _id : "",
        pageCount,
        page,
        min,
        max,
      }).then((res) => {
        dispatch(setPacks({ packs: res.data }));
        dispatch(setCurrentPage({ page: res.data.page }));
        dispatch(setPageCount({ pageCount: res.data.pageCount }));
        dispatch(setPreferencePacks({ param: isMyPack ? "my" : "all" }));
      });
    } catch (e) {}
  };
};
export const addPackTC = (
  name: string,
  deckCover: string,
  isPrivate?: boolean
): AppThunkActionType => {
  return async (dispatch) => {
    try {
      const { data } = await PacksAPI.addPack(name, deckCover, isPrivate);
      console.log(data);
    } catch (e) {}
  };
};
export const removePackTC = (id: string): AppThunkActionType => {
  return async (dispatch) => {
    try {
      const { data } = await PacksAPI.deletePack(id);
      dispatch(setPacksTC());
    } catch (e) {}
  };
};
