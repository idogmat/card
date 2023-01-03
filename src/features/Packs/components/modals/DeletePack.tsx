import React, { FC } from "react";
import { Box, FormGroup, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { IPackResponse } from "../../packsAPI";
import { EditModeType } from "../../Packs";
import { ModalBase } from "../../../../common/components/Modal";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";
import { addNewModalSelector, deleteModalSelector } from "./modalsSelectors";
import { removePackTC } from "../../packsThunks";
import { packsModalsAC } from "../../packsModalsSlice";

interface IRemovePack {}

const DeletePack = React.memo(({}) => {
  const { isOpen, pack } = useAllSelector(deleteModalSelector);
  const dispatch = useAppDispatch();
  const remove = () => {
    dispatch(removePackTC(pack._id));
  };
  const handleClose = () =>
    dispatch(
      packsModalsAC.setDeletePackState({
        status: false,
        pack: {} as IPackResponse,
      })
    );

  return (
    <ModalBase
      open={isOpen}
      handleClose={handleClose}
      modalTitle={"Delete Pack"}
    >
      <Box>
        <FormGroup>
          <Box sx={{ padding: 2 }}>
            <Typography sx={{ marginBottom: 2 }}>
              Do you really want to remove <b>{pack.name}</b>
            </Typography>
          </Box>
        </FormGroup>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={remove} color="primary" variant="contained">
            Delete
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
});

export default DeletePack;
