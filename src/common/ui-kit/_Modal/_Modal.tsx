import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useEscapeKey } from "common/hooks/useEscapeKey";
import { useMount } from "common/hooks/useMount";
import { lockPadding, unlockPadding } from "common/utils/lockPadding";
import FocusTrap from "focus-trap-react";
import React, { FC, useEffect } from "react";
import styled, { css } from "styled-components";

const ModalBackground = styled.div<{ opened: boolean }>`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.6);

  z-index: 60;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  ${({ opened }) =>
    opened &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    `};

  transition: opacity 3s ease 0s, visibility 0.4s ease 0s;
`;

const ModalContent = styled.div<{ opened: boolean }>`
  transition: visibility 0.3s ease 0s, opacity 0.3s ease 0s;

  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-bottom: 2.5rem;

  display: flex;
  flex-direction: column;

  /* background: var(--color-primary); */
  background: #fff;
  max-width: 25rem;
  padding: 1.5625rem;
  box-shadow: 0px 0px 8px 0px rgba(64, 64, 64, 0.2);
  border-radius: var(--radius);

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  ${({ opened }) =>
    opened &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    `};

  z-index: 61;
`;

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

export const Modal: FC<IModalProps> = ({ open, onClose, children }) => {
  // Vars
  const { mounted } = useMount(open);
  const fullyAssembled = open && mounted;

  // Utils

  useEffect(() => {
    if (!mounted) {
      enableBodyScroll(document.body);
      unlockPadding();

      return;
    }
    lockPadding();
    disableBodyScroll(document.body);
  }, [mounted]);

  // Closing
  useEscapeKey(onClose);
  if (!mounted) return null;

  return (
    <>
      <FocusTrap>
        <div>
          <ModalBackground opened={fullyAssembled} onClick={onClose} />
          <ModalContent opened={open}>{children}</ModalContent>
        </div>
      </FocusTrap>
    </>
  );
};
