import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import { FC } from "react";
import { grades } from "./Learn.data";

interface ILearnRateProps {
  changeGrade: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedGrade: string;
}

export const LearnRate: FC<ILearnRateProps> = ({
  changeGrade,
  selectedGrade,
}) => {
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
      onChange={changeGrade}
      value={selectedGrade}
      sx={{ marginBottom: 2 }}
    >
      {grades.map((grade) => {
        return (
          <FormControlLabel
            key={grade}
            value={grade}
            control={<Radio />}
            label={grade}
          />
        );
      })}
    </RadioGroup>
  );
};
