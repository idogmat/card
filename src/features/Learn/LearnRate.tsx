import { FC } from "react";
import { LearnRadioWrapper } from "./LearnStyles";
import { RadioButton } from "common/ui-kit/RadioButton/RadioButton";
import { grades } from "./Learn.data";

interface ILearnRateProps {
  changeGrade: (value: string) => void;
  selectedGrade: string;
}

export const LearnRate: FC<ILearnRateProps> = ({
  changeGrade,
  selectedGrade,
}) => {
  return (
    <>
      <LearnRadioWrapper>
        {grades.map((grade) => {
          return (
            <RadioButton
              onClick={changeGrade}
              selected={grade === selectedGrade}
              value={grade}
              key={grade}
              sx={{ alignSelf: "flex-start" }}
            />
          );
        })}
      </LearnRadioWrapper>
    </>
  );
};
