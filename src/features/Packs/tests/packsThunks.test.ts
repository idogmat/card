import {addPackTC, removePackTC, setPacksTC, updatePackTC} from "../packsThunks";

import { PacksAPI } from "../packsAPI";
import { store } from "../../../app/store";
import { AxiosResponse } from "axios";
import {APIPackMock, APIPacksMock, fieldsMock, PacksModelMock, payloadMock} from "./mocks";


jest.mock("../packsAPI.ts");
const getState = store.getState;
const packsAPIMock = PacksAPI as jest.Mocked<typeof PacksAPI>;
describe("packs Thunks", () => {
  it("should getCards with resolved response with model", async () => {
    packsAPIMock.getPacks.mockResolvedValue({
      data: APIPacksMock,
    } as AxiosResponse);
    const dispatch = jest.fn();
    const mockResult = { ...payloadMock };
    const thunk = setPacksTC(PacksModelMock);
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    const [start, enableLoading, disableLoading, end] = calls;

    expect(calls).toHaveLength(4);
    expect(start[0].type).toBe("packs/setPacks/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("packs/setPacks/fulfilled");
    expect(end[0].payload).toStrictEqual(mockResult);
  });
  it("should getCards with resolved response without model", async () => {
    packsAPIMock.getPacks.mockResolvedValue({
      data: APIPacksMock,
    } as AxiosResponse);
    const dispatch = jest.fn();
    const thunk = setPacksTC({});
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    const [start, enableLoading, disableLoading, end] = calls;

    expect(calls).toHaveLength(4);
    expect(start[0].type).toBe("packs/setPacks/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("packs/setPacks/fulfilled");
    expect(end[0].payload).toStrictEqual(payloadMock);
  });
  it("should fetchPacks with reject", async () => {
    const dispatch = jest.fn();
    const thunk = setPacksTC({});
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    const [start, enableLoading,setError, disableLoading, end] = calls;

    expect(calls).toHaveLength(5);
    expect(start[0].type).toBe("packs/setPacks/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("packs/setPacks/rejected");

  });
  it("should addPack with resolved", async () => {
    const dispatch = jest.fn();
    packsAPIMock.addPack.mockResolvedValue({
      data: APIPackMock,
      statusText: "Created"
    } as AxiosResponse);
    const thunk = addPackTC( {...fieldsMock} );
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    const [start, enableLoading, _, setSuccessMessage, disableLoading, end] =
      calls;

    expect(calls).toHaveLength(6);
    expect(start[0].type).toBe("packs/addPack/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(setSuccessMessage[0].type).toBe("app/setSuccessMessage");
    expect(end[0].type).toBe("packs/addPack/fulfilled");
  });
  it("should addPack with rejected", async () => {
    const dispatch = jest.fn();
    const thunk = addPackTC( {...fieldsMock} );
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    const [start, enableLoading,setError, disableLoading, end] = calls;

    expect(calls).toHaveLength(5);
    expect(start[0].type).toBe("packs/addPack/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("packs/addPack/rejected");
  });
  it("should removePack with resolved", async () => {
    packsAPIMock.deletePack.mockResolvedValue({
      data: { statusText: "OK" },
    } as AxiosResponse);
    const id ='1111'
    const dispatch = jest.fn();
    const thunk = removePackTC( id );
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    const [start, enableLoading, disableLoading, end] = calls;

    expect(calls).toHaveLength(4);
    expect(start[0].type).toBe("packs/removePack/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("packs/removePack/fulfilled");
  });
  it("should removePack with rejected", async () => {
    const id ='1111'
    const dispatch = jest.fn();
    const thunk = removePackTC( id );
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    const [start, enableLoading,setError, disableLoading, end] = calls;

    expect(calls).toHaveLength(5);
    expect(start[0].type).toBe("packs/removePack/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("packs/removePack/rejected");
  });
  ///
  it("should updatePack with resolved", async () => {
    packsAPIMock.updatePack.mockResolvedValue({
      data: { statusText: "OK" },
    } as AxiosResponse);
    const dispatch = jest.fn();
    const thunk = updatePackTC({ ...fieldsMock });
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    const [start, enableLoading, disableLoading, end] = calls;

    expect(calls).toHaveLength(4);
    expect(start[0].type).toBe("packs/updatePack/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("packs/updatePack/fulfilled");
  });
  it("should updatePack with rejected", async () => {
    const dispatch = jest.fn();
    const thunk = updatePackTC({ ...fieldsMock });
    await thunk(dispatch, getState, "");

    const { calls } = dispatch.mock;
    const [start, enableLoading,setError, disableLoading, end] = calls;

    expect(calls).toHaveLength(5);
    expect(start[0].type).toBe("packs/updatePack/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("packs/updatePack/rejected");
  });

});
