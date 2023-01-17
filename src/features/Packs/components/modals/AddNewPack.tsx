import React, { ChangeEvent, useState } from "react";
import { useAllSelector, useAppDispatch } from "../../../../common/hooks";
import { Button } from "../../../../common/ui-kit/Button/Button";
import { MdPhotoCamera } from "react-icons/md";
import { addNewModalSelector } from "./modalsSelectors";
import { addPackTC } from "../../packsThunks";
import { packsModalsAC } from "../../packsModalsSlice";
import { getImgBase64File } from "../../../../common/utils/base64Converter";
import { FormInModal, Modal } from "../../../../common/ui-kit/Modal/Modal";
import { Flex } from "../../../../common/ui-kit/Flex/Flex";
import { Input } from "../../../../common/ui-kit/Input/Input";
import { Checkbox } from "../../../../common/ui-kit/Checkbox/Checkbox";

export interface INewPack {
  name: string;
  deckCover: string;
  isPrivate: boolean;
}

export const AddNewPack = React.memo(() => {
  // Selector & dispatch
  const { isOpen } = useAllSelector(addNewModalSelector);
  const dispatch = useAppDispatch();

  // Local states
  const [newPackData, setNewPackData] = useState<INewPack>({
    name: "",
    deckCover: "",
    isPrivate: false,
  });

  // Utils

  const handleClose = () =>
    dispatch(packsModalsAC.setAddPackState({ status: false }));

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
    <Modal open={isOpen} close={handleClose}>
      <FormInModal>
        <Flex
          align={"center"}
          justify={"center"}
          fDirection={"column"}
          sx={{ margin: "auto", gap: "10px", padding: "5px" }}
        >
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
            style={{ margin: "auto" }}
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
          <label
            style={{
              textAlign: "center",
              display: "inline-flex",
            }}
          >
            <Input
              style={{ display: "none" }}
              type="file"
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
            <Button onClick={addNewPack} color="primary">
              Add Pack
            </Button>
          </Flex>
        </Flex>
      </FormInModal>
    </Modal>
  );
});
