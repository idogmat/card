import { getImgBase64File } from "../../../../common/utils/base64Converter";
import React, { ChangeEvent, memo } from "react";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";

import Button from "@mui/material/Button/Button";
import { IPackResponse } from "../../packsAPI";
import { PhotoCamera } from "@mui/icons-material";
import { packsModalsAC } from "../../packsModalsSlice";
import { updateModalSelector } from "./modalsSelectors";
import { updatePackTC } from "../../packsThunks";
import { FormInModal, Modal } from "../../../../common/ui-kit/Modal/Modal";
import { Flex } from "../../../../common/ui-kit/Flex/Flex";
import { Checkbox } from "../../../../common/ui-kit/Checkbox/Checkbox";
import { Input } from "../../../../common/ui-kit/Input/Input";

interface IUpdatePack {
  name: string;
  deckCover: string;
  isPrivate: boolean;
}

export const EditPack = memo(() => {
  // Dispatch & selectors
  const { isOpen, pack } = useAllSelector(updateModalSelector);
  const truePack = useAllSelector((state) =>
    state.packs.cardPacks.find((p) => p._id === pack._id)
  );
  const dispatch = useAppDispatch();

  // Local state

  // Utils
  const handleClose = () =>
    dispatch(
      packsModalsAC.setUpdatePackState({
        status: false,
        pack: {} as IPackResponse,
      })
    );

  const updatePack = () => {
    if (
      truePack?.name !== pack.name ||
      truePack?.private !== pack.private ||
      truePack?.deckCover !== pack.deckCover
    ) {
      dispatch(updatePackTC({ id: pack._id, ...pack }));
    }
    handleClose();
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    dispatch(packsModalsAC.editPackFields({ ...pack, name }));
  };

  const handleChangeIsPrivate = () => {
    dispatch(packsModalsAC.editPackFields({ ...pack, private: !pack.private }));
  };

  const handleChangeCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileAsString = await getImgBase64File(e, dispatch);
    fileAsString &&
      dispatch(
        packsModalsAC.editPackFields({ ...pack, deckCover: fileAsString })
      );
  };
  return (
    <Modal open={isOpen} close={handleClose}>
      <FormInModal>
        <Flex
          align={"center"}
          justify={"center"}
          fDirection={"column"}
          sx={{ margin: "auto", gap: "10px", padding: "5px" }}
        >
          {pack.deckCover && (
            <img
              src={pack.deckCover}
              style={{
                width: "100%",
                height: "9.375rem",
                objectFit: "cover",
              }}
              alt="deckCover"
            />
          )}
          <Input
            label="Pack name"
            value={pack.name}
            onChange={handleChangeName}
          />
          <Checkbox
            checked={pack.private}
            onChange={handleChangeIsPrivate}
            children={<span>Private pack</span>}
          />
          <label style={{ textAlign: "center", display: "inline-flex" }}>
            <input
              style={{ display: "none" }}
              type="file"
              accept={"image/*"}
              onChange={(e) => handleChangeCover(e)}
            />
            <PhotoCamera />
            Add cover
          </label>
          <Flex
            justify={"space-between"}
            fDirection={"row"}
            sx={{ margin: "auto", gap: "5px" }}
          >
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
            <Button onClick={updatePack} color="primary" variant="contained">
              Save pack
            </Button>
          </Flex>
        </Flex>
      </FormInModal>
    </Modal>
  );
});
