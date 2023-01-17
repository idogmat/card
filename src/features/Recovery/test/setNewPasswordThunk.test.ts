import { AxiosResponse } from "axios/index";
import { store } from "../../../app/store";
import { setNewPasswordForm } from "./mock";
import { loginAPI } from "../../Login/loginAPI";
import { setNewPassword } from "../setNewPasswordThunk";

jest.mock("../../Login/loginAPI.ts");

const getState = store.getState;
const loginAPIMock = loginAPI as jest.Mocked<typeof loginAPI>;
describe("setNewPassword", () => {
  it("should setNewPassword with resolved response", async () => {
    loginAPIMock.setNewPassword.mockResolvedValue({
      data: {data:{info:'OK'}},
    } as AxiosResponse);
    const dispatch = jest.fn();
    const thunk = setNewPassword(setNewPasswordForm);
    await thunk(dispatch, getState, "");

    const {calls} = dispatch.mock;
    const [start, enableLoading, disableLoading, end] = calls;
    
    expect(calls).toHaveLength(4);
    expect(start[0].type).toBe("auth/setNewPassword/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("auth/setNewPassword/fulfilled");
  });
  it("should setNewPassword with rejected response", async () => {
    const dispatch = jest.fn();
    const thunk = setNewPassword(setNewPasswordForm);
    await thunk(dispatch, getState, "");

    const {calls} = dispatch.mock;
    const [start, enableLoading,setError, disableLoading, end] = calls;

    expect(calls).toHaveLength(5);
    expect(start[0].type).toBe("auth/setNewPassword/pending");
    expect(enableLoading[0].type).toBe("app/setIsLoading");
    expect(setError[0].type).toBe("app/setError");
    expect(disableLoading[0].type).toBe("app/setIsLoading");
    expect(end[0].type).toBe("auth/setNewPassword/rejected");
  });
})