import { useAllSelector, useAppDispatch } from "common/hooks";

import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { FC } from "react";
import { ModalBase } from "common/components/Modal";
import { deleteCardModalSelector } from "features/Cards/components/modals/modalsSelectors";
import { deleteCardTC } from "features/Cards/cardsThunks";
import { Flex } from "common/ui-kit/Flex/Flex";
import { Typography } from "common/ui-kit/Text/Typography";
import { Button } from "common/ui-kit/Button/Button";

interface IUpdateCardModalProps {
  packID: string;
}

export const CardsDeleteModal: FC<IUpdateCardModalProps> = ({ packID }) => {
  // dispatch & selectors
  const dispatch = useAppDispatch();
  const { isOpen, cardID, cardName } = useAllSelector(deleteCardModalSelector);

  // Utils

  const handleClose = () =>
    dispatch(CardsModalsAC.setDeleteCardState({ state: false }));

  const deleteCardHandler = () => {
    dispatch(deleteCardTC({ cardID, packID }));
    handleClose();
  };

  return (
    <div>
      <ModalBase
        handleClose={handleClose}
        modalTitle="Delete card"
        open={isOpen}
      >
        <Flex fDirection="column" sx={{ padding: "0.6rem" }}>
          <Typography sx={{ marginBottom: "0.6rem" }}>
            Do you really want to remove <b>{cardName}</b>
          </Typography>
          <Flex justify="space-between" sx={{ gap: "0.3rem" }}>
            <Button
              sx={{
                alignSelf: "start",
                backgroundColor: "#fff",
                color: "#000",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                alignSelf: "start",
                backgroundColor: "var(--color-error)",
                color: "#fff",
              }}
              onClick={deleteCardHandler}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </ModalBase>
    </div>
  );
};
