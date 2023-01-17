import styled, { css } from "styled-components";

import { StyledComponent } from "../types";

interface IBadgeProps {
  pos: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  border: string;
  wSize: string;
  hSize: string;
  xAsset: string;
  yAsset: string;
}

export const Badge = styled.button<StyledComponent<Partial<IBadgeProps>>>`
  position: absolute;
  border: ${({ border }) => border || "none"};
  width: ${({ wSize }) => wSize || ".625rem"};
  height: ${({ hSize }) => hSize || ".625rem"};
  transform: translate(-50%, -50%);
  ${({ pos, xAsset, yAsset }) =>
    pos === "top-left" &&
    css`
      top: ${yAsset || "2%"};
      left: ${xAsset || "2%"};
    `};
  ${({ pos, xAsset, yAsset }) =>
    pos === "top-right" &&
    css`
      top: ${yAsset || "2%"};
      right: ${xAsset || "2%"};
    `};
  ${({ pos, xAsset, yAsset }) =>
    pos === "bottom-right" &&
    css`
      bottom: ${yAsset || "2%"};
      right: ${xAsset || "2%"};
    `};
  ${({ pos, xAsset, yAsset }) =>
    pos === "bottom-left" &&
    css`
      top: ${yAsset || "2%"};
      left: ${xAsset || "2%"};
    `};
  ${({ sx }) => ({ ...sx })}
`;
