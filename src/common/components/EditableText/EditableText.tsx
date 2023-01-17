import React, { FC, useEffect, useState } from "react";

import { EditableTextSaveBtn } from "./EditableTextStyles";
import { Typography } from "common/ui-kit/Text/Typography";
import { Input } from "common/ui-kit/Input/Input";

interface IEditableTextProps {
  valueToDisplay: string;
  onChangeText: (value: string) => void;
  displayProps?: string;
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
    <Typography variant="title" onDoubleClick={doubleClickHandler}>
      {valueToDisplay}
    </Typography>
  ) : (
    <Input
      error={false}
      value={fieldText}
      onChange={fieldTextChangeHandler}
      onBlur={submitChanges}
      autoFocus
      label={"Nickname"}
      endItem={
        <EditableTextSaveBtn
          disabled={disabled}
          onClick={submitChanges}
          sx={{ fontSize: "12px" }}
        >
          Save
        </EditableTextSaveBtn>
      }
    />
  );
};
