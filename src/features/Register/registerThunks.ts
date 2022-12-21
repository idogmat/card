import { registerAPI } from "./registerAPI";
import { IRegisterData } from "../../api/auth";
import { AppAC } from "../../app/appReducer";
import { AuthAC } from "../Auth/authReducer";

export const registerTC = async ({ email, password }: IRegisterData) => {
  AppAC.setIsLoading({ isLoading: true });
  try {
    const { data } = await registerAPI.sendRegisterRequest({ email, password });
  } catch (e) {
    console.log(e);
  } finally {
    AppAC.setIsLoading({ isLoading: false });
  }
};
