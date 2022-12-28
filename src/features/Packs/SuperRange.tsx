import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Input,
  makeStyles,
  Slider,
  SliderProps,
} from "@mui/material";
import s from "./Packs.module.css";
interface ISuperRangeProps {
  onChangeSlider: (valueRange: number[]) => void;
  max: number | string;
  min: number | string;
  maxPacks: number | string;
}

const SuperRange: React.FC<ISuperRangeProps> = ({
  onChangeSlider,
  min,
  max,
  maxPacks,
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
    <Box style={{ margin: "auto 0", display: "flex" }} sx={{ width: 200 }}>
      <Grid item>
        <Input
          className={s.sliderInput}
          value={range[0]}
          size="small"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeHandler(e, [+e.target.value, +max])
          }
          inputProps={{
            step: 1,
            min: 0,
            max: maxPacks,
            type: "number",
          }}
        />
      </Grid>
      <Slider
        color={"primary"}
        valueLabelDisplay="on"
        disableSwap
        onChange={onChangeHandler}
        value={range}
      />
      <Grid item>
        <Input
          className={s.sliderInput}
          style={{}}
          value={range[1]}
          size="small"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeHandler(e, [+min, +e.target.value])
          }
          inputProps={{
            step: 1,
            min: 0,
            max: maxPacks,
            type: "number",
          }}
        />
      </Grid>
    </Box>
  );
};

export default SuperRange;
