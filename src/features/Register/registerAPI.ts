import { instance } from "../../common/api/baseAPI";

import { RegisterNewUserType, ResponseType } from "../../common/api/types";
import { IRegisterData } from "../../api/auth";

const sendRegisterRequest = ({ email, password }: IRegisterData) => {
  return instance.post<RegisterNewUserType>("/auth/register", {
    email,
    password,
  });
};

export const registerAPI = {
  sendRegisterRequest,
};
