import {
  Box,
  IconButton,
  Rating,
  Skeleton,
  TableCell,
  TableRow,
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import React, { FC } from "react";

import { CardsModalsAC } from "../cardsModalsSlice";
import { ICard } from "../../../common/models";
import { formDate } from "../../../common/utils/date";
import { useAppDispatch } from "common/hooks";

interface ICardsTableRowProps {
  card: ICard;
  isPackMine: boolean;
  isLoading: boolean;
}

export const CardsTableRow: FC<ICardsTableRowProps> = React.memo(
  ({ card, isPackMine, isLoading }) => {
    // dispatch & selectors
    const dispatch = useAppDispatch();
    const updateCardData = {
      question: card.question,
      answer: card.answer,
      cardID: card._id,
    };
    const deleteCardData = {
      cardID: card._id,
      cardName: card.question,
    };

    // Utils
    const openDeleteModal = () => {
      dispatch(CardsModalsAC.setDeleteCardState({ state: true }));
      dispatch(CardsModalsAC.setDeleteCardData(deleteCardData));
    };
    const openUpdateModal = () => {
      dispatch(CardsModalsAC.setUpdateCardState({ state: true }));
      dispatch(CardsModalsAC.setUpdateCardData(updateCardData));
    };

    return (
      <TableRow key={card._id}>
        <TableCell>{isLoading ? <Skeleton /> : card.question}</TableCell>
        <TableCell>{isLoading ? <Skeleton /> : card.answer}</TableCell>
        <TableCell>
          {isLoading ? <Skeleton /> : formDate(`${card.updated}`)}
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Rating
                name={"read-only"}
                value={Math.floor(card.grade)}
                readOnly
                precision={0.5}
              />
            )}
            {isPackMine && (
              <>
                <IconButton>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <Edit onClick={openUpdateModal} />
                  )}
                </IconButton>
                <IconButton onClick={openDeleteModal}>
                  {isLoading ? <Skeleton /> : <DeleteOutline />}
                </IconButton>
              </>
            )}
          </Box>
        </TableCell>
      </TableRow>
    );
  }
);
