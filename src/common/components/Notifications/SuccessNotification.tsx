import React from "react";
import { AppAC } from "../../../app/appReducer";
import { useAllSelector, useAppDispatch } from "../../hooks/hooks";
import { appStateSelect } from "../../../app/selectors";
import { Alert, Snackbar } from "@mui/material";

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
