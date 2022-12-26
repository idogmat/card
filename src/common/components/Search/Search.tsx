import React, { FC, useState } from "react";
import { FormControl, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchProps {
  onChangeCb: (value: string) => void;
}

export const Search: FC<ISearchProps> = ({ onChangeCb }) => {
  const [inputText, setInputText] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
    onChangeCb(e.currentTarget.value);
  };
  return (
    <FormControl
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        border: "1px solid gray",
        borderRadius: "10px",
      }}
    >
      <IconButton>
        <SearchIcon />
      </IconButton>
      <TextField
        value={inputText}
        onChange={onChangeHandler}
        sx={{
          border: "none",
          background: "transparent",
          "& *": {
            border: "none !important",
            outline: "none !important",
          },
        }}
        fullWidth
      />
    </FormControl>
  );
};
