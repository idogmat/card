import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import { initialState, packsAC } from "./packsReducer";
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
      const { pageCount, page, min, max, sortPacks, packName, isMyPack } =
        getState().packs;
      if (Object.keys(model).length === 0) {
        PacksAPI.getPacks({}).then(({ data }) => {
          dispatch(
            packsAC.setPacks({
              packs: data,
              min: 0,
              max: 15,
              packName: "",
              isMyPack,
            })
          );
        });
        return;
      }
      const { _id } = getState().user;
      PacksAPI.getPacks({
        user_id: model.isMyPack === "true" ? _id : "",
        packName: model.packName || packName,
        pageCount: model.pageCount || pageCount,
        page: model.page || page,
        min: model.min || min,
        max: model.max || max,
        sortPacks: !!model?.sortPacks ? model.sortPacks : sortPacks,
      }).then((res) => {
        dispatch(
          packsAC.setPacks({
            packs: res.data,
            min: model.min || min,
            max: model.max || max,
            packName: packName,
            isMyPack: model.isMyPack === "true" ? true : false,
          })
        );
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
      const { isMyPack } = getState().packs;
      PacksAPI.addPack(name, deckCover, isPrivate).then((res) => {
        dispatch(
          setPacksTC({
            isMyPack: isMyPack ? "true" : "false",
          })
        );
        dispatch(AppAC.setSuccessMessage({ message: "Successfully updated" }));
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
      dispatch(
        setPacksTC({
          pageCount,
          page,
          min,
          max,
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
