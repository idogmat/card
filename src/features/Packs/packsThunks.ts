import { AppAC } from "../../app/appReducer";
import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import {
  defaultErrorMessage,
  errorHandlingThunk,
} from "../../common/utils/errorHandlers";
import { packsAC } from "./packsReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { createAppAsyncThunk } from "../../common/utils/AsyncThunk";

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
export const setPacks = createAppAsyncThunk(
  "packs/setPacks",
  async (model: Partial<IGetModel>, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      thunkAPI.dispatch(AppAC.setIsLoading({ isLoading: true }));
      const { pageCount, page, min, max, sortPacks, packName, isMyPack } =
        thunkAPI.getState().packs;
      if (Object.keys(model).length === 0) {
        const res = await PacksAPI.getPacks({});
        return {
          packs: res.data,
          min: 0,
          max: 15,
          packName: "",
          isMyPack: "",
        };
      } else {
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
        return {
          packs: res.data,
          min: model.min || min,
          max: model.max || max,
          packName: model.packName || packName,
          isMyPack: model.isMyPack === "true" || isMyPack,
        };
      }
    });
  }
);

export const addPackTC = createAppAsyncThunk(
  "packs/addPack",
  async (
    fields: { name: string; deckCover: string; isPrivate?: boolean },
    thunkAPI
  ) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const { isMyPack } = thunkAPI.getState().packs;
      PacksAPI.addPack(fields.name, fields.deckCover, fields.isPrivate).then(
        (res) => {
          thunkAPI.dispatch(
            setPacks({ isMyPack: isMyPack ? "true" : "false" })
          );
          thunkAPI.dispatch(
            AppAC.setSuccessMessage({ message: "Successfully updated" })
          );
        }
      );
    });
  }
);
export const removePackTC = createAppAsyncThunk(
  "packs/removePack",
  async (id: string, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const { data } = await PacksAPI.deletePack(id);
      const { isMyPack } = thunkAPI.getState().packs;
      thunkAPI.dispatch(setPacks({ isMyPack: isMyPack ? "true" : "false" }));
      thunkAPI.dispatch(
        AppAC.setSuccessMessage({ message: "Successfully updated" })
      );
    });
  }
);
export const updatePackTC = createAppAsyncThunk(
  "packs/updatePack",
  async (
    fields: {
      id: string;
      name: string;
      deckCover: string;
      isPrivate?: boolean;
    },
    thunkAPI
  ) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const { data } = await PacksAPI.updatePack(
        fields.id,
        fields.name,
        fields.deckCover
      );
      const { isMyPack } = thunkAPI.getState().packs;
      thunkAPI.dispatch(setPacks({ isMyPack: isMyPack ? "true" : "false" }));
      thunkAPI.dispatch(
        AppAC.setSuccessMessage({ message: "Successfully updated" })
      );
    });
  }
);
