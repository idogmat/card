import { FC, ReactElement } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ModalHeader } from "./ModalHeader";
import { modalStyle } from "./style";

interface IModalBaseProps {
  open: boolean;
  handleClose: () => void;
  children: ReactElement;
  modalTitle: string;
}

export const ModalBase: FC<IModalBaseProps> = ({
  open,
  handleClose,
  children,
  modalTitle,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <ModalHeader title={modalTitle} handleClose={handleClose} />
          {children}
        </Box>
      </Modal>
    </>
  );
};
