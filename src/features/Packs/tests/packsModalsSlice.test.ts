import { AuthAC, authInitialState, authReducer } from "../../Auth/authSlice";
import { packsAC, packsReducer } from "../packsReducer";
import { packsModalsAC, packsModalsReducer } from "../packsModalsSlice";

import { IPackResponse } from "../packsAPI";

const initialState = {
  addPack: {
    isOpen: false,
    pack: {
      name: "",
      deckCover: "",
      isPrivate: false,
    },
  },
  updatePack: {
    isOpen: false,
    pack: {} as IPackResponse,
  },
  deletePack: {
    isOpen: false,
    pack: {} as IPackResponse,
  },
};
const pack = {
  id: "1",
  name: "test",
  deckCover: "test-url",
  private: false,
};
describe("Modal Packs slice", () => {
  test("setAddPackState", () => {
    const status = true;
    const action = { type: packsModalsAC.setAddPackState, payload: { status } };
    const result = packsModalsReducer(initialState, action);
    expect(result.addPack.isOpen).toBe(status);
  });
  test("setUpdatePackState", () => {
    const status = true;
    const action = {
      type: packsModalsAC.setUpdatePackState,
      payload: { status, pack },
    };
    const result = packsModalsReducer(initialState, action);
    expect(result.updatePack.isOpen).toBe(status);
    expect(result.updatePack.pack).toEqual(pack);
  });
  test("setDeletePackState", () => {
    const status = true;
    const action = {
      type: packsModalsAC.setDeletePackState,
      payload: { status, pack },
    };
    const result = packsModalsReducer(initialState, action);
    expect(result.deletePack.isOpen).toBe(status);
    expect(result.deletePack.pack).toEqual(pack);
  });
  test("addPack", () => {
    const action = {
      type: packsModalsAC.addPack,
      payload: { ...pack },
    };
    const result = packsModalsReducer(initialState, action);
    expect(result.addPack.pack.name).toBe(pack.name);
    expect(result.addPack.pack.deckCover).toBe(pack.deckCover);
    expect(result.addPack.pack.isPrivate).toBe(pack.private);
  });
  test("updatePack", () => {
    const action = {
      type: packsModalsAC.updatePack,
      payload: { ...pack },
    };
    const result = packsModalsReducer(initialState, action);
    expect(result.updatePack.pack.name).toBe(pack.name);
    expect(result.updatePack.pack.deckCover).toBe(pack.deckCover);
    expect(result.updatePack.pack.private).toBe(pack.private);
  });
  test("deletePack", () => {
    const action = {
      type: packsModalsAC.deletePack,
      payload: { packId: "1", cardName: "test" },
    };
    const result = packsModalsReducer(initialState, action);
    expect(result.deletePack.pack._id).toBe("1");
    expect(result.deletePack.pack.name).toBe("test");
  });
  test("editPackFields", () => {
    const action = {
      type: packsModalsAC.editPackFields,
      payload: { ...pack },
    };
    const result = packsModalsReducer(initialState, action);
    expect(result.updatePack.pack.name).toBe(pack.name);
    expect(result.updatePack.pack.deckCover).toBe(pack.deckCover);
    expect(result.updatePack.pack.private).toBe(pack.private);
  });
});
