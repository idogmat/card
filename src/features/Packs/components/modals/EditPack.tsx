import React, { FC, useState } from "react";
import { Box, Checkbox, FormGroup, IconButton, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
interface IEditPack {
  editPackMode: { id: string; packName: string; mode: boolean };
  updatePack: (
    id: string,
    name: string,
    deckCover: string,
    isPrivate?: boolean
  ) => void;
  setEditPackMode: (state: {
    id: string;
    packName: string;
    mode: boolean;
  }) => void;
}
const EditPack: FC<IEditPack> = ({
  editPackMode,
  setEditPackMode,
  updatePack,
}) => {
  const [newPackName, setNewPackName] = useState(editPackMode.packName);
  const [newDeckCover, setNewDeckCover] = useState("1");
  const [isPrivate, setPrivate] = React.useState(false);
  const setNewPackForUpdate = () => {
    updatePack(editPackMode.id, newPackName, newDeckCover, isPrivate);
    setEditPackMode({ id: "", packName: "", mode: false });
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
          onClick={() => setEditPackMode({ id: "", packName: "", mode: false })}
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
