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
interface ITableProps {
  id: string;
  cardPacks: IPackResponse[];
  totalPageCount: number;
  pageCount: number;
  page: number;
  addPackMode: boolean;
  setAddPackMode: (set: boolean) => void;
  changeSort: (field: string) => void;
  showSortIcon: (field: string) => ReactNode;
  removePack: (id: string) => void;
  handleChangeRowsPerPage: (event: SelectChangeEvent) => void;
  changePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}
const PacksTable: React.FC<ITableProps> = ({
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
              {!!cardPacks &&
                cardPacks.map((pack) => (
                  <TableRow key={pack._id}>
                    <TableCell component="th" scope="row">
                      <NavLink to={`/packs/${pack._id}`}>{pack.name}</NavLink>
                    </TableCell>
                    <TableCell align="center">{pack.cardsCount}</TableCell>
                    <TableCell align="center">{pack.created}</TableCell>
                    <TableCell align="center">{pack.user_name}</TableCell>
                    <TableCell>
                      <Button>
                        <SchoolIcon />
                      </Button>
                      <Button
                        disabled={pack.user_id !== id}
                        onClick={() => removePack(pack._id)}
                      >
                        <DeleteOutline />
                      </Button>
                      <Button disabled={pack.user_id !== id}>
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Pagination
            color={"primary"}
            variant={"outlined"}
            shape={"rounded"}
            count={totalPageCount}
            page={page}
            onChange={(e, value) => changePage(e, value)}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Show</Typography>
            <Select
              value={pageCount.toString()}
              onChange={(e) => handleChangeRowsPerPage(e)}
              sx={{ padding: "0", height: 20 }}
              IconComponent={() => <KeyboardArrowDownOutlined />}
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
            <Typography>Cards per page</Typography>
          </Box>
        </Box>
      </Paper>
      {!addPackMode && <AddNewPack setAddPackMode={setAddPackMode} />}
    </>
  );
};

export default PacksTable;
