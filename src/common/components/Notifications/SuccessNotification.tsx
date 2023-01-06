import { Alert, Snackbar } from "@mui/material";
import { useAllSelector, useAppDispatch } from "../../hooks";

import { AppAC } from "../../../app/appReducer";
import React from "react";
import { appStateSelect } from "../../../features/Packs/selectors";

export const SuccessNotification = () => {
  const dispatch = useAppDispatch();
  const { successMessage } = useAllSelector(appStateSelect);
  const shouldDisplaySuccess = !!successMessage;
  const closeSuccessNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    dispatch(AppAC.setSuccessMessage({ message: null }));
  };
  return (
    <>
      {successMessage && (
        <Snackbar
          open={shouldDisplaySuccess}
          autoHideDuration={3000}
          onClose={closeSuccessNotification}
        >
          <Alert onClose={closeSuccessNotification} severity={"success"}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
