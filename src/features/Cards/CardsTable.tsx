import React, { FC } from "react";
import {
  Box,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowDropUp,
  DeleteOutline,
  Edit,
  HorizontalRule,
} from "@mui/icons-material";
import { ICard } from "../../common/models";

interface ICardsSort {
  direction: number;
  field: string;
}

interface ICardsTableProps {
  cards: ICard[];
  isPackMine: boolean;
  sort: { direction: number; field: string };
  deleteCardHandler: (cardID: string) => void;
  updateCardHandler: (cardID: string) => void;
  setSort: (value: ICardsSort) => void;
}

export const CardsTable: FC<ICardsTableProps> = ({
  cards,
  isPackMine,
  deleteCardHandler,
  updateCardHandler,
  sort,
  setSort,
}) => {
  const isAsc = sort.direction === 1;
  const sortIcon = isAsc ? <ArrowDropDown /> : <ArrowDropUp />;
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
              <TableRow key={card._id}>
                <TableCell>{card.question}</TableCell>
                <TableCell>{card.answer}</TableCell>
                <TableCell>{card.updated.toString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                      name={"read-only"}
                      value={Math.floor(card.grade)}
                      readOnly
                      precision={0.5}
                    />
                    {isPackMine && (
                      <>
                        <IconButton>
                          <Edit onClick={() => updateCardHandler(card._id)} />
                        </IconButton>
                        <IconButton onClick={() => deleteCardHandler(card._id)}>
                          <DeleteOutline />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
