import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import React, { FC } from "react";

import { CardsTableRow } from "./CardsTableRow";
import { HorizontalRule } from "@mui/icons-material";
import { ICard } from "../../../common/models";
import { IFieldSort } from "../Cards";
import { getSortIcon } from "../../../common/utils/assets";

interface ICardsTableProps {
  cards: ICard[];
  isPackMine: boolean;
  sort: { direction: number; field: string };
  setSort: (value: IFieldSort) => void;
  isLoading: boolean;
}

export const CardsTable: FC<ICardsTableProps> = React.memo(
  ({ cards, isPackMine, sort, setSort, isLoading }) => {
    const isAsc = sort.direction === 1;
    const sortIcon = getSortIcon(isAsc);

    const changeSort = (field: string) => {
      setSort({ direction: sort.direction === 0 ? 1 : 0, field });
    };

    const showSortIcon = (field: string) => {
      return sort.field === field ? sortIcon : <HorizontalRule />;
    };

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead
            sx={{
              "& .table-cell-icon": { display: "flex", alignItems: "center" },
            }}
          >
            <TableCell>
              <Box className={"table-cell-icon"}>Answer</Box>
            </TableCell>
            <TableCell>
              <Box className={"table-cell-icon"}>Answer</Box>
            </TableCell>
            <TableCell onClick={() => changeSort("updated")}>
              <Box className={"table-cell-icon"}>
                Last Updated
                {showSortIcon("updated")}
              </Box>
            </TableCell>
            <TableCell onClick={() => changeSort("grade")}>
              <Box className={"table-cell-icon"}>
                Grade
                {showSortIcon("grade")}
              </Box>
            </TableCell>
          </TableHead>
          <TableBody>
            {cards.map((card) => {
              return (
                <CardsTableRow
                  key={card._id}
                  card={card}
                  isPackMine={isPackMine}
                  isLoading={isLoading}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);
