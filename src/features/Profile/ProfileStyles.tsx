import { Button } from "common/ui-kit/Button/Button";
import { Flex } from "common/ui-kit/Flex/Flex";
import { Typography } from "common/ui-kit/Text/Typography";
import { UploadImgBadge } from "common/ui-kit/UploadImgBage/UploadImgBage";
import styled from "styled-components";

export const UserEmailText = styled(Typography)`
  color: gray;
  margin-bottom: 1.2rem;
`;

export const ProfileWrapper = styled(Flex)``;

export const ProfileContainer = styled(Flex)`
  padding: 7rem 0px 7rem 0px;
  max-width: 22.5rem;
  align-self: flex-start;

  @media (max-width: 768px) {
    padding: 5rem 0px 5rem 0px;
  }
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
