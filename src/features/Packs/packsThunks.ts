import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import { setPacks, setRangeValue } from "./packsReducer";
import { AppAC } from "../../app/appReducer";
import { defaultErrorMessage } from "../../common/utils/errorHandlers";
interface IGetModel {
  page: string | number;
  packName: string;
  pageCount: string | number;
  max: string | number;
  min: string | number;
  isMyPack: string;
  sortPacks: string;
  user_id: string;
}
export const setPacksTC = (model: Partial<IGetModel>): AppThunkActionType => {
  return (dispatch, getState) => {
    dispatch(AppAC.setIsLoading({ isLoading: true }));
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
        user_id: model?.isMyPack === "true" ? _id : "",
        packName: !!model?.packName ? model.packName : packName,
        pageCount: !!model?.pageCount ? model.pageCount : pageCount,
        page: !!model?.page ? model.page : page,
        min: !!model?.min ? model.min : minCardsCount,
        max: !!model?.max ? model.max : maxCardsCount,
        sortPacks: !!model?.sortPacks ? model.sortPacks : sortPacks,
      }).then((res) => {
        console.log(res);
        dispatch(setPacks({ packs: res.data }));
      });
    } catch {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
export const addPackTC = (
  name: string,
  deckCover: string,
  isPrivate?: boolean
): AppThunkActionType => {
  return async (dispatch, getState) => {
    dispatch(AppAC.setIsLoading({ isLoading: true }));
    try {
      const { _id } = getState().user;
      const {
        pageCount,
        page,
        minCardsCount,
        maxCardsCount,
        isMyPack,
        sortPacks,
        packName,
      } = getState().packs;
      PacksAPI.addPack(name, deckCover, isPrivate).then((res) => {
        if (res.statusText === "Created") {
          dispatch(
            setPacksTC({
              pageCount,
              page,
              min: minCardsCount,
              max: maxCardsCount,
              isMyPack: isMyPack ? "true" : "false",
              sortPacks,
              packName,
            })
          );
        } else {
          dispatch(AppAC.setError({ error: defaultErrorMessage }));
        }
      });
    } catch {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
export const removePackTC = (id: string): AppThunkActionType => {
  return async (dispatch, getState) => {
    dispatch(AppAC.setIsLoading({ isLoading: true }));
    try {
      const { _id } = getState().user;
      const { data } = await PacksAPI.deletePack(id);
      const {
        pageCount,
        page,
        minCardsCount,
        maxCardsCount,
        isMyPack,
        sortPacks,
        packName,
      } = getState().packs;
      console.log(isMyPack);
      dispatch(
        setPacksTC({
          pageCount,
          page,
          min: minCardsCount,
          max: maxCardsCount,
          isMyPack: isMyPack ? "true" : "false",
          sortPacks,
          packName,
        })
      );
      dispatch(AppAC.setSuccessMessage({ message: "Successfully updated" }));
    } catch {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
