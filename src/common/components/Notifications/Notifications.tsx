import { ErrorNotification } from "./ErrorNotification";
import React from "react";
import { SuccessNotification } from "./SuccessNotification";

export const Notifications = () => {
  return (
    <>
      <ErrorNotification />
      <SuccessNotification />
    </>
  );
};
