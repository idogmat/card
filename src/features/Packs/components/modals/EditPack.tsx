import React, { FC, useState } from "react";
import { Box, Checkbox, FormGroup, IconButton, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
import { IPackResponse } from "../../packsAPI";
import { EditModeType } from "../../Packs";
interface IEditPack {
  editPackMode: {
    pack: IPackResponse;
    mode: EditModeType;
  };
  setEditPackMode: (state: { pack: IPackResponse; mode: EditModeType }) => void;
  updatePack: (
    id: string,
    name: string,
    deckCover: string,
    isPrivate?: boolean
  ) => void;
}
const EditPack: FC<IEditPack> = ({
  editPackMode,
  setEditPackMode,
  updatePack,
}) => {
  const [newPackName, setNewPackName] = useState(editPackMode.pack.name);
  const [newDeckCover, setNewDeckCover] = useState(editPackMode.pack.deckCover);
  const [isPrivate, setPrivate] = React.useState(editPackMode.pack.private);
  const setNewPackForUpdate = () => {
    updatePack(editPackMode.pack._id, newPackName, newDeckCover, isPrivate);
    setEditPackMode({ pack: {} as IPackResponse, mode: "idle" });
  };
  return (
    <Box>
      <FormGroup>
        <TextField
          label="Name pack"
          variant="standard"
          color="primary"
          value={newPackName}
          onChange={(e) => setNewPackName(e.currentTarget.value)}
        />
        <Box>
          Private pack{" "}
          <Checkbox
            checked={isPrivate}
            onChange={(e) => setPrivate(e.currentTarget.checked)}
            color="primary"
          />
        </Box>
        <Box>
          <label>
            <input style={{ display: "none" }} type="file" accept={"image/*"} />
            <IconButton component="span" color={"primary"}>
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
      </FormGroup>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() =>
            setEditPackMode({ pack: {} as IPackResponse, mode: "idle" })
          }
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          onClick={setNewPackForUpdate}
          color="primary"
          variant="contained"
        >
          Save pack
        </Button>
      </Box>
    </Box>
  );
};

export default EditPack;
