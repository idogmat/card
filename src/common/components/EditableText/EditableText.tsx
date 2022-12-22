import React, {
  ComponentType,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  TypographyProps,
  TypographyTypeMap,
} from "@mui/material";

type DefaultSpanPropsType = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

interface IEditableTextProps {
  valueToDisplay: string;
  onChangeText: (value: string) => void;
  displayProps?: TypographyProps;
}

export const EditableText: FC<IEditableTextProps> = ({
  valueToDisplay,
  onChangeText,
  displayProps,
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
    // <Typography
    //   {...displayProps}
    // >

    // </Typography>
    <Typography {...displayProps}>{valueToDisplay}</Typography>
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
