import React from "react";
import { ErrorNotification } from "./ErrorNotification";
import { SuccessNotification } from "./SuccessNotification";

export const Notifications = () => {
  return (
    <>
      <ErrorNotification />
      <SuccessNotification />
    </>
  );
};
