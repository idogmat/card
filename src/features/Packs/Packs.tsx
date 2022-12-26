import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";

import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TableBody,
  TableCell,
  TablePagination,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDebounce } from "usehooks-ts";
import Button from "@mui/material/Button/Button";

import FormControl from "@mui/material/FormControl/FormControl";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { removePackTC, setPacksTC } from "./packsThunks";
import { packsStateSelect, userStateSelect } from "../../app/selectors";
import AddNewPack from "./AddNewPack";
import SuperRange from "./SuperRange";
import SuperSearch from "./SuperSearch";
import {
  setCurrentPage,
  setPageCount,
  setPreferencePacks,
  setRangeValue,
} from "./packsReducer";

const Packs = () => {
  const user = useAllSelector(userStateSelect);
  const {
    cardPacks,
    page,
    pageCount,
    cardPacksTotalCount,
    max,
    min,
    isMyPack,
  } = useAllSelector(packsStateSelect);
  const [addPackMode, setAddPackMode] = useState(false);
  const [range, setterRange] = useState<number[]>([min, max]);
  const debouncedValue = useDebounce<number[]>(range, 500);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("k");
    setRange(range);
    dispatch(setPacksTC());

    // PacksAPI.getCardsPack(id).then((e) => {
    //   console.log(e);
    // });
    console.log(cardPacks);
  }, [user._id, page, pageCount, debouncedValue, isMyPack]);
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
  const setRange = (newValue: number[]) => {
    dispatch(setRangeValue({ range: newValue }));
  };
  const handlerIsMyPack = (param: "my" | "all") => {
    dispatch(setPreferencePacks({ param }));
  };
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Container style={{ display: "flex", flexDirection: "row" }}>
            <SuperSearch />
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
                  <TableCell align={"center"}>Updated</TableCell>
                  <TableCell align={"center"}>Author Name</TableCell>
                  <TableCell align={"center"}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!!cardPacks &&
                  cardPacks.map((pack) => (
                    <TableRow key={pack._id}>
                      <TableCell component="th" scope="row">
                        {pack.name}
                      </TableCell>
                      <TableCell align="center">{pack.cardsCount}</TableCell>
                      <TableCell align="center">{pack.created}</TableCell>
                      <TableCell align="center">{pack.user_name}</TableCell>
                      {isMyPack ? (
                        <TableCell>
                          <Button onClick={() => removePack(pack._id)}>
                            Delete
                          </Button>
                          <Button>Edit</Button>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Button onClick={() => removePack(pack._id)}>
                            Learn
                          </Button>
                          <Button onClick={() => removePack(pack._id)}>
                            Delete
                          </Button>
                          <Button>Edit</Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <AddNewPack setAddPackMode={setAddPackMode} />
      )}
      <TablePagination
        count={cardPacksTotalCount}
        page={page - 1}
        onPageChange={changePage}
        rowsPerPage={pageCount}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Packs;
