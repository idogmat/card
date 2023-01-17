import { Button } from "common/ui-kit/Button/Button";
import { Flex } from "common/ui-kit/Flex/Flex";
import { StyledComponent } from "common/ui-kit/types";
import styled from "styled-components";

export const HeaderContainer = styled.header<StyledComponent<{}>>`
  background: white;
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25),
    inset 0px 1px 0px rgba(255, 255, 255, 0.3);
  padding: 0.625rem 0px;
  z-index: 50;
  ${(p) => ({ ...p.sx })}
`;

export const HeaderWrapper = styled.div`
  display: flex;
  gap: 0.65rem;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767.98px) {
    flex-direction: column;
    justify-content: stretch;
  } ;
`;

export const HeaderMenuButton = styled(Button).attrs({
  semantic: true,
})`
  display: flex;
  align-items: center;
  position: relative;
  gap: 0.3125rem;
`;
