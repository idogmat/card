import React from "react";
import { CircularProgress } from "@mui/material";

export const Preloader = () => {
  console.log("rendering preloader");
  return (
    <CircularProgress
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};
