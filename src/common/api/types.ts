export type ResponseType<D> = {
  data: D;
};

export interface ILoginUser {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  avatar: string | null;
  publicCardPacksCount: number;
  verified: boolean;
  created: Date;
  updated: Date;
  token: string;
  rememberMe: boolean;
  error: string | null;
}

type AddedUser = Omit<ILoginUser, "token" | "error" | "avatar">;

export type RegisterNewUserType = {
  addedUser: AddedUser;
};
