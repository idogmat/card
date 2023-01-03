import React, { FC, useState } from "react";
import { Box, Checkbox, FormGroup, IconButton, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
import { IPackResponse } from "../../packsAPI";
import { EditModeType } from "../../Packs";
import { ModalBase } from "../../../../common/components/Modal";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";
import { deleteModalSelector, updateModalSelector } from "./modalsSelectors";
import { packsModalsAC } from "../../packsModalsSlice";
import { updatePackTC } from "../../packsThunks";
interface IUpdatePack {
  name: string;
  deckCover: string;
  private: boolean;
}
const EditPack = () => {
  const { isOpen, pack } = useAllSelector(updateModalSelector);
  const dispatch = useAppDispatch();
  const [updatePackData, setUpdatePackData] = useState<IUpdatePack>({
    name: "",
    deckCover: "",
    private: false,
  });
  const handleClose = () =>
    dispatch(
      packsModalsAC.setUpdatePackState({
        status: false,
        pack: {} as IPackResponse,
      })
    );

  const updatePack = () => {
    dispatch(updatePackTC({ id: pack._id, ...updatePackData }));
  };
  return (
    <ModalBase open={isOpen} handleClose={handleClose} modalTitle={"Edit Pack"}>
      <Box>
        <FormGroup>
          <TextField
            label="Name pack"
            variant="standard"
            color="primary"
            value={updatePackData.name}
            onChange={(e) =>
              setUpdatePackData((state) => ({
                ...state,
                name: e.target.value,
              }))
            }
          />
          <Box>
            Private pack{" "}
            <Checkbox
              checked={updatePackData.private}
              onChange={(e) =>
                setUpdatePackData((state) => ({
                  ...state,
                  private: e.target.checked,
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
          <Button onClick={updatePack} color="primary" variant="contained">
            Save pack
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
};

export default EditPack;
