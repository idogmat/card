import React, { FC, useState } from "react";

import { CardsAddModal } from "./CardsAddModal";

interface ICardsModalProps {
  packID: string;
}

export const CardsModals: FC<ICardsModalProps> = ({ packID }) => {
  // Local state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Utils

  const handleAddOpen = () => setIsAddModalOpen(true);
  const handleAddClose = () => setIsAddModalOpen(false);

  return (
    <>
      <CardsAddModal
        open={isAddModalOpen}
        handleClose={handleAddClose}
        packID={packID}
      />
      <button onClick={handleAddOpen}>Open add new card modal</button>
    </>
  );
};
