import styled, { css } from "styled-components";

import { StyledComponent } from "../types";

interface ITypographyProps {
  variant: "title" | "sub-title-md" | "sub-title-sm";
}

export const Typography = styled.p<StyledComponent<ITypographyProps>>`
  font-family: var(--family);
  ${(p) =>
    p.variant === "title" &&
    css`
      font-weight: var(--fw-bold);
      font-size: var(--fs-big);
    `};

  ${(p) =>
    p.variant === "sub-title-md" &&
    css`
      font-weight: var(--fw-bold);
      font-size: var(--fs-md);
    `};
  ${(p) =>
    p.variant === "sub-title-sm" &&
    css`
      font-weight: var(--fw-sm);
      font-size: var(--fs-sm);
    `};
  ${(p) => ({ ...p.sx })}
`;
