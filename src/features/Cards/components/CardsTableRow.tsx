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
    const deleteCardData = {
      cardID: card._id,
      cardName: card.question,
    };

    // Vars
    const isCardQuestionImg =
      card.questionImg && card.questionImg !== "undefined";
    const isCardAnswerImg = card.questionImg && card.answerImg !== "undefined";

    // Utils
    const openDeleteModal = () => {
      dispatch(CardsModalsAC.setDeleteCardState({ state: true }));
      dispatch(CardsModalsAC.setDeleteCardData(deleteCardData));
    };
    const openUpdateModal = () => {
      dispatch(CardsModalsAC.setUpdateCardState({ state: true }));
      dispatch(CardsModalsAC.setInitialUpdateCardData({ card }));
    };

    return (
      <TableRow key={card._id}>
        <TableCell>
          {isCardQuestionImg ? (
            <img
              src={card.questionImg}
              alt=""
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            card.question
          )}
        </TableCell>
        <TableCell>
          {isCardAnswerImg ? (
            <img
              src={card.answerImg}
              alt=""
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            card.answer
          )}
        </TableCell>
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
                  <Edit onClick={openUpdateModal} />
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
