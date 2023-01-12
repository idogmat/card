import React, { FC } from "react";

import { StyledComponent } from "../types";
import styled from "styled-components";

interface IStyledCheckboxProps {
  brColor: string;
  bRadius: string;
  lColor: string;
}

interface IStyledInputProps {
  bgColor: string;
}

const StyledInput = styled.input.attrs({
  type: "checkbox",
})<StyledComponent<Partial<IStyledInputProps>>>`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;

  &:checked + label:before {
    background: ${({ bgColor }) => bgColor || "var(--color-blue)"};
  }
`;

const StyledLabel = styled.label<
  StyledComponent<Partial<IStyledCheckboxProps>>
>`
  cursor: pointer;
  display: inline-flex;
  gap: 0.5rem;
  position: relative;
  align-items: center;
  color: ${({ lColor }) => lColor || "var(--color-primary)"};

  &:before {
    content: "";
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--color-blue);
    border-radius: 0.3125rem;
    transition: background 0.3s ease 0s;
  }
`;

interface ICheckboxProps {
  children: React.ReactNode;
  onChange: (e: React.MouseEvent<HTMLLabelElement>) => void;
  checked: boolean;
  cbSettings?: Partial<IStyledCheckboxProps> & Partial<IStyledInputProps>;
}

export const Checkbox: FC<ICheckboxProps> = ({
  onChange,
  checked,
  children,
  cbSettings,
}) => {
  return (
    <>
      <StyledInput {...cbSettings} checked={checked} />
      <StyledLabel {...cbSettings} onClick={onChange}>
        {children}
      </StyledLabel>
    </>
  );
};
