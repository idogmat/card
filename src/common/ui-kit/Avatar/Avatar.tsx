import styled, { css } from "styled-components";

import { StyledComponent } from "../types";

interface IAvatarProps {
  widthSize: string;
  heightSize: string;
  bgColor: string;
  src: string | null;
  text: string;
}

export const Avatar = styled.div<StyledComponent<Partial<IAvatarProps>>>`
  & {
    position: relative;
    border-radius: 50%;
    width: ${({ widthSize }) => widthSize || "6.25rem"};
    height: ${({ heightSize }) => heightSize || "6.25rem"};
    background: ${({ bgColor }) => bgColor || "var(--color-primary)"};
    ${({ src }) =>
      src &&
      css`
        background: url(${src}) 100% 100% / cover no-repeat;
      `};
  }
  &:after {
    ${({ text, src }) =>
      text &&
      !src &&
      css`
        content: "${text[0].toUpperCase()}";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `}
  }
`;
