import { Box, debounce } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { addPackTC, removePackTC, setPacksTC } from "./packsThunks";
import { packsStateSelect, userStateSelect } from "../../app/selectors";
import { useAllSelector, useAppDispatch } from "../../common/hooks";

import { HorizontalRule } from "@mui/icons-material";
import PacksHeader from "./PacksHeader";
import PacksTable from "./PacksTable";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { getSortIcon } from "../../common/utils/assets";
import { packsAC } from "./packsReducer";
import { useSearchParams } from "react-router-dom";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  // Local states
  const [sort, setSort] = useState({ direction: 0, field: "updated" });
  const [searchField, setSearchField] = useState(params.packName || "");

  // Utils
  const [addPackMode, setAddPackMode] = useState<boolean>(false);
  const totalPageCount = Math.ceil(cardPacksTotalCount / pageCount);
  const isAsc = sort.direction === 1;
  const sortIcon = getSortIcon(isAsc);
  const isParamsSet = Object.keys(params).length > 0;
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
    dispatch(packsAC.setRangeValue({ range: valueRange }));
  };

  useEffect(() => {
    setSearchField(params.packName || "");
  }, [params.packName]);

  useEffect(() => {
    if (!isParamsSet) {
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
    dispatch(packsAC.setCurrentPage({ page: newPage }));
    setSearchParams({ ...params, page: `${newPage}` });
  };
  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    dispatch(packsAC.setPageCount({ pageCount: +event.target.value }));
    setSearchParams({ ...params, pageCount: event.target.value });
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
    setSearchField(value);
    dispatch(packsAC.setPackName({ packName: value }));
  };
  const addPack = (
    newPackName: string,
    newDeckCover: string,
    isPrivate: boolean
  ) => {
    dispatch(addPackTC(newPackName, newDeckCover, isPrivate));
  };
  const setSortForPacks = (type: string) => {
    dispatch(packsAC.setPacksSort({ type }));
  };
  const handlerIsMyPack = (param: boolean) => {
    dispatch(packsAC.setPreferencePacks({ isMine: param }));
    setSearchParams({ ...params, isMyPack: `${param}` });
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
        packName={searchField}
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
        isMyPack={isMyPack}
      />
    </Box>
  );
};

export default Packs;
