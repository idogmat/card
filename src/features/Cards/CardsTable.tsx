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
import { DeleteOutline, Edit, Remove } from "@mui/icons-material";
import { ICard } from "../../common/models";

interface ICardsTableProps {
  cards: ICard[];
  isPackMine: boolean;
  deleteCardHandler: (cardID: string) => void;
}

export const CardsTable: FC<ICardsTableProps> = ({
  cards,
  isPackMine,
  deleteCardHandler,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableCell>Question</TableCell>
          <TableCell>Answer</TableCell>
          <TableCell>Last Updated</TableCell>
          <TableCell>Grade</TableCell>
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
                          <Edit />
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
