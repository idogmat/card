import React, { FC } from "react";
import { Input } from "../../ui-kit/Input/Input";
import { Flex } from "../../ui-kit/Flex/Flex";

interface ISearchProps {
  searchValue: string;
  searchChangeHandler: (value: string) => void;
  endItem?: React.ReactNode;
  padding?: true | undefined;
  topPosition?: string | undefined;
}

export const Search: FC<ISearchProps> = React.memo(
  ({ searchValue, searchChangeHandler, endItem, padding, topPosition }) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      searchChangeHandler(e.currentTarget.value);
    };

    return (
      <Flex>
        <Input
          topPosition={topPosition}
          padding={padding}
          value={searchValue}
          onChange={onChangeHandler}
          endItem={endItem}
        />
      </Flex>
    );
  }
);
