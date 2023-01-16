import React, { FC } from "react";
import { Input } from "../../ui-kit/_Input/_Input";
import { Flex } from "../../ui-kit/Flex/Flex";

interface ISearchProps {
  searchValue: string;
  searchChangeHandler: (value: string) => void;
  endItem?: React.ReactNode;
}

export const Search: FC<ISearchProps> = React.memo(
  ({ searchValue, searchChangeHandler, endItem, ...props }) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      searchChangeHandler(e.currentTarget.value);
    };

    return (
      <Flex>
        <Input
          value={searchValue}
          onChange={onChangeHandler}
          error={false}
          endItem={endItem}
          {...props}
        />
      </Flex>
    );
  }
);
