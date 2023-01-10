import { Alert, Snackbar } from "@mui/material";
import { useAllSelector, useAppDispatch } from "../../hooks";

import { AppAC } from "../../../app/appSlice";
import React from "react";
import { appStateSelector } from "app/selectors";

export const ErrorNotification = () => {
  const { error } = useAllSelector(appStateSelector);
  const shouldDisplayError = !!error;
  const dispatch = useAppDispatch();

  const closeErrorNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    dispatch(AppAC.setError({ error: null }));
  };

  return (
    <>
      {error && (
        <Snackbar
          open={shouldDisplayError}
          autoHideDuration={3000}
          onClose={closeErrorNotification}
        >
          <Alert onClose={closeErrorNotification} severity={"error"}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
