import { FC, useRef } from "react";
import styled, { css } from "styled-components";

import { Flex } from "../Flex/Flex";
import { IFormatSelectOption } from "features/Cards/components/modals/FormatSelect";
import React from "react";
import { Typography } from "../Text/Typography";
import { useComponentVisible } from "common/hooks/isComponentVisible";
import { viewportOffset } from "common/utils/isInViewPort";

interface ISelectMenuProps {
  opened: boolean;
  viewportOffset: number;
}

interface ISelectEndIconProps {
  opened: boolean;
}

interface ISelectItemProps {
  selected: boolean;
}

export const SelectWrapper = styled.div`
  position: relative;
`;

export const SelectLabel = styled.div`
  /* border: 1px solid var(--color-primary); */
  cursor: pointer;
  transition: border-color 0.3s ease 0s;
  border: 1px solid #00000056;
  padding: 0.625rem;
  border-radius: var(--radius);
  position: relative;

  @media (any-hover: hover) {
    &:hover {
      border-color: #000;
    }
  }
`;

export const SelectMenu = styled.ul<ISelectMenuProps>`
  position: absolute;
  width: 100%;
  z-index: 50;
  overflow: hidden;

  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  border-radius: var(--radius);
  transform: ${({ viewportOffset }) =>
    viewportOffset >= 0
      ? "translate(0, 101%)"
      : `translate(0, calc(101% - ${Math.abs(viewportOffset) + 10}px))`};

  bottom: 0;

  visibility: hidden;
  pointer-events: none;
  opacity: 0;

  transition: visibility 0.3s ease 0s, opacity 0.3s ease 0s;
  background: white;

  ${({ opened }) =>
    opened &&
    css`
      visibility: visible;
      pointer-events: auto;
      opacity: 1;
    `}
`;

export const SelectItem = styled.li<ISelectItemProps>`
  cursor: pointer;

  padding: 0.625rem;

  background: ${({ selected }) =>
    selected ? "var(--color-blue)" : "transparent"};

  @media (any-hover: hover) {
    &:hover {
      background: var(--color-blue);
      opacity: 0.8;
    }
  }
  transition: background 0.3s ease 0s, opacity 0.3s ease 0s;
`;

export const SelectEndIcon = styled.div<ISelectEndIconProps>`
  transition: transform 0.3s ease 0s;
  display: flex;
  align-items: center;

  ${({ opened }) =>
    opened &&
    css`
      transform: rotate(-180deg);
    `}
`;

export interface ISelectProps {
  options: IFormatSelectOption[];
  selected: string;
  onChange: (option: string) => void;
  label?: string;
  endIcon?: React.ReactNode;
}

export const Select: FC<ISelectProps> = ({
  options,
  selected,
  onChange,
  label,
  endIcon,
}) => {
  // Hooks
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const selectMenuRef = useRef<any>(null);

  // Vars
  const labelBottomOffset = viewportOffset(ref.current);
  const menuDelta = labelBottomOffset
    ? labelBottomOffset - selectMenuRef.current.scrollHeight
    : 0;

  // Utils
  const toggleMenu = () => setIsComponentVisible((prev) => !prev);
  const closeMenu = () => setIsComponentVisible(false);

  const selectOption = (option: string) => {
    onChange(option);
    closeMenu();
  };

  return (
    <SelectWrapper>
      <SelectLabel ref={ref} onClick={toggleMenu}>
        <Flex align="center" sx={{ gap: "0.625rem", pointerEvents: "none" }}>
          <Typography as="p" sx={{ flex: "1 1 auto" }}>
            {selected ? selected : label}
          </Typography>
          <SelectEndIcon opened={isComponentVisible}>{endIcon}</SelectEndIcon>
        </Flex>
      </SelectLabel>
      <SelectMenu
        ref={selectMenuRef}
        opened={isComponentVisible}
        viewportOffset={menuDelta}
      >
        {options.map((option) => {
          return (
            <SelectItem
              selected={option.selectValue === selected}
              onClick={() => selectOption(option.selectValue)}
            >
              {option.UIValue}
            </SelectItem>
          );
        })}
      </SelectMenu>
    </SelectWrapper>
  );
};
