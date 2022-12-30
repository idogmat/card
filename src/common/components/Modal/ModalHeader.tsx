import { IconButton, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import { Close } from "@mui/icons-material";
import { FC } from "react";
import { modalHeaderStyle } from "./style";

interface IModalHeaderProps {
  title: string;
  handleClose: () => void;
}

export const ModalHeader: FC<IModalHeaderProps> = ({ title, handleClose }) => {
  return (
    <Box sx={modalHeaderStyle}>
      <Typography variant={"h4"} component="h3">
        {title}
      </Typography>
      <IconButton onClick={handleClose}>
        <Close />
      </IconButton>
    </Box>
  );
};
