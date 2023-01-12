import { Box, Checkbox, FormGroup, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";

import Button from "@mui/material/Button";
import { ModalBase } from "../../../../common/components/Modal";
import { PhotoCamera } from "@mui/icons-material";
import { addNewModalSelector } from "./modalsSelectors";
import { addPackTC } from "../../packsThunks";
import { packsModalsAC } from "../../packsModalsSlice";
import { getImgBase64File } from "../../../../common/utils/base64Converter";
import { FormInModal, Modal } from "../../../../common/ui-kit/Modal/Modal";
import { Flex } from "../../../../common/ui-kit/Flex/Flex";

export interface INewPack {
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
    if (newPackData.name) {
      dispatch(addPackTC(newPackData));
      setNewPackData({} as INewPack);
      handleClose();
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setNewPackData((state) => ({ ...state, name }));
  };

  const handleChangeIsPrivate = () => {
    setNewPackData((state) => ({ ...state, isPrivate: !state.isPrivate }));
  };

  const handleChangeCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileAsString = await getImgBase64File(e, dispatch);
    fileAsString &&
      setNewPackData((state) => ({ ...state, deckCover: fileAsString }));
  };

  return (
    <Modal open={isOpen} close={handleClose}>
      <FormInModal>
        <Flex
          align={"center"}
          justify={"center"}
          sx={{ margin: "auto", display: "flex", flexDirection: "column" }}
        >
          <FormGroup>
            {newPackData.deckCover && (
              <img
                src={newPackData.deckCover}
                style={{
                  width: "100%",
                  height: "9.375rem",
                  objectFit: "cover",
                }}
                alt="deckCover"
              />
            )}
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
                  onChange={(e) => handleChangeCover(e)}
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
        </Flex>
      </FormInModal>
    </Modal>
  );
});
