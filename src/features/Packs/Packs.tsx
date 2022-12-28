import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, debounce, Toolbar } from "@mui/material";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import {
  addPackTC,
  removePackTC,
  resetFilter,
  setPacksTC,
} from "./packsThunks";
import { packsStateSelect, userStateSelect } from "../../app/selectors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SuperRange from "./SuperRange";
import {
  initialState,
  setCurrentPage,
  setPackName,
  setPacks,
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
import PacksHeader from "./PacksHeader";

const Packs = () => {
  const user = useAllSelector(userStateSelect);
  const {
    packName,
    cardPacks,
    page,
    pageCount,
    cardPacksTotalCount,
    max,
    min,
    isMyPack,
    sortPacks,
  } = useAllSelector(packsStateSelect);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const [sort, setSort] = useState({ direction: 0, field: "updated" });
  const [addPackMode, setAddPackMode] = useState<boolean>(false);
  const totalPageCount = Math.ceil(cardPacksTotalCount / pageCount);
  const isAsc = sort.direction === 1;
  const isParamsSet = Object.keys(params).length > 0;
  const sortIcon = isAsc ? (
    <ArrowDropDown style={{ margin: "-5px 0px" }} />
  ) : (
    <ArrowDropUp style={{ margin: "-5px 0px" }} />
  );
  const dispatch = useAppDispatch();

  const changeRangeQueryParams = useCallback(
    debounce((valueRange: number[]) => {
      setSearchParams({
        ...params,
        min: valueRange[0].toString(),
        max: valueRange[1].toString(),
      });
    }, 500),
    []
  );
  const changeRangeHandler = (valueRange: number[]) => {
    changeRangeQueryParams(valueRange);
    dispatch(setRangeValue({ range: valueRange }));
  };
  useEffect(() => {
    if (!isParamsSet) {
      console.log("dispatch clear model");
      dispatch(setPacksTC({}));
      return;
    }
    const model = {
      isMyPack: params.isMyPack,
      pageCount: params.showPerPage,
      page: params.page,
      max: params.max,
      min: params.min,
      packName: params.packName,
      sortPacks: sort.field ? `${sort.direction}${sort.field}` : "0updated",
    };
    dispatch(setPacksTC(model));
  }, [searchParams]);

  const changePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    dispatch(setCurrentPage({ page: newPage }));
    setSearchParams({ ...params, page: newPage + "" });
  };
  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    dispatch(setPageCount({ pageCount: +event.target.value }));
    setSearchParams({ ...params, pageCount: event.target.value });
    // dispatch(setCurrentPage({ page: 1 }));
  };
  const removePack = (id: string) => {
    dispatch(removePackTC(id));
    setSearchParams({ ...params });
  };
  const setSearchQueryParams = useCallback(
    debounce((value: string) => {
      setSearchParams({ ...params, packName: value });
    }, 500),
    []
  );

  const changeSearchHandler = (value: string) => {
    setSearchQueryParams(value);
    dispatch(setPackName({ packName: value }));
  };
  const addPack = (
    newPackName: string,
    newDeckCover: string,
    isPrivate: boolean
  ) => {
    dispatch(addPackTC(newPackName, newDeckCover, isPrivate));
    setSearchParams({ ...params });
  };
  const setSortForPacks = (type: string) => {
    dispatch(setPacksSort({ type }));
  };
  const handlerIsMyPack = (param: "my" | "all") => {
    dispatch(setPreferencePacks({ param }));
    setSearchParams({ ...params, isMyPack: param === "my" ? "true" : "false" });
  };
  const changeSort = async (field: string) => {
    await setSort({ direction: sort.direction === 0 ? 1 : 0, field });
    setSortForPacks((sort.direction + sort.field).toString());
    setSearchParams((sort.direction + sort.field).toString());
  };
  const showSortIcon = (field: string) => {
    return sort.field === field ? sortIcon : <HorizontalRule />;
  };
  const removeSort = () => {
    // dispatch(resetFilter());
    setSearchParams({});
  };
  return (
    <Box
      style={{ padding: "6rem 2rem", display: "flex", flexDirection: "column" }}
    >
      <PacksHeader
        removeSort={removeSort}
        setAddPackMode={setAddPackMode}
        changeRangeHandler={changeRangeHandler}
        packName={packName}
        changeSearchHandler={changeSearchHandler}
        isMyPack={isMyPack}
        max={max}
        min={min}
        addPackMode={addPackMode}
        cardPacksTotalCount={cardPacksTotalCount}
        handlerIsMyPack={handlerIsMyPack}
      />
      {/*TABLE*/}
      <PacksTable
        id={user._id}
        cardPacks={cardPacks}
        totalPageCount={totalPageCount}
        pageCount={pageCount}
        page={page}
        addPack={addPack}
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
