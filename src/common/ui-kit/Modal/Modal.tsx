import React, { FC } from "react";
import styled from "styled-components";
import { StyledComponent } from "../types";

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
export const FormInModal = styled.div<
  StyledComponent<Partial<{ size: string }>>
>`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: ${(p) => p.size || "50%"};
  height: ${(p) => p.size || "50%"};
  background: white;
  box-shadow: 0 0 8px 8px var(--color-blue);
  border-radius: 5px;
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
