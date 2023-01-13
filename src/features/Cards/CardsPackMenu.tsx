import { AiOutlineBook, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { CardsDropdownButton, CardsDropdownNavLink } from "./CardsStyles";
import { Dropdown, DropdownItem } from "common/ui-kit/Dropdown/Dropdown";

import { Button } from "common/ui-kit/Button/Button";
import { ElementPosition } from "common/ui-kit/types";
import { FC } from "react";
import { IPackResponse } from "features/Packs/packsAPI";
import { NavLink } from "react-router-dom";
import { packsModalsAC } from "features/Packs/packsModalsSlice";
import { useAppDispatch } from "common/hooks";

interface ICardsPackMenuProps {
  open: boolean;
  posSettings: Partial<ElementPosition>;
  pack: IPackResponse;
}

export const CardsPackMenu: FC<ICardsPackMenuProps> = ({
  open,
  posSettings,
  pack,
}) => {
  // Dispatch
  const dispatch = useAppDispatch();
  console.log("dropdown is currently", open);

  // Utils
  const openEditPackModal = () => {
    dispatch(packsModalsAC.setUpdatePackState({ status: true, pack }));
  };

  const openDeletePackModal = () => {
    dispatch(packsModalsAC.setDeletePackState({ status: true, pack }));
  };
  return (
    <Dropdown open={open} posSettings={posSettings}>
      <DropdownItem>
        <CardsDropdownButton onClick={openEditPackModal}>
          <AiOutlineEdit />
          Edit
        </CardsDropdownButton>
      </DropdownItem>
      <DropdownItem>
        <CardsDropdownButton onClick={openDeletePackModal}>
          <AiOutlineDelete />
          Delete
        </CardsDropdownButton>
      </DropdownItem>
      <DropdownItem>
        <CardsDropdownNavLink to={`/learn/${pack._id}`}>
          <AiOutlineBook />
          Learn
        </CardsDropdownNavLink>
      </DropdownItem>
    </Dropdown>
  );
};
