import React, { FC } from "react";
import { Typography } from "@mui/material";

interface IRegisterFieldErrorProps {
  error?: string;
  touched?: boolean;
}
export const RegisterFieldError: FC<IRegisterFieldErrorProps> = ({
  error,
  touched,
}) => {
  return (
    <>
      {error && touched ? (
        <Typography sx={{ color: "red", fontSize: "16px" }}>{error}</Typography>
      ) : (
        ""
      )}
    </>
  );
};
