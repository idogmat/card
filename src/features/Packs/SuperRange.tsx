import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Slider, SliderProps } from "@mui/material";

interface ISuperRangeProps {
  onChangeSlider: (valueRange: number[]) => void;
  max: number | string;
  min: number | string;
}

const SuperRange: React.FC<ISuperRangeProps> = ({
  onChangeSlider,
  min,
  max,
}) => {
  const [range, setRange] = useState([Number(min), Number(max)]);
  const onChangeHandler = (e: any, value: number | number[]) => {
    setRange(value as number[]);
    onChangeSlider(value as number[]);
  };
  useEffect(() => {
    setRange([Number(min), Number(max)]);
  }, [min, max]);
  return (
    <Box style={{ margin: "auto 0" }} sx={{ width: 200 }}>
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
