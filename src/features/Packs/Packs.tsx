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
  MenuItem,
  Pagination,
  Select,
  TableBody,
  TableCell,
  Toolbar,
  Typography,
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
import { NavLink, useSearchParams } from "react-router-dom";
import {
  ArrowDropDown,
  ArrowDropUp,
  DeleteOutline,
  Edit,
  HorizontalRule,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const [sort, setSort] = useState({ direction: 0, field: "updated" });

  const totalPageCount = Math.ceil(cardPacksTotalCount / pageCount);
  const isAsc = sort.direction === 1;
  const sortIcon = isAsc ? (
    <ArrowDropDown style={{ margin: "-5px 0px" }} />
  ) : (
    <ArrowDropUp style={{ margin: "-5px 0px" }} />
  );
  const dispatch = useAppDispatch();

  let timer: number;
  const changeRangeHandler = (valueRange: number[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(setRangeValue({ range: valueRange }));
    }, 200);
  };
  useEffect(() => {
    setSearchParams({
      page: page.toString(),
      packName: packName,
      pageCount: pageCount.toString(),
      max: maxCardsCount.toString(),
      min: minCardsCount.toString(),
      isMyPack: isMyPack.toString(),
      sortPacks: sort.field ? `${sort.direction}${sort.field}` : "0updated",
    });
  }, [
    pageCount,
    page,
    setSearchParams,
    isMyPack,
    sortPacks,
    minCardsCount,
    maxCardsCount,
  ]);

  useEffect(() => {
    const model = {
      isMyPack: params.isMyPack,
      pageCount: params.showPerPage,
      page: params.page,
      max: params.max,
      min: params.min,
      sortPacks: sort.field ? `${sort.direction}${sort.field}` : "0updated",
    };
    dispatch(setPacksTC(model));
  }, [searchParams]);

  const changePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    dispatch(setCurrentPage({ page: newPage }));
  };
  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    dispatch(setPageCount({ pageCount: +event.target.value }));
    // dispatch(setCurrentPage({ page: 1 }));
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
  const changeSort = async (field: string) => {
    await setSort({ direction: sort.direction === 0 ? 1 : 0, field });
    setSortForPacks((sort.direction + sort.field).toString());
  };
  const showSortIcon = (field: string) => {
    return sort.field === field ? sortIcon : <HorizontalRule />;
  };
  return (
    <Box
      style={{ padding: "6rem 2rem", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0",
          }}
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0",
            }}
          >
            <SuperSearch searchPacks={packName} setSearch={setSearch} />
            <FormControl
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "auto 1rem",
              }}
            >
              <Button
                style={{ margin: "auto 1rem" }}
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

            <SuperRange onChangeSlider={changeRangeHandler} />
            <Button onClick={() => setAddPackMode((mode) => !mode)}>
              Add new Pack
            </Button>
          </Container>
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
      ) : (
        <AddNewPack setAddPackMode={setAddPackMode} />
      )}
    </Box>
  );
};

export default Packs;
