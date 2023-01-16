import React, {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { css, CSSProperties } from "styled-components";
import { StyledComponent } from "../types";

interface IStyledInput {
  styleType: "underline" | undefined;
  border: string;
  error: string | false | undefined;
}

type InputBaseProps = {
  children: JSX.Element;
  className: string;
  error: string | false | undefined;
  id: string;
  label: string;
  name: string;
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style: CSSProperties;
  type: HTMLInputTypeAttribute;
  value: string;
  endItem: React.ReactNode;
  styleType: "underline" | undefined;
  padding: true;
  topPosition: string;
};
const FormForInput = styled.div`
  position: relative;
  display: -webkit-inline-box;
`;
const StyledInput = styled.input.attrs<
  StyledComponent<Partial<InputBaseProps & IStyledInput>>
>((props) => ({
  type: props.type || "text",
  size: props.size,
  endItem: props.endItem,
  padding: props.padding,
  border: props?.styleType === "underline" ? "none" : "1px solid #0c0c0c",
  error: props.error,
}))<StyledComponent<Partial<InputBaseProps & IStyledInput>>>`
  color: #1a191a;
  font-size: 1em;
  box-sizing: border-box;
  width: 90%;
  border: ${(props) => props?.border};
  border-radius: ${(props) => (props?.border === "none" ? "none" : "5px")};
  outline: none;
  border-bottom: 1px solid #0c0c0c;
  margin: ${(props) => props.size || "1em"};
  padding: ${(props) => props.size || "1em"};
  background: transparent;
  transition: 0.3s;
  ${(props) =>
    props.endItem &&
    props.padding &&
    css`
      &[type="password"] {
        padding-right: 55px;
      }
      &[type="text"] {
        padding-right: 55px;
      }
    `}
  ${(props) =>
    !!props?.error
      ? css`
          border-bottom: 1px solid red;
        `
      : css`
          border-bottom: 1px solid #0c0c0c;
        `}
  &:focus {
    border-color: var(--color-blue);
  }

  &:focus ~ div svg {
    fill: var(--color-blue);
  }
`;

const Icon = styled.div<StyledComponent<Partial<{ topPosition: string }>>>`
  position: absolute;
  right: 30px;
  top: ${(props) => props.topPosition || "20px"};

  svg {
    width: 30px;
    height: 30px;
  }
`;
const Label = styled.label.attrs<
  StyledComponent<
    Partial<{
      focus: true | undefined;
      error: string | false | undefined;
    }>
  >
>((props) => ({
  focus: !!props.focus,
  error: !!props.error,
}))<
  StyledComponent<
    Partial<{ focus: boolean; error: string | false | undefined }>
  >
>`
  transition: 0.3s;
  position: absolute;
  z-index: -2;
  text-transform: capitalize;
  ${(props) =>
    props.focus
      ? css`
          font-size: 12px;
          left: 30px;
          transition: 0.3s;
          text-transform: capitalize;
          transform: translateY(-90px);
        `
      : css`
          left: 25px;
          transform: translateY(-50px);
        `}
  ${(props) =>
    props.error &&
    css`
      font-size: 12px;
      left: 30px;
      color: red;
      transition: 0.3s;
      text-transform: capitalize;
      transform: translateY(-90px);
    `}
`;

export const Input: FC<Partial<InputBaseProps>> = ({
  children,
  endItem,
  ...props
}) => {
  // Vars
  const ref = useRef<HTMLInputElement>(null);
  const [onFocus, setFocus] = useState<boolean>(false);

  // Utils
  useEffect(() => {
    document.activeElement === ref.current && setFocus(true);
    console.log(props.error);
  });
  return (
    <FormForInput>
      <StyledInput
        ref={ref}
        {...props}
        endItem={endItem ? true : false}
        onFocus={() => setFocus(true)}
        error={props.error ? props.error : undefined}
      ></StyledInput>
      <Label
        focus={onFocus ? onFocus : undefined}
        error={props.error ? props.error : undefined}
        htmlFor={props.name}
      >
        {props.error || props.name}
      </Label>
      {endItem && <Icon topPosition={props.topPosition}>{endItem}</Icon>}
    </FormForInput>
  );
};
