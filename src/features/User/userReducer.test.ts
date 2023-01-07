import { IUserFields, loginTC } from "../Login/loginThunks";
import { UserAC, userInitialState, userReducer } from "./userReducer";

import { IUpdatedUserInfo } from "../Profile/profileAPI";
import { IUser } from "../../common/models";

describe("user slice", () => {
  test("should return default state when passed an empty action", () => {
    const action = { type: "", payload: "" };

    const result = userReducer(undefined, action);

    expect(result).toEqual(userInitialState);
  });

  test("should set new user with 'setUser' action", () => {
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
      userInitialState,
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

  test("should update user's name with 'updateUser' action", () => {
    const name = "name placeholder";
    const model: IUpdatedUserInfo = {
      name,
      avatar: null,
    };

    const finalState = userReducer(
      userInitialState,
      UserAC.updateUser({ model })
    );

    expect(finalState.name).toBe(name);
  });

  test("should update user's avatar with 'updateUser' action", () => {
    const avatar = "avatar link";
    const model: IUpdatedUserInfo = {
      name: "name",
      avatar,
    };
    const finalState = userReducer(
      userInitialState,
      UserAC.updateUser({ model })
    );
    expect(finalState.avatar).toBe(avatar);
  });
});
