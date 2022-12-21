import { instance } from "../../common/api/api";
import { IRegisterData } from "../../api/auth";
import { RegisterNewUserType, ResponseType } from "../../common/api/types";

const sendRegisterRequest = ({ email, password }: IRegisterData) => {
  return instance.post<ResponseType<RegisterNewUserType>>("auth/register", {
    email,
    password,
  });
};

export const registerAPI = {
  sendRegisterRequest,
};
