import { ElementPosition, StyledComponent } from "../types";
import styled, { css } from "styled-components";

import { FC } from "react";

interface IDropdowlistProps {
  // offset: string;
  open: boolean;
  posSettings: Partial<ElementPosition>;
}

const DropdownList = styled.ul<StyledComponent<IDropdowlistProps>>`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  z-index: 49;

  width: max-content;

  position: absolute;
  transform: translate(0, 101%);
  bottom: ${({ posSettings }) => posSettings.bottom};
  right: ${({ posSettings }) => posSettings.right};
  left: ${({ posSettings }) => posSettings.left};
  top: ${({ posSettings }) => posSettings.top};

  padding: 0.625rem !important;
  border-radius: var(--radius);
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  background: #fff;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    `}

  transition: visibility 0.3s ease 0s, opacity 0.3s ease 0s;
`;

export const DropdownItem = styled.li``;

interface IDropdownProps extends IDropdowlistProps {
  children: React.ReactNode;
}
export const Dropdown: FC<IDropdownProps> = ({
  children,
  open,
  posSettings,
}) => {
  return (
    <DropdownList posSettings={posSettings} open={open}>
      {children}
    </DropdownList>
  );
};
