import { AppAC } from "../../app/appReducer";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import { defaultErrorMessage } from "../../common/utils/errorHandlers";
import { packsAC } from "./packsReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
export const setPacks = createAsyncThunk<
  unknown,
  Partial<IGetModel>,
  { state: RootState }
>("packs/setPacks", async (model: Partial<IGetModel>, thunkAPI) => {
  try {
    thunkAPI.dispatch(AppAC.setIsLoading({ isLoading: true }));
    // debugger;
    const { pageCount, page, min, max, sortPacks, packName, isMyPack } =
      thunkAPI.getState().packs;
    if (Object.keys(model).length === 0) {
      thunkAPI.dispatch(getDefaultPacksData({}));
      return;
    }
    const { _id } = thunkAPI.getState().user;
    const res = await PacksAPI.getPacks({
      user_id: model.isMyPack === "true" || isMyPack ? _id : "",
      packName: model.packName || packName,
      pageCount: model.pageCount || pageCount,
      page: model.page || page,
      min: model.min || min,
      max: model.max || max,
      sortPacks: !!model?.sortPacks ? model.sortPacks : sortPacks,
    });

    thunkAPI.dispatch(
      packsAC.setPacks({
        packs: res.data,
        min: model.min || min,
        max: model.max || max,
        packName: model.packName || packName,
        isMyPack: model.isMyPack === "true" || isMyPack,
      })
    );
  } catch {
    thunkAPI.dispatch(AppAC.setError({ error: defaultErrorMessage }));
  } finally {
    thunkAPI.dispatch(AppAC.setIsLoading({ isLoading: false }));
  }
});

// export const setPacksTC = (model: Partial<IGetModel>): AppThunkActionType => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(AppAC.setIsLoading({ isLoading: true }));
//       // debugger;
//       const { pageCount, page, min, max, sortPacks, packName, isMyPack } =
//         getState().packs;
//       if (Object.keys(model).length === 0) {
//         dispatch(getDefaultPacksData({}));
//         return;
//       }
//       const { _id } = getState().user;
//       const res = await PacksAPI.getPacks({
//         user_id: model.isMyPack === "true" || isMyPack ? _id : "",
//         packName: model.packName || packName,
//         pageCount: model.pageCount || pageCount,
//         page: model.page || page,
//         min: model.min || min,
//         max: model.max || max,
//         sortPacks: !!model?.sortPacks ? model.sortPacks : sortPacks,
//       });
//
//       dispatch(
//         packsAC.setPacks({
//           packs: res.data,
//           min: model.min || min,
//           max: model.max || max,
//           packName: model.packName || packName,
//           isMyPack: model.isMyPack === "true" || isMyPack,
//         })
//       );
//     } catch {
//       dispatch(AppAC.setError({ error: defaultErrorMessage }));
//     } finally {
//       dispatch(AppAC.setIsLoading({ isLoading: false }));
//     }
//   };
// };
export const addPackTC =
  (name: string, deckCover: string, isPrivate?: boolean): AppThunkActionType =>
  async (dispatch, getState) => {
    dispatch(AppAC.setIsLoading({ isLoading: true }));
    try {
      const { isMyPack } = getState().packs;
      PacksAPI.addPack(name, deckCover, isPrivate).then((res) => {
        dispatch(setPacks({ isMyPack: isMyPack ? "true" : "false" }));
        dispatch(AppAC.setSuccessMessage({ message: "Successfully updated" }));
      });
    } catch {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };

export const removePackTC = (id: string): AppThunkActionType => {
  return async (dispatch, getState) => {
    dispatch(AppAC.setIsLoading({ isLoading: true }));
    try {
      const { data } = await PacksAPI.deletePack(id);
      const { isMyPack } = getState().packs;
      dispatch(setPacks({ isMyPack: isMyPack ? "true" : "false" }));
      dispatch(AppAC.setSuccessMessage({ message: "Successfully updated" }));
    } catch {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    } finally {
      dispatch(AppAC.setIsLoading({ isLoading: false }));
    }
  };
};
export const getDefaultPacksData = (
  model: Partial<IGetModel>
): AppThunkActionType => {
  return (dispatch) => {
    try {
      PacksAPI.getPacks({}).then(({ data }) => {
        dispatch(
          packsAC.setPacks({
            packs: data,
            min: 0,
            max: 15,
            packName: "",
            isMyPack: false,
          })
        );
      });
    } catch {
      dispatch(AppAC.setError({ error: defaultErrorMessage }));
    }
  };
};
