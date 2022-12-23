import { instance } from "../../common/api/baseAPI";

import { IRegisterData, RegisterNewUserType } from "../../common/api/types";

const sendRegisterRequest = ({ email, password }: IRegisterData) => {
  return instance.post<RegisterNewUserType>("/auth/register", {
    email,
    password,
  });
};

export const registerAPI = {
  sendRegisterRequest,
};
