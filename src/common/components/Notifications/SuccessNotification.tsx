import { Alert, Snackbar } from "@mui/material";
import { useAllSelector, useAppDispatch } from "../../hooks";

import { AppAC } from "../../../app/appSlice";
import { Notification } from "common/ui-kit/Notification/Notification";
import React from "react";
import { appStateSelector } from "app/selectors";

export const SuccessNotification = () => {
  const dispatch = useAppDispatch();
  const { successMessage } = useAllSelector(appStateSelector);
  const shouldDisplaySuccess = !!successMessage;
  const closeSuccessNotification = () => {
    dispatch(AppAC.setSuccessMessage({ message: null }));
  };
  return (
    <>
      <Notification
        open={shouldDisplaySuccess}
        onClose={closeSuccessNotification}
        autoHideDuration={3000}
        variant="success"
      >
        {successMessage}
      </Notification>
    </>
  );
};
