import React, { ChangeEvent, useRef, useState } from "react";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";
import { Button } from "../../../../common/ui-kit/Button/Button";
import { addNewModalSelector } from "./modalsSelectors";
import { addPackTC } from "../../packsThunks";
import { packsModalsAC } from "../../packsModalsSlice";
import { getImgBase64File } from "../../../../common/utils/base64Converter";
import { ModalBase } from "common/components/Modal";
import { Flex } from "../../../../common/ui-kit/Flex/Flex";
import { Input } from "../../../../common/ui-kit/Input/Input";
import { Checkbox } from "../../../../common/ui-kit/Checkbox/Checkbox";
import { FileLoader } from "../../../../common/components/FileLoader/FileLoader";

export interface INewPack {
  name: string;
  deckCover: string;
  isPrivate: boolean;
}

export const AddNewPack = React.memo(() => {
  // Selector & dispatch
  const { isOpen } = useAllSelector(addNewModalSelector);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  // Local states
  const [newPackData, setNewPackData] = useState<INewPack>({
    name: "",
    deckCover: "",
    isPrivate: false,
  });

  // Utils

  const handleClose = () =>
    dispatch(packsModalsAC.setAddPackState({ status: false }));

  const handleCoverLoad = () => {
    ref.current?.click();
  };

  const addNewPack = () => {
    if (newPackData.name) {
      dispatch(addPackTC(newPackData));
      setNewPackData({} as INewPack);
      handleClose();
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setNewPackData((state) => ({ ...state, name }));
  };

  const handleChangeIsPrivate = () => {
    setNewPackData((state) => ({ ...state, isPrivate: !state.isPrivate }));
  };

  const handleChangeCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileAsString = await getImgBase64File(e, dispatch);
    fileAsString &&
      setNewPackData((state) => ({ ...state, deckCover: fileAsString }));
  };

  return (
    <ModalBase handleClose={handleClose} modalTitle="Add pack" open={isOpen}>
      <Flex sx={{ padding: "0.6rem", minWidth: "22.5rem" }}>
        <Flex fDirection="column" sx={{ gap: "0.6rem", flex: "1 1 auto" }}>
          {newPackData.deckCover && (
            <img
              src={newPackData.deckCover}
              style={{
                width: "100%",
                height: "9.375rem",
                objectFit: "cover",
              }}
              alt="deckCover"
            />
          )}
          <Input
            type={"text"}
            error={false}
            placeholder="Pack name"
            value={newPackData.name}
            onChange={handleChangeName}
          />
          <Checkbox
            checked={newPackData.isPrivate}
            onChange={handleChangeIsPrivate}
            children={<span>Private pack</span>}
          />
          <Button onClick={handleCoverLoad} sx={{ marginBottom: "0.6rem" }}>
            Change cover
          </Button>
          <FileLoader link={ref} onFileLoaded={handleChangeCover} />
          <Flex justify={"space-between"} sx={{ gap: "5px" }}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={addNewPack}>Add Pack</Button>
          </Flex>
        </Flex>
      </Flex>
    </ModalBase>
  );
});
