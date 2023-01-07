import { IRegisterData } from "./registerThunks";
import { RegisterNewUserType } from "../../common/api/types";
import { configuredAxios } from "../../common/api/baseAPI";

const sendRegisterRequest = ({ email, password }: IRegisterData) => {
  return configuredAxios.post<RegisterNewUserType>("/auth/register", {
    email,
    password,
  });
};

export const registerAPI = {
  sendRegisterRequest,
};
