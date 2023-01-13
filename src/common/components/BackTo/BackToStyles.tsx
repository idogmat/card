import { Button } from "common/ui-kit/Button/Button";
import styled from "styled-components";

export const BackToButton = styled(Button).attrs({
  semantic: true,
})`
  display: flex;
  align-items: center;
  gap: 0.3125rem;

  &:not(last-child) {
    margin-bottom: 1.5625rem;
  }
`;
