import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";

export interface IFormatSelectOption {
  selectValue: string;
  UIValue: string;
}

interface IFormatSelectProps {
  title: string;
  options: IFormatSelectOption[];
  value: FieldFormatsEnum;
  onChange: (event: SelectChangeEvent) => void;
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
      <InputLabel>{title}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((option) => {
          return (
            <MenuItem value={option.selectValue}>{option.UIValue}</MenuItem>
          );
        })}
      </Select>
    </>
  );
};
