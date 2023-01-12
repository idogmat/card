import React, { FC } from "react";
import styled from "styled-components";
import NavMenu from "./NavMenu";

interface IMenu {
  open: boolean;
  close: () => void;
  children?: JSX.Element;
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 50;
`;
const MenuInModal = styled.div`
  position: absolute;
  right: 0;
  top: 65px;
  width: 100px;
  z-index: 100;
  background: #fff;
  box-shadow: 0px 4px 4px 2px #888888;
`;
const Menu: FC<IMenu> = ({ open, close, children }) => {
  return (
    <>
      {open ? (
        <>
          <Modal onClick={close} />
          <MenuInModal>{children}</MenuInModal>
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

// <Menu open={isMenuOpen} close={closeMenu}>
//   {isAuth ? (
//     <NavMenu isAuth={isAuth} authPages={authPages}></NavMenu>
//   ) :(
//     <NavMenu isAuth={isAuth} authPages={unAuthPages}></NavMenu>
//   )}
export default Menu;
