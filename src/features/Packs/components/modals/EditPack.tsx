import { getImgBase64File } from "../../../../common/utils/base64Converter";
import React, { ChangeEvent, memo, useRef } from "react";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";
import { packsModalsAC } from "../../packsModalsSlice";
import { updateModalSelector } from "./modalsSelectors";
import { updatePackTC } from "../../packsThunks";
import { Flex } from "../../../../common/ui-kit/Flex/Flex";
import { Checkbox } from "../../../../common/ui-kit/Checkbox/Checkbox";
import { Input } from "../../../../common/ui-kit/Input/Input";
import { Button } from "../../../../common/ui-kit/Button/Button";
import { ModalBase } from "../../../../common/components/Modal";
import { FileLoader } from "../../../../common/components/FileLoader/FileLoader";
import { Img } from "../../PacksStyle";

export const EditPack = memo(() => {
  // Dispatch & selectors
  const { isOpen, pack } = useAllSelector(updateModalSelector);
  const truePack = useAllSelector((state) =>
    state.packs.cardPacks.find((p) => p._id === pack._id)
  );
  const dispatch = useAppDispatch();
  // Utils
  const ref = useRef<HTMLInputElement>(null);
  const handleCoverLoad = () => {
    ref.current?.click();
  };
  const handleClose = () =>
    dispatch(
      packsModalsAC.setUpdatePackState({
        status: false,
        pack: pack,
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
            <Img
              width={"100px"}
              height={"100px"}
              src={pack.deckCover}
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
          <Button onClick={handleCoverLoad} sx={{ marginBottom: "0.6rem" }}>
            Change cover
          </Button>
          <FileLoader link={ref} onFileLoaded={handleChangeCover} />
          <Flex justify={"space-between"}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={updatePack}>Save pack</Button>
          </Flex>
        </Flex>
      </Flex>
    </ModalBase>
  );
});
