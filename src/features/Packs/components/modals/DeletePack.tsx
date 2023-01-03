import React, { FC } from "react";
import { Box, FormGroup, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { IPackResponse } from "../../packsAPI";
import { EditModeType } from "../../Packs";

interface IRemovePack {
  editPackMode: {
    pack: IPackResponse;
    mode: EditModeType;
  };
  setEditPackMode: (state: { pack: IPackResponse; mode: EditModeType }) => void;
  removePack: (id: string) => void;
}

const DeletePack: FC<IRemovePack> = React.memo(
  ({ removePack, editPackMode, setEditPackMode }) => {
    const remove = () => {
      removePack(editPackMode.pack._id);
      setEditPackMode({ pack: {} as IPackResponse, mode: "idle" });
    };

    return (
      <Box>
        <FormGroup>
          <Box sx={{ padding: 2 }}>
            <Typography sx={{ marginBottom: 2 }}>
              Do you really want to remove <b>{editPackMode.pack.name}</b>
            </Typography>
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
          <Button onClick={remove} color="primary" variant="contained">
            Delete
          </Button>
        </Box>
      </Box>
    );
  }
);

export default DeletePack;
