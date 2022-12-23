import React from "react";
import { CircularProgress } from "@mui/material";

export const Preloader = () => {
  return (
    <CircularProgress
      sx={{
        position: "absolute",
        top: "calc(50% - 20px)",
        left: "calc(50% - 20px)",
      }}
    />
  );
};
