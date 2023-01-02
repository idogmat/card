import { CardsAddModal } from "./CardsAddModal";
import { CardsDeleteModal } from "./CardDeleteModal";
import { CardsUpdateModal } from "./CardsUpdateModal";
import { FC } from "react";

interface ICardsModalProps {
  packID: string;
}

export interface ICardData {
  question: string;
  answer: string;
}

export const CardsModals: FC<ICardsModalProps> = ({ packID }) => {
  return (
    <>
      <CardsAddModal packID={packID} />
      <CardsUpdateModal packID={packID} />
      <CardsDeleteModal packID={packID} />
    </>
  );
};
