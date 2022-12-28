import React, { FC, useEffect, useState } from "react";
import { FormControl, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchProps {
  searchValue: string;
  searchChangeHandler: (value: string) => void;
}

export const Search: FC<ISearchProps> = ({
  searchValue,
  searchChangeHandler,
}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchChangeHandler(e.currentTarget.value);
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
      <IconButton disabled sx={{ color: "#000 !important" }}>
        <SearchIcon />
      </IconButton>
      <TextField
        value={searchValue}
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
