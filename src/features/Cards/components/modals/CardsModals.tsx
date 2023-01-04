import { CardsAddModal } from "./CardsAddModal";
import { CardsDeleteModal } from "./CardDeleteModal";
import { CardsUpdateModal } from "./CardsUpdateModal";
import { DeletePack } from "features/Packs/components/modals/DeletePack";
import EditPack from "features/Packs/components/modals/EditPack";
import { FC } from "react";
import { IPackResponse } from "./../../../Packs/packsAPI";

interface ICardsModalProps {
  pack: IPackResponse;
}

export interface ICardData {
  question: string;
  answer: string;
}

export const CardsModals: FC<ICardsModalProps> = ({ pack }) => {
  return (
    <>
      <CardsAddModal packID={pack._id} />
      <CardsUpdateModal packID={pack._id} />
      <CardsDeleteModal packID={pack._id} />
      <EditPack />
      <DeletePack />
    </>
  );
};
