import { AppThunkActionType } from "../../common/hooks/useAllSelector";
import { PacksAPI } from "./packsAPI";
import { setPacks } from "./packsReducer";

export const setPacksTC = (id: string): AppThunkActionType => {
  return async (dispatch) => {
    try {
      const { data } = await PacksAPI.getCardsPack(id);
      console.log(data);
      dispatch(setPacks({ packs: data.cardPacks }));
    } catch (e) {}
  };
};
