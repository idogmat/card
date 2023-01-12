import React, { FC } from "react";
import search from "./../../../assets/img/search.svg";
import { Input } from "../../ui-kit/Input/Input";
import { Flex } from "../../ui-kit/Flex/Flex";

interface ISearchProps {
  searchValue: string;
  searchChangeHandler: (value: string) => void;
  endItem?: React.ReactNode;
}

export const Search: FC<ISearchProps> = React.memo(
  ({ searchValue, searchChangeHandler, endItem }) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      searchChangeHandler(e.currentTarget.value);
    };

    return (
      <Flex>
        <Input
          value={searchValue}
          onChange={onChangeHandler}
          endItem={endItem}
        />
      </Flex>
    );
  }
);
