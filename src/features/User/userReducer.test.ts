import {
  mockAuthMeUser,
  mockNewUser,
  mockUpdateUserFields,
  mockUpdatedUser,
  mockUserFields,
} from "./test/mock";
import { userInitialState, userReducer } from "./userReducer";

import { authMeTC } from "features/Auth/authThunks";
import { loginTC } from "../Login/loginThunks";
import { updateUserInfoTC } from "features/Profile/profileThunks";

describe("user slice", () => {
  test("should return default state when passed an empty action", () => {
    const action = { type: "", payload: "" };

    const result = userReducer(undefined, action);

    expect(result).toEqual(userInitialState);
  });

  test("should set new user with 'loginTC.fulfilled' action", () => {
    const finalState = userReducer(
      userInitialState,
      loginTC.fulfilled({ user: mockNewUser }, "", mockUserFields)
    );

    expect(finalState.name).toBe(mockNewUser.name);
    expect(finalState.email).toBe(mockNewUser.email);
    expect(finalState._id).toBe(mockNewUser._id);
    expect(finalState.avatar).toBe(mockNewUser.avatar);
    expect(finalState.created).toBe(mockNewUser.created);
    expect(finalState.updated).toBe(mockNewUser.updated);
    expect(finalState.isAdmin).toBe(mockNewUser.isAdmin);
    expect(finalState.publicCardPacksCount).toBe(
      mockNewUser.publicCardPacksCount
    );
    expect(finalState.verified).toBe(mockNewUser.verified);
  });

  test("should set new user info with 'updateUserInfoTC.fulfilled'", () => {
    const finalState = userReducer(
      userInitialState,
      updateUserInfoTC.fulfilled(mockUpdatedUser, "", mockUpdateUserFields)
    );

    expect(finalState.avatar).toBe(mockUpdateUserFields.avatar);
    expect(finalState.name).toBe(mockUpdateUserFields.name);
  });

  test("should set new user info with 'AuthMeTC.fulfilled'", () => {
    const finalState = userReducer(
      userInitialState,
      authMeTC.fulfilled(mockAuthMeUser, "")
    );

    expect(finalState.name).toEqual(mockAuthMeUser.name);
    expect(finalState.avatar).toEqual(mockAuthMeUser.avatar);
    expect(finalState.email).toEqual(mockAuthMeUser.email);
    expect(finalState.verified).toEqual(mockAuthMeUser.verified);
    expect(finalState.isAdmin).toEqual(mockAuthMeUser.isAdmin);
    expect(finalState.publicCardPacksCount).toEqual(
      mockAuthMeUser.publicCardPacksCount
    );
  });
});
