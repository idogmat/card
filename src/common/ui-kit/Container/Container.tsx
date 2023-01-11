import "../../styles/base/mixins.scss";

import styled, { css } from "styled-components";

import { StyledComponent } from "../types";

interface IContainerProps {
  variant: "sm" | "md";
}

export const Container = styled.div<StyledComponent<IContainerProps>>`
  width: 100%;
  margin: 0px auto;
  padding: rem(15);
  ${(p) =>
    p.variant === "sm" &&
    css`
      max-width: 75rem;
    `}
  ${(p) =>
    p.variant === "md" &&
    css`
      max-width: 87.5rem;
    `}
	${(p) => ({ ...p.sx })}
`;
