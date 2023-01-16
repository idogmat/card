import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "../Button/Button";
import { Flex } from "../Flex/Flex";
import { MdSearch } from "react-icons/md";

interface ISearchWrapperProps {
  focused: boolean;
}

const SearchWrapper = styled(Flex).attrs({
  alignItems: "center",
})<ISearchWrapperProps>`
  border: 1px solid transparent;
  border-color: ${({ focused }) =>
    focused ? "var(--color-darker-blue)" : "grey"};
  border-radius: var(--radius);
  height: 3.4375rem;

  transition: border-color 0.3s ease 0s;
`;

const SearchInput = styled.input.attrs({
  type: "text",
})`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
`;

const SearchIconButton = styled(Button)`
  opacity: 1 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 1 30px;
  padding: 0.6rem;
`;

const SearchIcon = styled(MdSearch)`
  /* color: var(--color-primary); */
  color: #000;
  font-size: 1.25rem;
`;

interface ISearchProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (value: string) => void;
  value: string;
  btnDisabled?: boolean;
}

export const Search: FC<ISearchProps> = ({
  value,
  onChange,
  btnDisabled,
  onClick,
}) => {
  // Vars
  const [isFocused, setIsFocused] = useState(false);

  // Utils
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  const enableFocus = () => setIsFocused(true);
  const disableFocus = () => setIsFocused(false);

  return (
    <SearchWrapper focused={isFocused}>
      <SearchIconButton semantic disabled={btnDisabled} onClick={onClick}>
        <SearchIcon />
      </SearchIconButton>
      <SearchInput
        value={value}
        onChange={changeHandler}
        onFocus={enableFocus}
        onBlur={disableFocus}
      />
    </SearchWrapper>
  );
};
