import { ChangeEvent, useRef } from "react";
import { MdCameraAlt, MdLogout } from "react-icons/md";
import {
  ProfileContainer,
  ProfileLogoutBtn,
  ProfileTitle,
  ProfileUploadImgBadge,
  ProfileWrapper,
  UserEmailText,
} from "./ProfileStyles";
import { useAllSelector, useAppDispatch } from "../../common/hooks";

import { Avatar } from "common/ui-kit/Avatar/Avatar";
import { EditableText } from "../../common/components/EditableText/EditableText";
import { FileLoader } from "common/components/FileLoader/FileLoader";
import { Flex } from "common/ui-kit/Flex/Flex";
import { Paper } from "common/ui-kit/Paper/Paper";
import { appStateSelector } from "app/selectors";
import { getImgBase64File } from "common/utils/base64Converter";
import { logOutTC } from "../Login/loginThunks";
import { openFileSelector } from "features/Cards/components/modals/utils";
import { updateUserInfoTC } from "./profileThunks";
import { userStateSelector } from "../User/selectors";
import { ProfileLoader } from "./ProfileLoader";

export const Profile = () => {
  // Dispatch & selectors
  const dispatch = useAppDispatch();
  const user = useAllSelector(userStateSelector);
  const { isLoading } = useAllSelector(appStateSelector);

  // Vars
  const avatarFileRef = useRef<HTMLInputElement>(null);

  // Utils
  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = await getImgBase64File(e, dispatch);

    if (user.avatar !== avatar && avatar) {
      dispatch(updateUserInfoTC({ ...user, avatar }));
    }
  };

  const handleLogout = () => {
    dispatch(logOutTC());
  };

  const changeNameHandler = (name: string) => {
    if (user.name !== name) {
      dispatch(updateUserInfoTC({ ...user, name }));
    }
  };

  return (
    <ProfileWrapper justify="center">
      <ProfileContainer>
        {!isLoading ? (
          <Paper asset="1.5rem 5rem">
            <Flex justify="center" align="center" fDirection="column">
              <ProfileTitle>Personal information</ProfileTitle>
              <Flex justify="center" sx={{ marginBottom: "30px" }}>
                <FileLoader
                  link={avatarFileRef}
                  onFileLoaded={handleAvatarUpload}
                />
                <Avatar
                  src={user.avatar}
                  text={user.name}
                  bgColor="var(--color-blue)"
                >
                  <ProfileUploadImgBadge
                    onClick={() => openFileSelector(avatarFileRef)}
                  >
                    <MdCameraAlt />
                  </ProfileUploadImgBadge>
                </Avatar>
              </Flex>
              <EditableText
                valueToDisplay={user.name}
                onChangeText={changeNameHandler}
                disabled={isLoading}
              />
              <UserEmailText variant="sub-title-sm" as="span">
                {user.email}
              </UserEmailText>
              <ProfileLogoutBtn onClick={handleLogout} disabled={isLoading}>
                <MdLogout fontSize={"small"} />
                Log out
              </ProfileLogoutBtn>
            </Flex>
          </Paper>
        ) : (
          <ProfileLoader />
        )}
      </ProfileContainer>
    </ProfileWrapper>
  );
};
