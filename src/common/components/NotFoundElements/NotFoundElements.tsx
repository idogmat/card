import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

interface INotFoundElementsProps {
  title: string;
}

export const NotFoundElements: FC<INotFoundElementsProps> = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant={"h2"} component={"h2"}>
        {title}
      </Typography>
    </Box>
  );
};
