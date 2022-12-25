import React, { useState } from "react";
import { useAppDispatch } from "../../common/hooks";
import { useNavigate } from "react-router-dom";
import { Box, Checkbox, IconButton, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { addPackTC } from "./packsThunks";

const AddNewPack = (props: any) => {
  const [newPackName, setNewPackName] = useState("");
  const [newDeckCover, setNewDeckCover] = useState("1");
  const [isPrivate, setPrivate] = React.useState(false);
  const dispatch = useAppDispatch();
  const addPack = () => {
    dispatch(addPackTC(newPackName, newDeckCover, isPrivate));
  };

  return (
    <Box>
      <div>
        <IconButton onClick={() => props.setAddPackMode(false)}>X</IconButton>
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
        <Button onClick={addPack} color="primary" variant="contained">
          addPack
        </Button>
      </div>
    </Box>
  );
};

export default AddNewPack;
