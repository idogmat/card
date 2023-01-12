import { CardsSwipeIcon, CardsTableWrapper } from "../CardsStyles";
import React, { FC, useState } from "react";
import { TableBody, TableHeader } from "common/ui-kit/Table/Table";

import { CardsTableRow } from "./CardsTableRow";
import { Flex } from "common/ui-kit/Flex/Flex";
import { HorizontalRule } from "@mui/icons-material";
import { ICard } from "../../../common/models";
import { IFieldSort } from "../Cards";
import { IFormatSelectOption } from "./modals/FormatSelect";
import { MdArrowDownward } from "react-icons/md";
import { Select } from "common/ui-kit/Select/Select";
import { getSortIcon } from "../../../common/utils/assets";

interface ICardsTableProps {
  cards: ICard[];
  isPackMine: boolean;
  sort: { direction: number; field: string };
  setSort: (value: IFieldSort) => void;
}

export const CardsTable: FC<ICardsTableProps> = React.memo(
  ({ cards, isPackMine, sort, setSort }) => {
    const isAsc = sort.direction === 1;
    const sortIcon = getSortIcon(isAsc);

    const changeSort = (field: string) => {
      setSort({ direction: sort.direction === 0 ? 1 : 0, field });
    };

    const showSortIcon = (field: string) => {
      return sort.field === field ? sortIcon : <HorizontalRule />;
    };

    const options: IFormatSelectOption[] = [
      { selectValue: "123", UIValue: "123" },
      { selectValue: "321", UIValue: "321" },
      { selectValue: "213", UIValue: "213" },
    ];

    const [selected, setSelected] = useState("");

    const selectChange = (option: string) => {
      setSelected(option);
    };

    return (
      <Flex direction="column">
        <Select
          options={options}
          selected={selected}
          onChange={selectChange}
          label="select somethin"
          endIcon={<MdArrowDownward />}
        />
        <CardsSwipeIcon />
        <CardsTableWrapper>
          <TableHeader cols="repeat(4, minmax(250px, 1fr))">
            <Flex className={"table-cell-icon"}>Question</Flex>
            <Flex className={"table-cell-icon"}>Answer</Flex>
            <Flex
              className={"table-cell-icon"}
              onClick={() => changeSort("updated")}
              align="center"
            >
              Last Updated
              {showSortIcon("updated")}
            </Flex>
            <Flex className={"table-cell-icon"}>Grade</Flex>
          </TableHeader>
          <TableBody>
            {cards.map((card) => {
              return (
                <CardsTableRow
                  key={card._id}
                  card={card}
                  isPackMine={isPackMine}
                />
              );
            })}
          </TableBody>
        </CardsTableWrapper>
      </Flex>
    );
  }
);
