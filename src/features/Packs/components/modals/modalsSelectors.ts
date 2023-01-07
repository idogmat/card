import { RootState } from "../../../../app/store";

export const addNewModalSelector = (state: RootState) =>
  state.packsModals.addPack;
export const updateModalSelector = (state: RootState) =>
  state.packsModals.updatePack;
export const deleteModalSelector = (state: RootState) =>
  state.packsModals.deletePack;
