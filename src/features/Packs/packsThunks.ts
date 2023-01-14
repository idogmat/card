import { errorHandlingThunk } from "../../common/utils/errorHandlers";

import { AppAC } from "../../app/appSlice";
import { PacksAPI } from "./packsAPI";
import { createAppAsyncThunk } from "../../common/utils/AsyncThunk";

export interface IParams {
  [p: string]: string;
}
export interface IGetModel {
  page: string | number;
  packName: string;
  pageCount: string | number;
  max: string | number;
  min: string | number;
  isMyPack: string;
  sortPacks: { direction?: number; field?: string };
  user_id: string;
}
export const setPacksTC = createAppAsyncThunk(
  "packs/setPacks",
  async (model: Partial<IGetModel>, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const { pageCount, page, min, max, sortPacks, packName, isMyPack } =
        thunkAPI.getState().packs;
      if (Object.keys(model).length === 0) {
        const res = await PacksAPI.getPacks({});
        return {
          packs: res.data,
          min: 0,
          max: 15,
          packName: "",
          isMyPack: false,
          sortPacks: { direction: 0, field: "updated" },
        };
      } else {
        const { _id } = thunkAPI.getState().user;
        const res = await PacksAPI.getPacks({
          user_id: isMyPack ? _id : "",
          packName: model.packName || packName,
          pageCount: model.pageCount || pageCount,
          page: model.page || page,
          min: model.min || min,
          max: model.max || max,
          sortPacks: !!model?.sortPacks?.field
            ? model.sortPacks.direction + model.sortPacks.field
            : sortPacks.direction + sortPacks.field,
        });
        return {
          packs: res.data,
          min: model.min || min,
          max: model.max || max,
          packName: model.packName || packName,
          isMyPack: isMyPack,
          sortPacks: sortPacks,
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
          if (res.statusText === "Created") {
            thunkAPI.dispatch(
              setPacksTC({ isMyPack: isMyPack ? "true" : "false" })
            );
            thunkAPI.dispatch(
              AppAC.setSuccessMessage({ message: "Successfully updated" })
            );
          }
        }
      );
    });
  }
);
export const removePackTC = createAppAsyncThunk(
  "packs/removePack",
  async (id: string, thunkAPI) => {
    return errorHandlingThunk(thunkAPI, async () => {
      const res = await PacksAPI.deletePack(id);
      if (res.statusText === "OK") {
        const { isMyPack } = thunkAPI.getState().packs;
        thunkAPI.dispatch(
          setPacksTC({ isMyPack: isMyPack ? "true" : "false" })
        );
        thunkAPI.dispatch(
          AppAC.setSuccessMessage({ message: "Successfully updated" })
        );
      }
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
      const res = await PacksAPI.updatePack(
        fields.id,
        fields.name,
        fields.deckCover
      );
      if (res.statusText === "OK") {
        const { isMyPack } = thunkAPI.getState().packs;
        thunkAPI.dispatch(
          setPacksTC({ isMyPack: isMyPack ? "true" : "false" })
        );
        thunkAPI.dispatch(
          AppAC.setSuccessMessage({ message: "Successfully updated" })
        );
      }
    });
  }
);
