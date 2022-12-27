import React, { FC } from "react";
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";

export interface ITablePaginationOption {
  title: string | number;
  value: string | number;
}

interface ITablePaginationProps {
  totalPages: number;
  elementsPerPage: number;
  changePageHandler: (event: React.ChangeEvent<unknown>, value: number) => void;
  changeElementsPerPage: (event: SelectChangeEvent) => void;
  currentPage: number;
  selectOptions: ITablePaginationOption[];
}

export const TablePagination: FC<ITablePaginationProps> = ({
  totalPages,
  changeElementsPerPage,
  currentPage,
  elementsPerPage,
  changePageHandler,
  selectOptions,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Pagination
        color={"primary"}
        variant={"outlined"}
        shape={"rounded"}
        count={totalPages}
        page={currentPage}
        onChange={changePageHandler}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography>Show</Typography>
        <Select
          value={elementsPerPage.toString()}
          onChange={changeElementsPerPage}
          sx={{ padding: "0", height: 20 }}
          IconComponent={() => <KeyboardArrowDownOutlined />}
        >
          {selectOptions.map((option) => {
            return <MenuItem value={option.value}>{option.title}</MenuItem>;
          })}
        </Select>
        <Typography>Cards per page</Typography>
      </Box>
    </Box>
  );
};
