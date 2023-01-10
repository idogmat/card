import {
  IUpdatedUserInfo,
  IUpdatedUserResponse,
} from "features/Profile/profileAPI";

export const mockUpdateUserInfo: IUpdatedUserInfo = {
  name: "",
  avatar: null,
};

export const mockUpdateUserResponse: IUpdatedUserResponse = {
  updatedUser: {
    _id: "",
    email: "",
    name: "",
    isAdmin: false,
    avatar: null,
    publicCardPacksCount: 1,
    verified: false,
    created: new Date(),
    updated: new Date(),
  },
};
