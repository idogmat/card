import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import { setPacks } from "./packsReducer";
import { AppAC } from "../../app/appReducer";

export const setPacksTC = (): AppThunkActionType => {
  return (dispatch, getState) => {
    try {
      const {
        pageCount,
        page,
        minCardsCount,
        maxCardsCount,
        isMyPack,
        sortPacks,
        packName,
      } = getState().packs;
      const { _id } = getState().user;
      PacksAPI.getPacks({
        user_id: isMyPack ? _id : "",
        packName,
        pageCount,
        page,
        min: minCardsCount,
        max: maxCardsCount,
        sortPacks,
      }).then((res) => {
        console.log(res);
        dispatch(setPacks({ packs: res.data }));
      });
    } catch (e: any) {
      dispatch(AppAC.setError({ error: e.message }));
    }
  };
};
export const addPackTC = (
  name: string,
  deckCover: string,
  isPrivate?: boolean
): AppThunkActionType => {
  return async (dispatch) => {
    try {
      PacksAPI.addPack(name, deckCover, isPrivate).then((res) => {
        if (res.statusText === "Created") {
          dispatch(setPacksTC());
        } else {
          dispatch(AppAC.setError({ error: "err" }));
        }
      });
    } catch (e: any) {
      dispatch(AppAC.setError({ error: e.message }));
    }
  };
};
export const removePackTC = (id: string): AppThunkActionType => {
  return async (dispatch) => {
    try {
      const { data } = await PacksAPI.deletePack(id);
      dispatch(setPacksTC());
    } catch (e: any) {
      dispatch(AppAC.setError({ error: e.message }));
    }
  };
};
