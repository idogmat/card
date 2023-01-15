import { Flex } from "common/ui-kit/Flex/Flex";
import { StyledComponent } from "common/ui-kit/types";
import styled from "styled-components";

export const RegisterWrapper = styled(Flex).attrs({
  fDirection: "column",
  align: "center",
  justify: "center",
})`
  padding-top: 5rem;

  @media (max-width: 768px) {
    padding-top: 10rem;
    padding-bottom: 5vh;
  } ;
`;

export const RegisterContent = styled(Flex).attrs<StyledComponent<{}>>({
  fDirection: "column",
})`
  min-width: 18.125rem;
  position: relative;

  ${(p) => ({ ...p.sx })}
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
`;

export const RegisterOffer = styled(Flex).attrs({
  fDirection: "column",
  align: "center",
  gap: "0.6rem",
})``;
