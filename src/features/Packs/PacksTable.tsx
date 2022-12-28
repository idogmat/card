import React, { ReactNode, useState } from "react";
import Paper from "@mui/material/Paper/Paper";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import Table from "@mui/material/Table/Table";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  TableBody,
  TableCell,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button/Button";
import SchoolIcon from "@mui/icons-material/School";
import {
  DeleteOutline,
  Edit,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import AddNewPack from "./AddNewPack";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { IPackResponse } from "./packsAPI";
import {
  ITablePaginationOption,
  TablePagination,
} from "../Cards/TablePagination";
import PacksRow from "./PacksRow";
const selectOptions: ITablePaginationOption[] = [
  { title: 4, value: 4 },
  { title: 7, value: 7 },
  { title: 10, value: 10 },
];
interface ITableProps {
  id: string;
  cardPacks: IPackResponse[];
  totalPageCount: number;
  pageCount: number;
  page: number;
  addPackMode: boolean;
  setAddPackMode: (set: boolean) => void;
  addPack: (s: string, d: string, b: boolean) => void;
  changeSort: (field: string) => void;
  showSortIcon: (field: string) => ReactNode;
  removePack: (id: string) => void;
  handleChangeRowsPerPage: (event: SelectChangeEvent) => void;
  changePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}
const PacksTable: React.FC<ITableProps> = ({
  addPack,
  id,
  changeSort,
  removePack,
  handleChangeRowsPerPage,
  changePage,
  showSortIcon,
  cardPacks,
  totalPageCount,
  page,
  pageCount,
  addPackMode,
  setAddPackMode,
}) => {
  return (
    <>
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align={"center"}>CardsCount</TableCell>
                <TableCell
                  onClick={() => changeSort("updated")}
                  align={"center"}
                >
                  <Box>Updated{showSortIcon("updated")}</Box>
                </TableCell>
                <TableCell align={"center"}>Author Name</TableCell>
                <TableCell align={"center"}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <PacksRow id={id} removePack={removePack} cardPacks={cardPacks} />
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TablePagination
            totalPages={totalPageCount}
            elementsPerPage={pageCount}
            changePageHandler={changePage}
            changeElementsPerPage={handleChangeRowsPerPage}
            currentPage={page}
            selectOptions={selectOptions}
          />
        </Box>
      </Paper>
      {!addPackMode && (
        <AddNewPack addPack={addPack} setAddPackMode={setAddPackMode} />
      )}
    </>
  );
};

export default PacksTable;
