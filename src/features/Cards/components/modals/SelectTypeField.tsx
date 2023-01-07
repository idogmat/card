import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, RefObject } from "react";
import {
  FieldFormatsEnum,
  FormatSelect,
  IFormatSelectOption,
} from "./FormatSelect";

import { SelectChangeEvent } from "@mui/material";

export interface IAddCardFieldProps {
  selectTitle: string;
  options: IFormatSelectOption[];
  changeOption: (e: SelectChangeEvent) => void;
  fieldFormat: FieldFormatsEnum;
  fileInputRef: RefObject<HTMLInputElement>;
  openFileSelector: () => void;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  cover: string;
  textFieldValue: string;
  changeTextFieldValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SelectTypeField: FC<IAddCardFieldProps> = ({
  selectTitle,
  options,
  changeOption,
  fieldFormat,
  fileInputRef,
  openFileSelector,
  handleFileUpload,
  cover,
  textFieldValue,
  changeTextFieldValue,
}) => {
  const isPictureField = fieldFormat === FieldFormatsEnum.pictureFormat;
  return (
    <>
      <FormatSelect
        options={options}
        title={selectTitle}
        onChange={changeOption}
        value={fieldFormat}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
        {isPictureField ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography component="span">Question:</Typography>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Button sx={{ color: "blue" }} onClick={openFileSelector}>
                Change cover
              </Button>
            </Box>
            {cover && (
              <img
                src={cover}
                alt=""
                style={{
                  width: "100%",
                  height: "9.375rem",
                  objectFit: "cover",
                }}
              />
            )}
          </>
        ) : (
          <TextField
            label="Enter the new question"
            variant="standard"
            value={textFieldValue}
            onChange={changeTextFieldValue}
          />
        )}
      </Box>
    </>
  );
};
