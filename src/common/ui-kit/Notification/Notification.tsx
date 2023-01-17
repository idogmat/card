import {
  MdClose,
  MdFileDownloadDone,
  MdOutlineErrorOutline,
} from "react-icons/md";
import styled, { css } from "styled-components";

import { Typography } from "../Text/Typography";
import { useEffect } from "react";

interface INotificationWrapperProps {
  variant: "success" | "error";
  open: boolean;
}

const NotificationWrapper = styled.div<INotificationWrapperProps>`
  position: fixed;
  bottom: 5%;
  left: -100vw;
  z-index: 60;

  display: flex;
  gap: 0.625rem;
  padding: 1.56rem 5px 5px 5px;

  background: ${({ variant }) =>
    variant === "success" ? "var(--color-success)" : "var(--color-error)"};
  max-width: 31.25rem;
  border-radius: var(--radius);

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      left: 1%;
    `}

  transition: opacity 0.3s ease 0s, visibility 0.3s ease 0s,
    left 0.3s ease 0s;
`;

const NotificationIcon = styled.div``;

const NotificationCloseIcon = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 0.3125rem;
  right: 0.3125rem;
`;

interface INotificationProps extends INotificationWrapperProps {
  children: React.ReactNode;
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
}

export const Notification: React.FC<INotificationProps> = ({
  children,
  autoHideDuration,
  onClose,
  ...props
}) => {
  useEffect(() => {
    const timerId = setTimeout(() => onClose(), autoHideDuration);

    return () => clearTimeout(timerId);
  }, [props.open, autoHideDuration]);

  return (
    <>
      <NotificationWrapper {...props}>
        <NotificationIcon>
          {props.variant === "success" ? (
            <MdFileDownloadDone fontSize={30} />
          ) : (
            <MdOutlineErrorOutline fontSize={30} />
          )}
        </NotificationIcon>
        <Typography>{children}</Typography>
        <NotificationCloseIcon onClick={onClose} />
      </NotificationWrapper>
    </>
  );
};
