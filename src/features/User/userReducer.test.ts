import { IUser } from "../../common/models";
import { UserAC, userReducer } from "./userReducer";
import { IUpdatedUserInfo } from "../Profile/profileAPI";
import { IUserFields, loginTC } from "../Login/loginThunks";

const initialState: IUser = {
  name: "",
  email: "",
  _id: "",
  avatar: null,
  created: new Date(),
  updated: new Date(),
  isAdmin: false,
  publicCardPacksCount: 0,
  verified: false,
};

test("new user should be set", () => {
  const newUser: IUser = {
    name: "Eddie",
    email: "eddie@gmail.com",
    _id: "2",
    avatar: null,
    created: new Date(),
    updated: new Date(),
    isAdmin: true,
    publicCardPacksCount: 23,
    verified: true,
  };
  const userFields: IUserFields = {
    email: "eddie@gmail.com",
    password: "111111111",
    rememberMe: true,
  };
  const finalState = userReducer(
    initialState,
    loginTC.fulfilled({ user: newUser }, "ddddd", userFields)
  );
  expect(finalState.name).toBe(newUser.name);
  expect(finalState.email).toBe(newUser.email);
  expect(finalState._id).toBe(newUser._id);
  expect(finalState.avatar).toBe(newUser.avatar);
  expect(finalState.created).toBe(newUser.created);
  expect(finalState.updated).toBe(newUser.updated);
  expect(finalState.isAdmin).toBe(newUser.isAdmin);
  expect(finalState.publicCardPacksCount).toBe(newUser.publicCardPacksCount);
  expect(finalState.verified).toBe(newUser.verified);
});

test("user's name should be updated", () => {
  const name = "name placeholder";
  const model: IUpdatedUserInfo = {
    name,
    avatar: null,
  };
  const finalState = userReducer(initialState, UserAC.updateUser({ model }));
  expect(finalState.name).toBe(name);
});

test("user's avatar should be updated", () => {
  const avatar = "avatar link";
  const model: IUpdatedUserInfo = {
    name: "name",
    avatar,
  };
  const finalState = userReducer(initialState, UserAC.updateUser({ model }));
  expect(finalState.avatar).toBe(avatar);
});
