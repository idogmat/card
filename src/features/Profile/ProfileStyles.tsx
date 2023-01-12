import { Button } from "common/ui-kit/Button/Button";
import { Flex } from "common/ui-kit/Flex/Flex";
import { Typography } from "common/ui-kit/Text/Text";
import { UploadImgBadge } from "common/ui-kit/UploadImgBage/UploadImgBage";
import styled from "styled-components";

export const UserEmailText = styled(Typography)`
  color: gray;
  margin-bottom: 1.2rem;
`;

export const ProfileWrapper = styled(Flex)`
  height: 100vh;
  paddingtop: 8.5rem;
`;

export const ProfileContainer = styled(Flex)`
  padding-top: 7rem;
  max-width: 22.5rem;
  align-self: flex-start;
`;

export const ProfileTitle = styled(Typography).attrs({
  variant: "title",
  as: "h1",
  align: "center",
})`
  margin-bottom: 1.5rem;
`;

export const ProfileUploadImgBadge = styled(UploadImgBadge).attrs({
  pos: "bottom-right",
  wSize: "1.8rem",
  hSize: "1.8rem",
  xAsset: "-1rem",
  yAsset: "-1rem",
  border: "2px solid #fff",
})``;

export const ProfileLogoutBtn = styled(Button).attrs({
  bgColor: "var(--color-secondary)",
  fw: "var(--fw-md)",
  hColor: "var(--color-primary)",
})`
  display: flex;
  gap: 0.3rem;
  align-items: center;
`;
