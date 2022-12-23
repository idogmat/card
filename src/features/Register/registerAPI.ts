import { instance } from "../../common/api/baseAPI";

import { RegisterNewUserType } from "../../common/api/types";
import { IRegisterData } from "./registerThunks";

const sendRegisterRequest = ({ email, password }: IRegisterData) => {
  return instance.post<RegisterNewUserType>("/auth/register", {
    email,
    password,
  });
};

export const registerAPI = {
  sendRegisterRequest,
};
