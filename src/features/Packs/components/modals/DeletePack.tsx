import { useAllSelector, useAppDispatch } from "../../../../common/hooks";
import { IPackResponse } from "../../packsAPI";
import { deleteModalSelector } from "./modalsSelectors";
import React, { memo } from "react";
import { packsModalsAC } from "../../packsModalsSlice";
import { removePackTC } from "../../packsThunks";
import { Flex } from "../../../../common/ui-kit/Flex/Flex";
import { Typography } from "../../../../common/ui-kit/Text/Typography";
import { Button } from "../../../../common/ui-kit/Button/Button";
import { ModalBase } from "../../../../common/components/Modal";

export const DeletePack = memo(() => {
  // Dispatch & selectors
  const { isOpen, pack } = useAllSelector(deleteModalSelector);
  const dispatch = useAppDispatch();

  // Utils
  const handleClose = () =>
    dispatch(
      packsModalsAC.setDeletePackState({
        status: false,
        pack: {} as IPackResponse,
      })
    );

  const deletePack = () => {
    dispatch(removePackTC(pack._id));
    handleClose();
  };

  return (
    <ModalBase handleClose={handleClose} modalTitle="delete pack" open={isOpen}>
      <Flex sx={{ padding: "0.6rem", minWidth: "22.5rem" }}>
        <Flex fDirection="column" sx={{ gap: "0.6rem", flex: "1 1 auto" }}>
          <Typography>
            Do you really want to remove <b>{pack.name}</b>
          </Typography>
          <Flex justify={"space-between"} sx={{ paddingTop: "10px" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              sx={{
                alignSelf: "start",
                backgroundColor: "var(--color-error)",
                color: "#fff",
              }}
              onClick={deletePack}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ModalBase>
  );
});
