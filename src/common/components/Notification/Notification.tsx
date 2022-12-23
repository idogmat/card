import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useAllSelector, useAppDispatch } from "../../hooks/hooks";
import { appStateSelect } from "../../../app/selectors";
import { AppAC } from "../../../app/appReducer";

export const Notification = () => {
  const { error } = useAllSelector(appStateSelect);
  const dispatch = useAppDispatch();
  const isOpen = error !== null;
  console.log("in notification", error, isOpen);

  const handleClose = () => {
    dispatch(AppAC.setError({ error: null }));
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={"error"}>
        {error}
      </Alert>
    </Snackbar>
  );
};
