import styled, { css } from "styled-components";

import { StyledComponent } from "../types";

interface IButtonProps {
  hColor: string;
  hBgColor: string;

  bColor: string;
  bgColor: string;

  fz: string;
  bRadius: string;
  asset: string;
  fw: string;

  semantic: boolean;
}

export const Button = styled.button<StyledComponent<Partial<IButtonProps>>>`
  cursor: pointer;
  ${(p) =>
    !p.semantic
      ? css`
          font-family: var(--family);
          color: ${p.bColor || "var(--color-secondary)"};
          font-weight: ${p.fw || "var(--fw-regular)"};
          padding: ${p.asset || "0.625rem 0.9375rem"};
          font-size: ${p.fz || "var(--fs-sm)"};
          border-radius: ${p.bRadius || "var(--radius)"};
          background-color: ${p.bgColor || "var(--color-blue)"};
          box-shadow: 0px 2px 10px rgb(109 109 109 / 25%),
            inset 0px 1px 0px rgb(255 255 255 / 30%);
          transition: all 0.3s ease 0s;
          border: 1px solid transparent;

          @media (any-hover: hover) {
            &:hover {
              color: ${p.hColor || "var(--color-secondary)"};
              background-color: ${p.hBgColor || "var(--color-primary)"};
              border-color: ${p.hColor || " var(--color-primary)"};
            }
          }
        `
      : css`
          background: transparent;
          outline: none;
          border: none;
          padding: 0;
        `};

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  ${({ sx }) => ({ ...sx })}
`;
