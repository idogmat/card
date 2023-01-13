import { Container } from "common/ui-kit/Container/Container";
import { Flex } from "common/ui-kit/Flex/Flex";
import styled from "styled-components";

export const LearnRadioWrapper = styled(Flex).attrs({
  fDirection: "column",
})`
  gap: 0.3125rem;

  &:not(last-child) {
    margin-bottom: 1.25rem;
  }
`;

export const LearnContainer = styled(Container).attrs({
  variant: "sm",
})`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6.25rem 0px 0px 0px;
`;
