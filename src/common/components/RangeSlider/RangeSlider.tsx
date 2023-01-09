import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, Slider } from "@mui/material";
import { IParams } from "../../../features/Packs/packsThunks";

interface ISuperRangeProps {
  onChangeSlider: (valueRange: number[], params: any) => void;
  params: IParams;
  max: number | string;
  min: number | string;
  minCardsCount: number;
  maxCardsCount: number;
}

const RangeSlider: React.FC<ISuperRangeProps> = React.memo(
  ({ onChangeSlider, min, max, maxCardsCount, minCardsCount, params }) => {
    const [range, setRange] = useState([Number(min), Number(max)]);

    const onChangeHandler = (e: any, value: number | number[]) => {
      setRange(value as number[]);
      onChangeSlider(value as number[], params);
    };

    useEffect(() => {
      setRange([Number(min), Number(max)]);
    }, [min, max]);

    return (
      <Box style={{ margin: "auto 0", display: "flex" }} sx={{ width: 200 }}>
        <Grid
          sx={{
            margin: "auto .5rem",
            border: "1px solid #bebebe",
            padding: "0 0.5rem",
          }}
        >
          <span>{minCardsCount}</span>
        </Grid>
        <Slider
          color={"primary"}
          disableSwap
          valueLabelDisplay="on"
          onChange={onChangeHandler}
          value={range}
          min={minCardsCount}
          max={maxCardsCount}
        />
        <Grid
          sx={{
            margin: "auto .5rem",
            border: "1px solid #bebebe",
            padding: "0 0.5rem",
          }}
        >
          <span>{maxCardsCount}</span>
        </Grid>
      </Box>
    );
  }
);

export default RangeSlider;
