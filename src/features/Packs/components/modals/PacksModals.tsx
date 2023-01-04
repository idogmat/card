import { AddNewPack } from "./AddNewPack";
import { DeletePack } from "./DeletePack";
import { EditPack } from "./EditPack";

const PacksModals = () => {
  return (
    <>
      <EditPack />
      <DeletePack />
      <AddNewPack />
    </>
  );
};

export default PacksModals;
