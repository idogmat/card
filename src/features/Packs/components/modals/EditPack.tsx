import { getImgBase64File } from "../../../../common/utils/base64Converter";
import React, { ChangeEvent, memo } from "react";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";
import { IPackResponse } from "../../packsAPI";
import { packsModalsAC } from "../../packsModalsSlice";
import { updateModalSelector } from "./modalsSelectors";
import { updatePackTC } from "../../packsThunks";
import { FormInModal, Modal } from "../../../../common/ui-kit/Modal/Modal";
import { Flex } from "../../../../common/ui-kit/Flex/Flex";
import { Checkbox } from "../../../../common/ui-kit/Checkbox/Checkbox";
import { Input } from "../../../../common/ui-kit/_Input/_Input";
import { Button } from "../../../../common/ui-kit/Button/Button";
import { MdPhotoCamera } from "react-icons/md";
import { ModalBase } from "../../../../common/components/Modal";

export const EditPack = memo(() => {
  // Dispatch & selectors
  const { isOpen, pack } = useAllSelector(updateModalSelector);
  const truePack = useAllSelector((state) =>
    state.packs.cardPacks.find((p) => p._id === pack._id)
  );
  const dispatch = useAppDispatch();
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
    <ModalBase handleClose={handleClose} modalTitle="Edit pack" open={isOpen}>
      <Flex sx={{ padding: "0.6rem", minWidth: "22.5rem" }}>
        <Flex fDirection="column" sx={{ gap: "0.6rem", flex: "1 1 auto" }}>
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
            error={false}
            onChange={handleChangeName}
          />
          <Checkbox
            checked={pack.private}
            onChange={handleChangeIsPrivate}
            children={<span>Private pack</span>}
          />
          <label
            style={{
              textAlign: "center",
              display: "inline-flex",
            }}
          >
            <Input
              style={{ display: "none" }}
              type="file"
              accept={"image/*"}
              error={false}
              onChange={(e) => handleChangeCover(e)}
              endItem={
                <div>
                  <MdPhotoCamera /> Add Cover
                </div>
              }
            />
          </label>
          <Flex
            justify={"space-between"}
            fDirection={"row"}
            sx={{ margin: "auto", gap: "5px" }}
          >
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={updatePack} color="primary">
              Save pack
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ModalBase>
  );
});
