import { useAllSelector, useAppDispatch } from "../../hooks";

import { AppAC } from "../../../app/appSlice";
import { Notification } from "common/ui-kit/Notification/Notification";
import React from "react";
import { appStateSelector } from "app/selectors";

export const ErrorNotification = () => {
  const { error } = useAllSelector(appStateSelector);
  const shouldDisplayError = !!error;
  const dispatch = useAppDispatch();

  const closeErrorNotification = () => {
    dispatch(AppAC.setError({ error: null }));
  };

  return (
    <>
      <Notification
        open={shouldDisplayError}
        onClose={closeErrorNotification}
        autoHideDuration={3000}
        variant="error"
      >
        {error}
      </Notification>
    </>
  );
};
