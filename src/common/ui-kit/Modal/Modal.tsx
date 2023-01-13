import React, { FC } from "react";
import styled from "styled-components";

export const ModalBase = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 50;
`;
export const InsideModal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: transparent;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  overflow: hidden;
`;
export const FormInModal = styled.div`
  position: fixed;
  display: flex;
  margin: auto;
  width: 50%;
  height: 80%;
  background: white;
`;
interface IModal {
  open: boolean;
  close: () => void;
  children?: JSX.Element;
}

export const Modal: FC<IModal> = ({ open, close, children }) => {
  const catchClick = (e: any) => {
    if (e.target.id === "modal") {
      close();
    }
  };
  return (
    <>
      {open && (
        <ModalBase>
          <InsideModal id={"modal"} onClick={catchClick}>
            {children}
          </InsideModal>
        </ModalBase>
      )}
    </>
  );
};
