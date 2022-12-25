import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import { setPacks } from "./packsReducer";

export const setPacksTC = (id: string): AppThunkActionType => {
  return async (dispatch, getState) => {
    try {
      const { pageCount, page, min, max } = getState().packs;
      const res = await PacksAPI.getCardsPack(id, {
        pageCount,
        page,
        min,
        max,
      });
      console.log(res);
      dispatch(setPacks({ packs: res.data }));
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
      console.log(data);
    } catch (e) {}
  };
};
