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
