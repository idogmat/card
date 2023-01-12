import React, { FC } from "react";
import styled from "styled-components";
import { Modal } from "../Modal/Modal";

interface IMenu {
  open: boolean;
  close: () => void;
  children?: JSX.Element;
}

const MenuInModal = styled.div`
  position: absolute;
  right: 0;
  top: 65px;
  width: 100px;
  z-index: 100;
  background: #fff;
  box-shadow: 0px 4px 4px 2px #888888;
`;
export const Menu: FC<IMenu> = ({ open, close, children }) => {
  return (
    <>
      {open ? (
        <>
          <Modal close={close} open={open} />
          <MenuInModal onClick={close}>{children}</MenuInModal>
        </>
      ) : (
        <> </>
      )}
    </>
  );
};
