export type ResponseType<D> = {
  data: D;
};
export type RegisterNewUserType = {
  addedUser: {
    _id: string;
    email: string;
    rememberMe: boolean;
    name: string;
    verified: boolean;
    isAdmin: boolean;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
  };
};
export type LoginUserType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  token: string;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};
export type UserType = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  token: string;
  verified: boolean;
  error?: string;
};
