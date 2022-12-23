import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useAllSelector, useAppDispatch } from "../../hooks/hooks";
import { appStateSelect } from "../../../app/selectors";
import { AppAC } from "../../../app/appReducer";
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
