import React, { FC, useState } from "react";
import { Box, Checkbox, FormGroup, IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { PhotoCamera } from "@mui/icons-material";
import { ModalBase } from "../../../../common/components/Modal";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";
import { addNewModalSelector } from "./modalsSelectors";
import packs from "../../Packs";
import { packsModalsAC } from "../../packsModalsSlice";
import { addPackTC } from "../../packsThunks";

interface INewPack {
  name: string;
  deckCover: string;
  private: boolean;
}

const AddNewPack = React.memo(() => {
  const { isOpen } = useAllSelector(addNewModalSelector);
  const dispatch = useAppDispatch();
  const [newPackData, setNewPackData] = useState<INewPack>({
    name: "",
    deckCover: "",
    private: false,
  });
  const addNewPack = () => {
    dispatch(packsModalsAC.addPack(newPackData));
    dispatch(addPackTC(newPackData));
  };
  const handleClose = () =>
    dispatch(packsModalsAC.setAddPackState({ status: false }));

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
            onChange={(e) =>
              setNewPackData((state) => ({
                ...state,
                name: e.target.value,
              }))
            }
          />
          <Box>
            Private pack{" "}
            <Checkbox
              checked={newPackData.private}
              onChange={(e) =>
                setNewPackData((state) => ({
                  ...state,
                  isPrivate: e.target.checked,
                }))
              }
              color="primary"
            />
          </Box>
          <Box>
            <label>
              <input
                style={{ display: "none" }}
                type="file"
                accept={"image/*"}
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

export default AddNewPack;
