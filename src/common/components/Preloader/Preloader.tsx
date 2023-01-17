import { CircularProgress } from "common/ui-kit/CircularProgress";
import React from "react";

export const Preloader = () => {
  return (
    // <CircularProgress
    //   sx={{
    //     position: "absolute",
    //     top: "calc(50% - 20px)",
    //     left: "calc(50% - 20px)",
    //   }}
    // />
    <CircularProgress />
  );
};
