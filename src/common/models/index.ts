export interface IUser {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  avatar: string | null;
  publicCardPacksCount: number;
  verified: boolean;
  created: Date;
  updated: Date;
}
export interface ICard {
  answer: string,
  question: string,
  cardsPack_id: string,
  grade: number,
  shots: number,
  user_id: string,
  created: Date,
  updated: Date,
  _id: string,
}