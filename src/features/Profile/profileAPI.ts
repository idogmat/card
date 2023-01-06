import { IUser } from "../../common/models";
import { configuredAxios } from "../../common/api/baseAPI";

export interface IUpdatedUserInfo {
  name: string;
  avatar: string | null;
}

export interface IUpdateUserResponse {
  updatedUser: IUser;
  error?: string;
}

const sendUpdateUserRequest = (model: IUpdatedUserInfo) => {
  return configuredAxios.put<IUpdateUserResponse>("/auth/me", model);
};

export const profileAPI = {
  sendUpdateUserRequest,
};
