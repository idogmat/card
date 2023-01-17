import { Select } from "common/ui-kit/Select/Select";
import { Typography } from "common/ui-kit/Text/Typography";
import React, { FC } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export interface IFormatSelectOption {
  selectValue: string;
  UIValue: string;
}

interface IFormatSelectProps {
  title: string;
  options: IFormatSelectOption[];
  value: FieldFormatsEnum;
  onChange: (option: string) => void;
}

export enum FieldFormatsEnum {
  "textFormat" = "text",
  "pictureFormat" = "picture",
}

export const FormatSelect: FC<IFormatSelectProps> = ({
  title,
  value,
  options,
  onChange,
}) => {
  return (
    <>
      <Typography variant="title">{title}</Typography>
      <Select
        options={options}
        onChange={onChange}
        selected={value}
        endIcon={<MdKeyboardArrowDown />}
      />
      {/* {options.map((option) => {
          return (
            <MenuItem value={option.selectValue}>{option.UIValue}</MenuItem>
          );
        })} */}
    </>
  );
};
