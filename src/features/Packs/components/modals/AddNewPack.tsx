import { Box, Checkbox, FormGroup, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";

import Button from "@mui/material/Button/Button";
import { ModalBase } from "../../../../common/components/Modal";
import { PhotoCamera } from "@mui/icons-material";
import { addNewModalSelector } from "./modalsSelectors";
import { addPackTC } from "../../packsThunks";
import { packsModalsAC } from "../../packsModalsSlice";
import { uploadHandler } from "../../../../common/utils/loadPhoto";

interface INewPack {
  name: string;
  deckCover: string;
  isPrivate: boolean;
}

export const AddNewPack = React.memo(() => {
  // Selector & dispatch
  const { isOpen } = useAllSelector(addNewModalSelector);
  const dispatch = useAppDispatch();

  // Local states
  const [newPackData, setNewPackData] = useState<INewPack>({
    name: "",
    deckCover: "",
    isPrivate: false,
  });

  // Utils

  const handleClose = () =>
    dispatch(packsModalsAC.setAddPackState({ status: false }));

  const addNewPack = () => {
    dispatch(addPackTC(newPackData));
    handleClose();
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setNewPackData((state) => ({ ...state, name }));
  };

  const handleChangeIsPrivate = () => {
    setNewPackData((state) => ({ ...state, isPrivate: !state.isPrivate }));
  };
  const handleChangeCover = (fileAsString: string) => {
    setNewPackData((state) => ({ ...state, deckCover: fileAsString }));
  };

  return (
    <ModalBase
      open={isOpen}
      handleClose={handleClose}
      modalTitle={"Add New Pack"}
    >
      <Box>
        <FormGroup>
          <TextField
            label="Name pack"
            variant="standard"
            color="primary"
            value={newPackData.name}
            onChange={handleChangeName}
          />
          <Box>
            Private pack{" "}
            <Checkbox
              checked={newPackData.isPrivate}
              onChange={handleChangeIsPrivate}
              color="primary"
            />
          </Box>
          <Box>
            <label>
              <input
                style={{ display: "none" }}
                type="file"
                accept={"image/*"}
                onChange={(e) => uploadHandler(e, handleChangeCover)}
              />
              <IconButton component="span" color={"primary"}>
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
        </FormGroup>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={addNewPack} color="primary" variant="contained">
            Add Pack
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
});
