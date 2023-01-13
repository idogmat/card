import React, {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { CSSProperties } from "styled-components";
import s from "./Input.module.scss";
import { StyledComponent } from "../types";
interface IStyledInput {
  styleType: "underline" | undefined;
  border: string;
  error: string | false | undefined;
}

const StyledInput = styled.input.attrs<
  StyledComponent<Partial<InputBaseProps & IStyledInput>>
>((props) => ({
  type: props.type || "text",
  size: props.size || "1em",
  border: props?.styleType === "underline" ? "none" : "1px solid #0c0c0c",
  error: props.error ? "1px solid red" : "1px solid #0c0c0c",
}))<StyledComponent<Partial<InputBaseProps & IStyledInput>>>`
  color: #1a191a;
  font-size: 1em;
  border: ${(props) => props?.border};
  border-radius: ${(props) => (props?.border === "none" ? "none" : "5px")};
  outline: none;
  border-bottom: ${(props) => props?.error};
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
  transition: 0.3s;
  &:focus {
    border-color: var(--color-blue);
  }
  &:focus + div svg {
    fill: var(--color-blue);
  }
  ::-webkit-input-placeholder {
    text-transform: capitalize;
  }

  :-moz-placeholder {
    text-transform: capitalize;
  }

  ::-moz-placeholder {
    text-transform: capitalize;
  }

  :-ms-input-placeholder {
    text-transform: capitalize;
  }
`;

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
};
const Icon = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  svg {
    width: 30px;
    height: 30px;
  }
`;
export const Input: FC<Partial<InputBaseProps>> = ({
  children,
  endItem,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [onFocus, setFocus] = useState<boolean>(false);
  useEffect(() => {
    document.activeElement === ref.current && setFocus(true);
  });
  return (
    <div style={{ position: "relative" }}>
      <label className={onFocus ? s.focus : s.unFocus} htmlFor={props.name}>
        {props.error || props.name}
      </label>
      <StyledInput ref={ref} placeholder={props.name} {...props}></StyledInput>
      {endItem && <Icon>{endItem}</Icon>}
      {/*{children}*/}
      {/*{props.onError && <span>{props.onError}</span>}*/}
    </div>
  );
};
