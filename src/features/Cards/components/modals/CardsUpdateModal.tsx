import { useAllSelector, useAppDispatch } from "common/hooks";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { FC } from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import { ModalBase } from "common/components/Modal";
import TextField from "@mui/material/TextField/TextField";
import { updateCardModalSelector } from "features/Cards/components/modals/modalsSelectors";
import { updateCardTC } from "features/Cards/cardsThunks";

interface IUpdateCardModalProps {
  packID: string;
}

export const CardsUpdateModal: FC<IUpdateCardModalProps> = ({ packID }) => {
  // dispatch & selectors
  const dispatch = useAppDispatch();
  const { cardID, question, answer, isOpen } = useAllSelector(
    updateCardModalSelector
  );
  const trueCard = useAllSelector((state) =>
    state.cards.cards.find((c) => c._id === cardID)
  );

  // Utils

  const handleClose = () =>
    dispatch(CardsModalsAC.setUpdateCardState({ state: false }));

  const setAnswer = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      CardsModalsAC.setUpdateCardAnswer({ answer: e.currentTarget.value })
    );
  const setQuestion = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      CardsModalsAC.setUpdateCardQuestion({ question: e.currentTarget.value })
    );

  const updateCardHandler = () => {
    if (answer === trueCard?.answer && question === trueCard?.question) {
      handleClose();
    } else {
      const model = {
        card: {
          _id: cardID,
          question,
          answer,
        },
      };
      dispatch(updateCardTC({ packID, model }));
      handleClose();
    }
  };

  return (
    <div>
      <ModalBase handleClose={handleClose} modalTitle="Edit card" open={isOpen}>
        <Box sx={{ padding: 2 }}>
          <FormGroup sx={{ display: "grid", gap: 1 }}>
            <TextField
              label="Enter the new question"
              variant="standard"
              value={question}
              onChange={setQuestion}
            />
            <TextField
              variant="standard"
              label="Enter the new answer"
              value={answer}
              onChange={setAnswer}
              sx={{ marginBottom: 3 }}
            />
            <FormControl>
              <Button
                variant="contained"
                sx={{ alignSelf: "start" }}
                onClick={updateCardHandler}
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
