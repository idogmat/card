import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useAllSelector, useAppDispatch } from "common/hooks";

import { Box } from "@mui/system";
import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { IAddCardRequest } from "../../cardsAPI";
import { ICardData } from "./CardsModals";
import { ModalBase } from "common/components/Modal";
import { addCardModalSelector } from "./modalsSelectors";
import { addCardTC } from "../../cardsThunks";

interface ICardsAddModalProps {
  packID: string;
}

export const CardsAddModal: FC<ICardsAddModalProps> = ({ packID }) => {
  // Selectors & dispatch
  const dispatch = useAppDispatch();
  const { isOpen } = useAllSelector(addCardModalSelector);

  // Local States
  const [newCardData, setNewCardData] = useState<ICardData>({} as ICardData);

  // Utils
  const setNewCardDataQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardData({ ...newCardData, question: e.currentTarget.value });
  };

  const setNewCardDataAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardData({ ...newCardData, answer: e.currentTarget.value });
  };

  const handleClose = () => {
    dispatch(CardsModalsAC.setAddCardState({ state: false }));
    setNewCardData({} as ICardData);
  };

  const addNewCardHandler = () => {
    const cardData: IAddCardRequest = {
      card: {
        cardsPack_id: packID,
        answer: newCardData.answer,
        question: newCardData.question,
      },
    };
    dispatch(addCardTC(cardData));
    handleClose();
  };

  return (
    <div>
      <ModalBase
        open={isOpen}
        handleClose={handleClose}
        modalTitle="Add new card"
      >
        <Box sx={{ padding: 2 }}>
          <FormGroup sx={{ display: "grid", gap: 1 }}>
            <TextField
              label="Enter the new question"
              variant="standard"
              value={newCardData.question}
              onChange={setNewCardDataQuestion}
            />
            <TextField
              variant="standard"
              label="Enter the new answer"
              value={newCardData.answer}
              onChange={setNewCardDataAnswer}
              sx={{ marginBottom: 3 }}
            />
            <FormControl>
              <Button
                variant="contained"
                sx={{ alignSelf: "start" }}
                onClick={addNewCardHandler}
              >
                Add new pack
              </Button>
            </FormControl>
          </FormGroup>
        </Box>
      </ModalBase>
    </div>
  );
};
