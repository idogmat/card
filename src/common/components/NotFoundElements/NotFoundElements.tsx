import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

interface INotFoundElementsProps {
  title: string;
}

export const NotFoundElements: FC<INotFoundElementsProps> = React.memo(
  ({ title }) => {
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
  }
);
