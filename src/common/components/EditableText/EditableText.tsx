import React, { FC, useEffect, useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";

interface IEditableTextProps {
  valueToDisplay: string;
  onChange: (value: string) => void;
}

export const EditableText: FC<IEditableTextProps> = ({
  valueToDisplay,
  onChange,
}) => {
  const [editMode, setIsEditMode] = useState(true);
  const [fieldText, setFieldText] = useState("");

  useEffect(() => {
    setFieldText(valueToDisplay);
  }, [valueToDisplay]);

  const fieldTextChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldText(e.currentTarget.value);
  };
  const submitChanges = () => {
    onChange(fieldText);
    setIsEditMode(false);
  };

  const doubleClickHandler = () => {
    setIsEditMode(true);
  };

  return !editMode ? (
    <p onDoubleClick={doubleClickHandler}> {valueToDisplay}</p>
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
            >
              Save
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};
