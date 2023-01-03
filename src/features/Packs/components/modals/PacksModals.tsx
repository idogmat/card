import React, { FC, ReactElement } from "react";
import { ModalBase } from "../../../../common/components/Modal";
import EditPack from "./EditPack";
import { IPackResponse } from "../../packsAPI";
import { EditModeType } from "../../Packs";
import DeletePack from "./DeletePack";
import AddNewPack from "./AddNewPack";

const PacksModals = ({}) => {
  return (
    <>
      <EditPack />
      <DeletePack />
      <AddNewPack />
    </>
  );
};

export default PacksModals;
