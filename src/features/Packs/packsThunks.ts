import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import { setPacks, setRangeValue } from "./packsReducer";
import { AppAC } from "../../app/appReducer";
import { defaultErrorMessage } from "../../common/utils/errorHandlers";
interface IGetModel {
  page: string | number;
  pageCount: string | number;
  max: string | number;
  min: string | number;
  isMyPack: string;
  sortPacks: string;
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
        packName,
        pageCount: !!model?.pageCount ? +model.pageCount : pageCount,
        page: !!model?.page ? +model.page : page,
        min: !!model?.min ? +model.min : minCardsCount,
        max: !!model?.max ? +model.max : maxCardsCount,
        sortPacks: model?.sortPacks,
      }).then((res) => {
        console.log(res);
        dispatch(setPacks({ packs: res.data }));
        // dispatch(setRangeValue({ range: [minCardsCount, maxCardsCount] }));
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
      const { page, pageCount, minCardsCount, maxCardsCount, sortPacks } =
        getState().packs;
      PacksAPI.addPack(name, deckCover, isPrivate).then((res) => {
        if (res.statusText === "Created") {
          dispatch(
            setPacksTC({
              page,
              pageCount,
              min: minCardsCount,
              max: maxCardsCount,
              sortPacks,
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
      const { data } = await PacksAPI.deletePack(id);
      const { page, pageCount, minCardsCount, maxCardsCount, sortPacks } =
        getState().packs;
      dispatch(
        setPacksTC({
          page,
          pageCount,
          min: minCardsCount,
          max: maxCardsCount,
          sortPacks,
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
