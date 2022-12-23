import React, { FC, useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material";

interface IEditableTextProps {
  valueToDisplay: string;
  onChangeText: (value: string) => void;
  displayProps?: TypographyProps;
  disabled: boolean;
}

export const EditableText: FC<IEditableTextProps> = ({
  valueToDisplay,
  onChangeText,
  displayProps,
  disabled,
}) => {
  const [editMode, setIsEditMode] = useState(false);
  const [fieldText, setFieldText] = useState("");

  useEffect(() => {
    setFieldText(valueToDisplay);
  }, [valueToDisplay]);

  const fieldTextChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldText(e.currentTarget.value);
  };

  const submitChanges = () => {
    onChangeText(fieldText);
    setIsEditMode(false);
  };

  const doubleClickHandler = () => {
    setIsEditMode(true);
  };

  return !editMode ? (
    <Typography onDoubleClick={doubleClickHandler} {...displayProps}>
      {valueToDisplay}
    </Typography>
  ) : (
    <TextField
      variant={"standard"}
      label={"Nickname"}
      value={fieldText}
      autoFocus
      onChange={fieldTextChangeHandler}
      onBlur={submitChanges}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position={"end"}
            sx={{ padding: "10px", marginBottom: "10px" }}
          >
            <Button
              variant={"contained"}
              onClick={submitChanges}
              sx={{ fontSize: "12px", padding: "5px 10px", margin: "5px 0px" }}
              disabled={disabled}
            >
              Save
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};
