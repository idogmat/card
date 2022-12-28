import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import { initialState, setPacks } from "./packsReducer";
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
export const setPacksTC = (
  model: Partial<IGetModel>,
  rem: boolean
): AppThunkActionType => {
  return (dispatch, getState) => {
    dispatch(AppAC.setIsLoading({ isLoading: true }));
    try {
      const { _id } = getState().user;
      const { pageCount, page, min, max, isMyPack, sortPacks, packName } =
        getState().packs;
      if (rem) {
        console.log(model.isMyPack === "true" ? _id : "");
        PacksAPI.getPacks({}).then((res) => {
          console.log(res, "set");
          dispatch(
            setPacks({
              packs: res.data,
              min: initialState.min,
              max: initialState.max,
            })
          );
        });
      } else {
        PacksAPI.getPacks({
          user_id: model.isMyPack === "true" ? _id : "",
          packName: model.packName || packName,
          pageCount: model.pageCount || pageCount,
          page: model.page || page,
          min: model.min || max,
          max: model.max || min,
          sortPacks: !!model?.sortPacks ? model.sortPacks : sortPacks,
        }).then((res) => {
          console.log(res, " false");
          dispatch(
            setPacks({
              packs: res.data,
              min: model.min || min,
              max: model.max || max,
            })
          );
        });
      }
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
      const { pageCount, page, min, max, isMyPack, sortPacks, packName } =
        getState().packs;
      PacksAPI.addPack(name, deckCover, isPrivate).then((res) => {
        if (res.statusText === "Created") {
          dispatch(
            setPacksTC(
              {
                pageCount,
                page,
                min: min,
                max: max,
                isMyPack: isMyPack ? "true" : "false",
                sortPacks,
                packName,
              },
              false
            )
          );
          dispatch(
            AppAC.setSuccessMessage({ message: "Successfully updated" })
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
      const { pageCount, page, min, max, isMyPack, sortPacks, packName } =
        getState().packs;
      console.log(isMyPack);
      dispatch(
        setPacksTC(
          {
            pageCount,
            page,
            min: min,
            max: max,
            isMyPack: isMyPack ? "true" : "false",
            sortPacks,
            packName,
          },
          false
        )
      );
      dispatch(AppAC.setSuccessMessage({ message: "Successfully updated" }));
    } catch {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
