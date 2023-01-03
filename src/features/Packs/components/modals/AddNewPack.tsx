import React, { FC, useState } from "react";
import { Box, Checkbox, FormGroup, IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { PhotoCamera } from "@mui/icons-material";

interface INewPack {
  addPack: (s: string, d: string, b: boolean) => void;
  setAddPackMode: (b: boolean) => void;
}

const AddNewPack: FC<INewPack> = React.memo(({ addPack, setAddPackMode }) => {
  const [newPackName, setNewPackName] = useState("");
  const [newDeckCover, setNewDeckCover] = useState("1");
  const [isPrivate, setPrivate] = React.useState(false);
  const addNewPack = () => {
    addPack(newPackName, newDeckCover, isPrivate);
    setAddPackMode(false);
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
          onClick={() => setAddPackMode(false)}
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button onClick={addNewPack} color="primary" variant="contained">
          Add Pack
        </Button>
      </Box>
    </Box>
  );
});

export default AddNewPack;
