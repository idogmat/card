import { AxiosResponse } from "axios/index";
import { store } from "../../../app/store";
import { registerAPI } from "../registerAPI";
import { regFields } from "./mock";
import { registerTC } from "../registerThunks";

jest.mock("../registerAPI.ts");

const getState = store.getState;
const registerAPIMock = registerAPI as jest.Mocked<typeof registerAPI>;
describe("register", () => {
  it("should register with resolved response", async () => {
    registerAPIMock.sendRegisterRequest.mockResolvedValue({
      data: "OK",
    } as AxiosResponse);
    const dispatch = jest.fn();
    const thunk = registerTC(regFields);
    await thunk(dispatch, getState, "");
    
    const {calls} = dispatch.mock;
    const [start, enableLoading,_, disableLoading, end] = calls;
    
    expect(calls).toHaveLength(5);
    expect(start[0].type).toBe("auth/register/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("auth/register/fulfilled");
  });
  it("should register with rejected response", async () => {
    const dispatch = jest.fn();
    const thunk = registerTC(regFields);
    await thunk(dispatch, getState, "");

    const {calls} = dispatch.mock;
    const [start, enableLoading,setError, disableLoading, end] = calls;
    
    expect(calls).toHaveLength(5);
    expect(start[0].type).toBe("auth/register/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("auth/register/rejected");
  });
})