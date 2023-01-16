import React, {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { CSSProperties } from "styled-components";
import s from "./Input.module.scss";

const StyledInput = styled.input.attrs((props) => ({
  type: props.type || "text",
  size: props.size || "1em",
  error: props.onError ? "1px solid red" : "1px solid #0c0c0c",
}))`
  color: #1a191a;
  font-size: 1em;
  border: none;
  outline: none;
  border-bottom: ${(props) => props.error};
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
  transition: 0.3s;
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
  children: ReactChild;
  className: string;
  onError: boolean | string;
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
};

const Icon = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
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
  }, [document.activeElement]);

  return (
    <div style={{ position: "relative" }}>
      <label className={onFocus ? s.focus : s.unFocus} htmlFor={props.name}>
        {props.onError || props.name}
      </label>
      <StyledInput ref={ref} placeholder={props.name} {...props} />
      {endItem && <Icon>{endItem}</Icon>}
      {/*{children}*/}
      {/*{props.onError && <span>{props.onError}</span>}*/}
    </div>
  );
};
