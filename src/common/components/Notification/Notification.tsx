import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useAllSelector, useAppDispatch } from "../../hooks/hooks";
import { appStateSelect } from "../../../app/selectors";
import { AppAC } from "../../../app/appReducer";

export const Notification = () => {
  const { error, successMessage } = useAllSelector(appStateSelect);
  const dispatch = useAppDispatch();
  const shouldDisplayError = !!error;
  const shouldDisplaySuccess = !!successMessage;

  const closeErrorNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(event?.currentTarget);
    dispatch(AppAC.setError({ error: null }));
  };
  const closeSuccessNotification = () => {
    dispatch(AppAC.setSuccessMessage({ message: null }));
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
      {successMessage && (
        <Snackbar
          open={shouldDisplaySuccess}
          autoHideDuration={3000}
          onClose={closeSuccessNotification}
        >
          <Alert onClose={closeErrorNotification} severity={"success"}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </>
    // <Snackbar
    //   open={isOpen}
    //   autoHideDuration={3000}
    //   onClose={closeErrorNotification}
    // >
    //   <>
    //     {error && (
    //       <Alert onClose={closeErrorNotification} severity={"error"}>
    //         {error}
    //       </Alert>
    //     )}
    //     {successMessage && (
    //       <Alert onClose={closeErrorNotification} severity={"success"}>
    //         {successMessage}
    //       </Alert>
    //     )}
    //   </>
    // </Snackbar>
  );
};
