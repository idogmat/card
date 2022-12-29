import React, { FC, useState } from "react";
import { Box, Checkbox, IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";

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
      <div>
        <IconButton onClick={() => setAddPackMode(false)}>X</IconButton>
      </div>
      <TextField
        label="Title"
        variant="standard"
        color="primary"
        value={newPackName}
        onChange={(e) => setNewPackName(e.currentTarget.value)}
      />

      <div>
        <Checkbox
          checked={isPrivate}
          onChange={(e) => setPrivate(e.currentTarget.checked)}
          color="primary"
        />
        Private pack
      </div>
      <div>
        {/*<input type='file'>*/}
        {/*  <IconButton>pushPhoto</IconButton>*/}
        {/*</input>*/}
      </div>
      <div>
        <Button color="primary" variant="contained">
          Cancel
        </Button>
        <Button onClick={addNewPack} color="primary" variant="contained">
          addPack
        </Button>
      </div>
    </Box>
  );
});

export default AddNewPack;
