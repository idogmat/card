import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { FC, useState } from "react";

import { Box } from "@mui/system";
import { IAddCardRequest } from "./cardsAPI";
import { ModalBase } from "common/components/Modal";
import { addCardTC } from "./cardsThunks";
import { useAppDispatch } from "common/hooks";

interface ICardsAddModalProps {
  open: boolean;
  handleClose: () => void;
  packID: string;
}

interface INewCardData {
  question: string;
  answer: string;
}

export const CardsAddModal: FC<ICardsAddModalProps> = ({
  open,
  handleClose,
  packID,
}) => {
  // Selectors & dispatch
  const dispatch = useAppDispatch();

  // Local States
  const [newCardData, setNewCardData] = useState<INewCardData>(
    {} as INewCardData
  );

  // Utils
  const setNewCardDataQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardData({ ...newCardData, question: e.currentTarget.value });
  };

  const setNewCardDataAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardData({ ...newCardData, answer: e.currentTarget.value });
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
        open={open}
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
