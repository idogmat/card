import { FC, memo, useRef, useState } from "react";
import styled, { css } from "styled-components";

interface IInputLabel {
  active: boolean;
  error: boolean;
}

interface IInputField {
  type: string;
}

const InputWrapper = styled.div<IInputLabel>`
  position: relative;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.3125rem;

  border-bottom: 1px solid;
  border-bottom-color: ${({ active }) =>
    active ? "var(--color-darker-blue)" : "var(--color-blue)"};
  transition: border 0.3s ease 0s;

  & label {
    ${({ active }) =>
      active &&
      css`
        bottom: calc(100% - 1rem);
        font-size: 0.75rem;
        color: var(--color-darker-blue);
      `};
  }

  ${({ error }) =>
    error &&
    css`
      border-bottom-color: var(--color-error);

      & label {
        color: var(--color-error);
      }
    `}
`;

const InputLabel = styled.label`
  position: absolute;
  bottom: 1%;
  left: 1%;

  color: var(--color-primary);
  font-size: 0.9rem;

  transition: font-size 0.2s linear 0s, bottom 0.3s ease 0s, color 0.3s ease 0s;
`;

const InputField = styled.input.attrs<IInputField>((props) => ({
  type: props.type || "text",
}))`
  position: relative;
  z-index: 10;

  background: transparent;
  border: none;
  outline: none;
  padding: 0px 1%;

  width: 100%;
  height: 40px;
`;

const InputEndItemWrapper = styled.div``;

interface IInputProps {
  label?: string;
  error: boolean;
  endItem?: React.ReactNode;
  type?: string;
}

export const Input: FC<IInputProps> = memo(
  ({ label, error, endItem, type }) => {
    // Vars
    const [isFocused, setIsFocused] = useState(false);
    const inpRef = useRef<HTMLInputElement>(null);
    const inpHasText = inpRef.current?.value;
    const active = !!(isFocused || inpHasText);

    // Utils
    const enableFocus = () => setIsFocused(true);
    const disableFocus = () => setIsFocused(false);

    console.log("error", error);

    return (
      <InputWrapper active={active} error={error}>
        <InputLabel>{label}</InputLabel>
        <InputField
          ref={inpRef}
          onFocus={enableFocus}
          onBlur={disableFocus}
          type={type}
        />
        {endItem && <InputEndItemWrapper>{endItem}</InputEndItemWrapper>}
      </InputWrapper>
    );
  }
);
