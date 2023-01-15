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
  display: flex;
  flex-direction: column;
  background: rgba(100, 100, 100, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;
export const FormInModal = styled.div`
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
      {open ? (
        <ModalBase>
          <InsideModal id={"modal"} onClick={catchClick}>
            {children}
          </InsideModal>
        </ModalBase>
      ) : (
        <></>
      )}
    </>
  );
};
