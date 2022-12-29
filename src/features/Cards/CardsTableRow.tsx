import { Box, IconButton, Rating, TableCell, TableRow } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import React, { FC } from "react";

import { ICard } from "../../common/models";
import { formDate } from "../../common/utils/date";

interface ICardsTableRowProps {
  card: ICard;
  updateCardHandler: (cardID: string) => void;
  deleteCardHandler: (cardID: string) => void;
  isPackMine: boolean;
}

export const CardsTableRow: FC<ICardsTableRowProps> = React.memo(
  ({ card, updateCardHandler, deleteCardHandler, isPackMine }) => {
    console.log("rendering table row");

    return (
      <TableRow key={card._id}>
        <TableCell>{card.question}</TableCell>
        <TableCell>{card.answer}</TableCell>
        <TableCell>{formDate(`${card.updated}`)}</TableCell>
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
  }
);
