export interface IAuthState {
  login: string;
  email: string;
  password: string;
}

export type AuthATPlaceholder = {
  type: string;
  data: {
    [key: string]: string;
  };
};
