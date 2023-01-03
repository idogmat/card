import React, { FC, useState } from "react";
import {
  Box,
  Checkbox,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button/Button";
import { PhotoCamera } from "@mui/icons-material";

interface IRemovePack {
  deletePackMode: { id: string; packName: string; mode: boolean };
  removePack: (id: string) => void;
  setDeletePackMode: (state: {
    id: string;
    packName: string;
    mode: boolean;
  }) => void;
}

const DeletePack: FC<IRemovePack> = React.memo(
  ({ removePack, setDeletePackMode, deletePackMode }) => {
    const remove = () => {
      removePack(deletePackMode.id);
      setDeletePackMode({ id: "", packName: "", mode: false });
    };

    return (
      <Box>
        <FormGroup>
          <Box sx={{ padding: 2 }}>
            <Typography sx={{ marginBottom: 2 }}>
              Do you really want to remove <b>{deletePackMode.packName}</b>
            </Typography>
          </Box>
        </FormGroup>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() =>
              setDeletePackMode({ id: "", packName: "", mode: false })
            }
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={remove} color="primary" variant="contained">
            Delete
          </Button>
        </Box>
      </Box>
    );
  }
);

export default DeletePack;
