import { Box, FormGroup, Typography } from "@mui/material";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";

import Button from "@mui/material/Button/Button";
import { IPackResponse } from "../../packsAPI";
import { ModalBase } from "../../../../common/components/Modal";
import { deleteModalSelector } from "./modalsSelectors";
import { memo } from "react";
import { packsModalsAC } from "../../packsModalsSlice";
import { removePackTC } from "../../packsThunks";

export const DeletePack = memo(() => {
  // Dispatch & selectors
  const { isOpen, pack } = useAllSelector(deleteModalSelector);
  const dispatch = useAppDispatch();

  // Utils
  const handleClose = () =>
    dispatch(
      packsModalsAC.setDeletePackState({
        status: false,
        pack: {} as IPackResponse,
      })
    );

  const deletePack = () => {
    dispatch(removePackTC(pack._id));
    handleClose();
  };

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
          <Button onClick={deletePack} color="primary" variant="contained">
            Delete
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
});
