export type ResponseType<D> = {
  data: D;
};

export type LoginUserType = {
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
};
type AddedUser = Omit<LoginUserType, "token" | "error" | "avatar">;
export type RegisterNewUserType = {
  addedUser: AddedUser;
};
// export type RegisterNewUserType = {
//   addedUser: {
//     _id: string;
//     email: string;
//     rememberMe: boolean;
//     name: string;
//     verified: boolean;
//     isAdmin: boolean;
//     publicCardPacksCount: number;
//     created: Date;
//     updated: Date;
//   };
// };
