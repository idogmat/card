import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Container,
  TableBody,
  TableCell,
  TablePagination,
  Toolbar,
} from "@mui/material";
import { useDebounce } from "usehooks-ts";
import Button from "@mui/material/Button/Button";
import SchoolIcon from "@mui/icons-material/School";
import FormControl from "@mui/material/FormControl/FormControl";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { removePackTC, setPacksTC } from "./packsThunks";
import { packsStateSelect, userStateSelect } from "../../app/selectors";
import AddNewPack from "./AddNewPack";
import SuperRange from "./SuperRange";
import SuperSearch from "./SuperSearch";
import {
  setCurrentPage,
  setPackName,
  setPacksSort,
  setPageCount,
  setPreferencePacks,
  setRangeValue,
} from "./packsReducer";
import { NavLink } from "react-router-dom";
import { DeleteOutline, Edit } from "@mui/icons-material";

const Packs = () => {
  const user = useAllSelector(userStateSelect);
  const {
    packName,
    cardPacks,
    page,
    pageCount,
    cardPacksTotalCount,
    maxCardsCount,
    minCardsCount,
    isMyPack,
    sortPacks,
  } = useAllSelector(packsStateSelect);
  const [addPackMode, setAddPackMode] = useState(false);

  const [range, setterRange] = useState<number[]>([
    minCardsCount,
    maxCardsCount,
  ]);
  const rangeValueD = useDebounce<number[]>(range, 1000);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPacksTC());
    if (range !== rangeValueD) dispatch(setRangeValue({ range: rangeValueD }));
    // PacksAPI.getCardsPack(id).then((e) => {
    //   console.log(e);
    // });
    console.log(cardPacks);
  }, [
    user._id,
    page,
    pageCount,
    rangeValueD,
    minCardsCount,
    maxCardsCount,
    packName,
    isMyPack,
    sortPacks,
  ]);
  const changePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setCurrentPage({ page: newPage + 1 }));
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPageCount({ pageCount: +event.target.value }));
    dispatch(setCurrentPage({ page: 1 }));
  };
  const removePack = (id: string) => {
    dispatch(removePackTC(id));
  };

  const setSearch = (searchName: string) => {
    dispatch(setPackName({ packName: searchName }));
  };
  const setSortForPacks = (type: string) => {
    dispatch(setPacksSort({ type }));
  };
  const handlerIsMyPack = (param: "my" | "all") => {
    dispatch(setPreferencePacks({ param }));
  };
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Container style={{ display: "flex", flexDirection: "row" }}>
            <SuperSearch searchPacks={packName} setSearch={setSearch} />
            <FormControl style={{ display: "flex", flexDirection: "row" }}>
              <Button
                variant={isMyPack ? "contained" : "outlined"}
                onClick={() => handlerIsMyPack("my")}
              >
                My
              </Button>
              <Button
                variant={!isMyPack ? "contained" : "outlined"}
                onClick={() => handlerIsMyPack("all")}
              >
                All
              </Button>
            </FormControl>

            <SuperRange
              value={range}
              onChange={(e, newValue) =>
                Array.isArray(newValue) && setterRange(newValue)
              }
            />
          </Container>

          <Button onClick={() => setAddPackMode((mode) => !mode)}>
            Add new Pack
          </Button>
        </Toolbar>
      </Box>
      {/*TABLE*/}
      {!addPackMode ? (
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align={"center"}>CardsCount</TableCell>
                  <TableCell
                    onClick={() => setSortForPacks("updated")}
                    align={"center"}
                  >
                    Updated
                    {sortPacks === "update" ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )}
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
                          disabled={pack.user_id !== user._id}
                          onClick={() => removePack(pack._id)}
                        >
                          <DeleteOutline />
                        </Button>
                        <Button disabled={pack.user_id !== user._id}>
                          <Edit />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            count={cardPacksTotalCount}
            page={page - 1}
            onPageChange={changePage}
            rowsPerPage={pageCount}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <AddNewPack setAddPackMode={setAddPackMode} />
      )}
    </Box>
  );
};

export default Packs;
