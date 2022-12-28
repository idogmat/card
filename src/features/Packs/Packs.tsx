import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { removePackTC, setPacksTC } from "./packsThunks";
import { packsStateSelect, userStateSelect } from "../../app/selectors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SuperRange from "./SuperRange";
import {
  setCurrentPage,
  setPackName,
  setPacksSort,
  setPageCount,
  setPreferencePacks,
  setRangeValue,
} from "./packsReducer";
import { useSearchParams } from "react-router-dom";
import {
  ArrowDropDown,
  ArrowDropUp,
  HorizontalRule,
} from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { Search } from "../../common/components/Search/Search";
import PacksTable from "./PacksTable";
import { useWhatChanged } from "@simbathesailor/use-what-changed";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const [sort, setSort] = useState({ direction: 0, field: "updated" });
  const [addPackMode, setAddPackMode] = useState(false);
  const totalPageCount = Math.ceil(cardPacksTotalCount / pageCount);
  const isAsc = sort.direction === 1;
  const isParamsSet = Object.keys(params).length > 0;
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
  // useWhatChanged([params.page, params.packName, params.pageCount,params.max,params.min,params.isMyPack,params.sortPacks]);
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
    cardPacks,
    pageCount,
    page,
    isMyPack,
    sortPacks,
    minCardsCount,
    maxCardsCount,
    packName,
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
    isParamsSet && dispatch(setPacksTC(model));
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
  let timer1: number;
  const setSearch = (value: string) => {
    if (timer1) clearTimeout(timer1);
    timer1 = setTimeout(() => {
      dispatch(setPackName({ packName: value }));
    }, 500);
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
  const removeSort = () => {
    setSearchParams({});
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
            <Search onChangeCb={setSearch} />
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
            <Button
              variant="contained"
              onClick={() => setAddPackMode((mode) => !mode)}
            >
              Add new Pack
            </Button>
            <Button onClick={() => removeSort()} style={{ margin: "auto 0" }}>
              <DeleteForeverIcon />
            </Button>
          </Container>
        </Toolbar>
      </Box>
      {/*TABLE*/}
      <PacksTable
        id={user._id}
        cardPacks={cardPacks}
        totalPageCount={totalPageCount}
        pageCount={pageCount}
        page={page}
        addPackMode={addPackMode}
        setAddPackMode={setAddPackMode}
        changePage={changePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        changeSort={changeSort}
        showSortIcon={showSortIcon}
        removePack={removePack}
      />
    </Box>
  );
};

export default Packs;
