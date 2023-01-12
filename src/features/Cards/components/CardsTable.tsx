import { CardsSwipeIcon, CardsTableWrapper } from "../CardsStyles";
import React, { FC } from "react";
import {
  TableBody,
  TableHeader,
  TableWrapper,
} from "common/ui-kit/Table/Table";

import { CardsTableRow } from "./CardsTableRow";
import { Flex } from "common/ui-kit/Flex/Flex";
import { HorizontalRule } from "@mui/icons-material";
import { ICard } from "../../../common/models";
import { IFieldSort } from "../Cards";
import { MdArrowRightAlt } from "react-icons/md";
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

    return (
      <Flex direction="column">
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
