import { IUser } from "../../common/models";
import { configuredAxios } from "../../common/api/baseAPI";

export interface IUpdatedUserInfo {
  name: string;
  avatar: string | null;
}

export interface IUpdatedUserResponse {
  updatedUser: IUser;
  error?: string;
}

const sendUpdateUserRequest = (model: IUpdatedUserInfo) => {
  return configuredAxios.put<IUpdatedUserResponse>("/auth/me", model);
};

export const profileAPI = {
  sendUpdateUserRequest,
};
