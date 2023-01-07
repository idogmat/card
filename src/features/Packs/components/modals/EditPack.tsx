import { Box, Checkbox, FormGroup, IconButton, TextField } from "@mui/material";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";

import Button from "@mui/material/Button/Button";
import { IPackResponse } from "../../packsAPI";
import { ModalBase } from "../../../../common/components/Modal";
import { PhotoCamera } from "@mui/icons-material";
import { packsModalsAC } from "../../packsModalsSlice";
import { updateModalSelector } from "./modalsSelectors";
import { updatePackTC } from "../../packsThunks";
import {
  _uploadHandler,
  BACKEND_MAX_IMG_WEIGHT,
  getImgBase64File,
} from "../../../../common/utils/base64Converter";
import { acceptableImgFormats } from "../../../../common/utils/regExp";

interface IUpdatePack {
  name: string;
  deckCover: string;
  isPrivate: boolean;
}

export const EditPack = memo(() => {
  // Dispatch & selectors
  const { isOpen, pack } = useAllSelector(updateModalSelector);
  const truePack = useAllSelector((state) =>
    state.packs.cardPacks.find((p) => p._id === pack._id)
  );
  const dispatch = useAppDispatch();

  // Local state

  // Utils
  const handleClose = () =>
    dispatch(
      packsModalsAC.setUpdatePackState({
        status: false,
        pack: {} as IPackResponse,
      })
    );

  const updatePack = () => {
    if (
      truePack?.name !== pack.name ||
      truePack?.private !== pack.private ||
      truePack?.deckCover !== pack.deckCover
    ) {
      dispatch(updatePackTC({ id: pack._id, ...pack }));
    }
    handleClose();
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    dispatch(packsModalsAC.editPackFields({ ...pack, name }));
  };

  const handleChangeIsPrivate = () => {
    dispatch(packsModalsAC.editPackFields({ ...pack, private: !pack.private }));
  };

  const handleChangeCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileAsString = await getImgBase64File(e, dispatch);
    fileAsString &&
      dispatch(
        packsModalsAC.editPackFields({ ...pack, deckCover: fileAsString })
      );
  };
  return (
    <ModalBase open={isOpen} handleClose={handleClose} modalTitle={"Edit Pack"}>
      <Box>
        <FormGroup>
          <img
            src={pack.deckCover}
            style={{
              width: "100%",
              height: "9.375rem",
              objectFit: "cover",
            }}
            alt="deckCover"
          />
          <TextField
            label="Name pack"
            variant="standard"
            color="primary"
            value={pack.name}
            onChange={handleChangeName}
          />
          <Box>
            Private pack{" "}
            <Checkbox
              checked={pack.private}
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
          <Button onClick={updatePack} color="primary" variant="contained">
            Save pack
          </Button>
        </Box>
      </Box>
    </ModalBase>
  );
});

export default EditPack;
