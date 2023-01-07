import { useAllSelector, useAppDispatch } from "common/hooks";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { FC } from "react";
import { ModalBase } from "common/components/Modal";
import { Typography } from "@mui/material";
import { deleteCardModalSelector } from "features/Cards/components/modals/modalsSelectors";
import { deleteCardTC } from "features/Cards/cardsThunks";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

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
        <Box sx={{ padding: 2 }}>
          <Typography sx={{ marginBottom: 2 }}>
            Do you really want to remove <b>{cardName}</b>
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}
          >
            <Button
              variant="contained"
              sx={{ alignSelf: "start", bgcolor: "#fff", color: "#000" }}
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              sx={{ alignSelf: "start" }}
              onClick={deleteCardHandler}
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </ModalBase>
    </div>
  );
};
