import { Box, debounce } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  appStateSelect,
  packsCardsPacksSelector,
  packsIsMyPackSelector,
  packsMaxCardsPacksSelector,
  packsMaxSelector,
  packsMinCardsPacksSelector,
  packsMinSelector,
  packsNameSelector,
  packsPageCountSelector,
  packsPageSelector,
  packsSortPacksSelector,
  packsTotalCardsSelector,
  userStateSelect,
} from "./selectors";
import { removePackTC, setPacksTC } from "./packsThunks";
import { useAllSelector, useAppDispatch } from "../../common/hooks";

import { HorizontalRule } from "@mui/icons-material";
import PacksHeader from "./components/PacksHeader";
import PacksModals from "./components/modals/PacksModals";
import PacksTable from "./components/PacksTable";
import { Preloader } from "../../common/components/Preloader/Preloader";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { getSortIcon } from "../../common/utils/assets";
import { packsAC } from "./packsReducer";
import styles from "../../common/styles/common.module.css";
import { useSearchParams } from "react-router-dom";

export type EditModeType = "edit" | "delete" | "idle";
const Packs = () => {
  // Selectors
  const user = useAllSelector(userStateSelect);
  const { isLoading } = useAllSelector(appStateSelect);
  const packName = useAllSelector(packsNameSelector);
  const cardPacks = useAllSelector(packsCardsPacksSelector);
  const page = useAllSelector(packsPageSelector);
  const pageCount = useAllSelector(packsPageCountSelector);
  const cardPacksTotalCount = useAllSelector(packsTotalCardsSelector);
  const max = useAllSelector(packsMaxSelector);
  const min = useAllSelector(packsMinSelector);
  const isMyPack = useAllSelector(packsIsMyPackSelector);
  const sortPacks = useAllSelector(packsSortPacksSelector);
  const maxCardsCount = useAllSelector(packsMaxCardsPacksSelector);
  const minCardsCount = useAllSelector(packsMinCardsPacksSelector);

  // Query
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  // Local states

  // Utils
  const totalPageCount = Math.ceil(cardPacksTotalCount / pageCount);
  const isParamsSet = Object.keys(params).length > 0;
  const dispatch = useAppDispatch();

  const changeRangeQueryParams = useCallback(
    debounce((valueRange: number[]) => {
      setSearchParams({
        ...params,
        min: valueRange[0].toString(),
        max: valueRange[1].toString(),
      });
    }, 700),
    []
  );

  const changeRangeHandler = useCallback((valueRange: number[]) => {
    changeRangeQueryParams(valueRange);
    dispatch(packsAC.setRangeValue({ range: valueRange }));
  }, []);

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
      sortPacks: sortPacks,
    };

    dispatch(setPacksTC(model));
  }, [searchParams]);

  const changePage = useCallback(
    (event: React.ChangeEvent<unknown>, newPage: number) => {
      dispatch(packsAC.setCurrentPage({ page: newPage }));
      setSearchParams({ ...params, page: `${newPage}` });
    },
    [page]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(packsAC.setPageCount({ pageCount: +event.target.value }));
      setSearchParams({ ...params, pageCount: event.target.value });
    },
    [pageCount]
  );

  const removePack = useCallback((id: string) => {
    dispatch(removePackTC(id));
  }, []);

  const setSearchQueryParams = useCallback(
    debounce((value: string) => {
      setSearchParams({ ...params, packName: value });
    }, 700),
    [packName]
  );

  const changeSearchHandler = useCallback((value: string) => {
    setSearchQueryParams(value);
    dispatch(packsAC.setPackName({ packName: value }));
  }, []);

  const handlerIsMyPack = useCallback(
    (param: boolean) => {
      dispatch(packsAC.setPreferencePacks({ isMine: param }));
      setSearchParams({ ...params, isMyPack: `${param}` });
    },
    [isMyPack]
  );

  const changeSort = useCallback(
    (field: string) => {
      dispatch(
        packsAC.setPacksSort({
          type: { direction: sortPacks.direction === 1 ? 0 : 1, field },
        })
      );

      setSearchParams({
        ...params,
        sortPacks: (sortPacks.direction + sortPacks.field).toString(),
      });
    },
    [sortPacks]
  );

  const showSortIcon = useCallback((field: string) => {
    return sortPacks.field === field ? (
      getSortIcon(sortPacks.direction === 1)
    ) : (
      <HorizontalRule />
    );
  }, []);

  const removeSort = useCallback(() => {
    setSearchParams({});
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        padding: "6rem 2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isLoading && (
        <div className={styles.preventSending}>
          <Preloader />
        </div>
      )}
      <PacksHeader
        removeSort={removeSort}
        changeRangeHandler={changeRangeHandler}
        packName={packName}
        changeSearchHandler={changeSearchHandler}
        isMyPack={isMyPack}
        max={max}
        min={min}
        maxCardsCount={maxCardsCount}
        minCardsCount={minCardsCount}
        handlerIsMyPack={handlerIsMyPack}
      />
      {/*TABLE*/}
      <PacksTable
        id={user._id}
        cardPacks={cardPacks}
        totalPageCount={totalPageCount}
        pageCount={pageCount}
        page={page}
        changePage={changePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        changeSort={changeSort}
        showSortIcon={showSortIcon}
        removePack={removePack}
        isMyPack={isMyPack}
        isLoading={isLoading}
      />

      <PacksModals />
    </Box>
  );
};

export default Packs;
