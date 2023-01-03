import React, { ReactNode } from "react";
import Paper from "@mui/material/Paper/Paper";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import Table from "@mui/material/Table/Table";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import { Box, TableBody, TableCell } from "@mui/material";
import AddNewPack from "./AddNewPack";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { IPackResponse } from "./packsAPI";
import { TablePagination } from "../../common/components/TablePagination/TablePagination";
import { selectOptions } from "./Packs.data";
import { NotFoundElements } from "../../common/components/NotFoundElements/NotFoundElements";
import PackElement from "./PackElement";

interface ITableProps {
  id: string;
  cardPacks: IPackResponse[];
  totalPageCount: number;
  pageCount: number;
  page: number;
  isMyPack: boolean;
  changeSort: (field: string) => void;
  showSortIcon: (field: string) => ReactNode;
  removePack: (id: string) => void;
  handleChangeRowsPerPage: (event: SelectChangeEvent) => void;
  changePage: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}

const PacksTable: React.FC<ITableProps> = React.memo(
  ({
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
    isMyPack,
  }) => {
    return (
      <Paper sx={{ position: "relative" }}>
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
                {!!cardPacks ? (
                  cardPacks.map((pack) => (
                    <PackElement
                      key={pack._id}
                      id={id}
                      removePack={removePack}
                      pack={pack}
                      isMyPack={isMyPack}
                    />
                  ))
                ) : (
                  <TableRow>
                    <NotFoundElements title={"Empty"} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TablePagination
              title={"Packs"}
              totalPages={totalPageCount}
              elementsPerPage={pageCount}
              changePageHandler={changePage}
              changeElementsPerPage={handleChangeRowsPerPage}
              currentPage={page}
              selectOptions={selectOptions}
            />
          </Box>
        </Paper>
      </Paper>
    );
  }
);

export default PacksTable;
