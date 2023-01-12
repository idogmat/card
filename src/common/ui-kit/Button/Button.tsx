import { StyledComponent } from "../types";
import styled from "styled-components";

interface IButtonProps {
  hColor: string;
  hBgColor: string;

  bColor: string;
  bgColor: string;

  fz: string;
  bRadius: string;
  asset: string;
  fw: string;
}

export const Button = styled.button<StyledComponent<Partial<IButtonProps>>>`
  cursor: pointer;
  font-family: var(--family);
  color: ${({ bColor }) => bColor || " var(--color-secondary)"};
  font-weight: ${({ fw }) => fw || "var(--fw-regular)"};
  padding: ${({ asset }) => asset || "0.625rem 0.9375rem"};
  font-size: ${({ fz }) => fz || "var(--fs-sm)"};
  border-radius: ${({ bRadius }) => bRadius || "var(--radius)"};
  background-color: ${({ bgColor }) => bgColor || "var(--color-blue)"};
  box-shadow: 0px 2px 10px rgb(109 109 109 / 25%),
    inset 0px 1px 0px rgb(255 255 255 / 30%);
  transition: all 0.3s ease 0s;
  border: 1px solid transparent;

  @media (any-hover: hover) {
    &:hover {
      color: ${({ hColor }) => hColor || "var(--color-secondary)"};
      background-color: ${({ hBgColor }) => hBgColor || "var(--color-primary)"};
      border-color: ${({ hColor }) => hColor || " var(--color-primary)"};
    }
  }

  ${({ sx }) => ({ ...sx })}
`;
