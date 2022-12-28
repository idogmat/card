import { RootState } from "./store";

export const appStateSelect = (state: RootState) => state.app;
export const userStateSelect = (state: RootState) => state.user;
export const packsStateSelect = (state: RootState) => state.packs;
