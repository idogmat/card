export type IUser = {
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
