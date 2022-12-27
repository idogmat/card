import React, { useState } from "react";
import { Box, Slider, SliderProps } from "@mui/material";

interface ISuperRangeProps {
  onChangeSlider: (valueRange: number[]) => void;
}

const SuperRange: React.FC<ISuperRangeProps> = ({ onChangeSlider }) => {
  const [range, setRange] = useState([0, 10]);
  const onChangeHandler = (e: any, value: number | number[]) => {
    setRange(value as number[]);
    onChangeSlider(value as number[]);
  };
  return (
    <Box sx={{ width: 200 }}>
      <Slider
        color={"primary"}
        valueLabelDisplay="on"
        disableSwap
        onChange={onChangeHandler}
        value={range}
      />
    </Box>
  );
};

export default SuperRange;
