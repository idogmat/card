import { AuthATPlaceholder, IAuthState } from "./types";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const testReducer = (
  state: IAuthState = initialState,
  action: AuthATPlaceholder
) => {
  switch (action.type) {
    default:
      return state;
  }
};
