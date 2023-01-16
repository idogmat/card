import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import React, { FC } from "react";
import { TableBodyItem, TableBodyLine } from "common/ui-kit/Table/Table";

import { CardsIconButton, CardsTableImg } from "../CardsStyles";
import { CardsModalsAC } from "../cardsModalsSlice";
import { Flex } from "common/ui-kit/Flex/Flex";
import { ICard } from "../../../common/models";
import ReactStars from "react-stars";
import { formDate } from "../../../common/utils/date";
import { useAppDispatch } from "common/hooks";

interface ICardsTableRowProps {
  card: ICard;
  isPackMine: boolean;
}

export const CardsTableRow: FC<ICardsTableRowProps> = React.memo(
  ({ card, isPackMine }) => {
    // dispatch & selectors
    const dispatch = useAppDispatch();

    // Vars
    const isCardQuestionImg =
      card.questionImg && card.questionImg !== "undefined";
    const isCardAnswerImg = card.answerImg && card.answerImg !== "undefined";

    // Utils
    const openDeleteModal = () => {
      dispatch(CardsModalsAC.setDeleteCardState({ state: true }));
      dispatch(CardsModalsAC.setDeleteCardData({ card }));
    };

    const openUpdateModal = () => {
      dispatch(CardsModalsAC.setUpdateCardState({ state: true }));
      dispatch(CardsModalsAC.setInitialUpdateCardData({ card }));
    };

    return (
      <TableBodyLine cols="repeat(4, minmax(250px, 1fr))">
        <TableBodyItem>
          {isCardQuestionImg ? (
            <CardsTableImg src={card.questionImg} alt="" />
          ) : (
            card.question
          )}
        </TableBodyItem>
        <TableBodyItem>
          {isCardAnswerImg ? (
            <CardsTableImg src={card.answerImg} alt="" />
          ) : (
            card.answer
          )}
        </TableBodyItem>
        <TableBodyItem>{formDate(`${card.updated}`)}</TableBodyItem>
        <TableBodyItem>
          <Flex align="center" sx={{ gap: "0.625rem" }}>
            <ReactStars value={Math.floor(card.grade)} edit={false} size={30} />
            {isPackMine && (
              <>
                <CardsIconButton semantic onClick={openUpdateModal}>
                  <AiOutlineEdit />
                </CardsIconButton>
                <CardsIconButton semantic onClick={openDeleteModal}>
                  <AiOutlineDelete />
                </CardsIconButton>
              </>
            )}
          </Flex>
        </TableBodyItem>
      </TableBodyLine>
    );
  }
);
