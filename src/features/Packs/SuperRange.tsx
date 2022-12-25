import React from "react";
import { Box, Slider, SliderProps } from "@mui/material";

const SuperRange: React.FC<SliderProps> = (props) => {
  return (
    <Box sx={{ width: 200 }}>
      <Slider color={"primary"} valueLabelDisplay="on" disableSwap {...props} />
    </Box>
  );
};

export default SuperRange;
