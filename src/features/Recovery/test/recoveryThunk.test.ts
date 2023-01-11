import { store } from "../../../app/store";
import { AxiosResponse } from "axios";
import { recoveryEmailMock } from "./mock";
import { loginAPI } from "../../Login/loginAPI";
import { recoveryThunk } from "../recoveryThunk";

jest.mock("../../Login/loginAPI.ts");
const getState = store.getState;
const loginAPIMock = loginAPI as jest.Mocked<typeof loginAPI>;
describe("recoveryPasswordForm", () => {
  it("should recoveryPasswordForm with resolved response", async () => {
    loginAPIMock.recoveryPassword.mockResolvedValue({
      data: {data:{success:true}},
    } as AxiosResponse);
    const dispatch = jest.fn();
    const thunk = recoveryThunk(recoveryEmailMock);
    await thunk(dispatch, getState, "");

    const {calls} = dispatch.mock;
    const [start, enableLoading, disableLoading, end] = calls;

    expect(calls).toHaveLength(4);
    expect(start[0].type).toBe("auth/recovery/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("auth/recovery/fulfilled");
  });
  it("should recoveryPasswordForm with rejected response", async () => {
    const dispatch = jest.fn();
    const thunk = recoveryThunk(recoveryEmailMock);
    await thunk(dispatch, getState, "");

    const {calls} = dispatch.mock;
    const [start, enableLoading,setError, disableLoading, end] = calls;

    expect(calls).toHaveLength(5);
    expect(start[0].type).toBe("auth/recovery/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("auth/recovery/rejected");
  });
})
