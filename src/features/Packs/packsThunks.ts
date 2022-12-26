import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import { setPacks, setRangeValue } from "./packsReducer";
import { AppAC } from "../../app/appReducer";
interface IGetModel {
  currentPage: string;
  showPerPage: string;
  max: string;
  min: string;
  isMyPack: string;
}
export const setPacksTC = (model?: Partial<any>): AppThunkActionType => {
  return (dispatch, getState) => {
    try {
      // if (!!model) {
      //   PacksAPI.getPacks(model).then((res) => {
      //     console.log(res);
      //     dispatch(setPacks({ packs: res.data }));
      //     // dispatch(setRangeValue({ range: [res.data.minCardsCount, res.data.maxCardsCount]}));
      //   });
      // } else {

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
        pageCount: !!model?.pageCount ? model?.pageCount : pageCount,
        page: !!model?.page ? model?.page : page,
        min: !!model?.min ? model?.min : minCardsCount,
        max: !!model?.max ? model?.max : maxCardsCount,
        sortPacks,
      }).then((res) => {
        console.log(res);
        dispatch(setPacks({ packs: res.data }));
        // dispatch(setRangeValue({ range: [minCardsCount, maxCardsCount] }));
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
