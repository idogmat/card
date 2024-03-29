import "../../styles/base/mixins.scss";

import styled, { css } from "styled-components";

import { StyledComponent } from "../types";

interface IContainerProps {
  variant: "sm" | "md";
}

export const Container = styled.div<StyledComponent<IContainerProps>>`
  width: 100%;
  margin: 0px auto;
  padding: 0 0.95rem;
  ${(p) =>
    p.variant === "sm" &&
    css`
      max-width: 65rem;
    `}
  ${(p) =>
    p.variant === "md" &&
    css`
      max-width: 70rem;
    `}
	${(p) => ({ ...p.sx })}
`;
