import { Box, debounce } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";
import { removePackTC, setPacksTC } from "./packsThunks";
import React, { useCallback, useEffect } from "react";
import {
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
} from "./selectors";
import { useAllSelector, useAppDispatch } from "../../common/hooks";

import PacksHeader from "./components/PacksHeader";
import PacksModals from "./components/modals/PacksModals";
import PacksTable from "./components/PacksTable";
import { Preloader } from "../../common/components/Preloader/Preloader";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { appStateSelector } from "app/selectors";
import { getSortIcon } from "../../common/utils/assets";
import { packsAC } from "./packsReducer";
import styles from "../../common/styles/common/common.module.scss";
import { useSearchParams } from "react-router-dom";
import { userStateSelector } from "features/User/selectors";
<<<<<<< HEAD
import { selectOptions } from "./Packs.data";
import { Pagination } from "../../common/ui-kit/Pagination/Pagination";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Flex } from "../../common/ui-kit/Flex/Flex";
import { Container } from "../../common/ui-kit/Container/Container";
import { debounce } from "@mui/material";
import { PacksPreloader } from "./components/PacksPreloader";
=======
import { useDebounce } from "../../common/hooks/useDebounce";
>>>>>>> dev

const Packs = () => {
  // Selectors
  const user = useAllSelector(userStateSelector);
  const { isLoading } = useAllSelector(appStateSelector);
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

  // Utils
  const totalPageCount = Math.ceil(cardPacksTotalCount / pageCount);
  const isParamsSet = Object.keys(params).length > 0;
  const dispatch = useAppDispatch();

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
      sortPacks: params.sortPacks
        ? {
            direction: +params.sortPacks[0],
            field: params.sortPacks
              .split("")
              .splice(1, params.sortPacks.length - 1)
              .join(""),
          }
        : sortPacks,
    };
    dispatch(setPacksTC(model));
  }, [searchParams]);

  const changePage = useCallback(
    (event: React.ChangeEvent<unknown>, newPage: number) => {
      dispatch(packsAC.setCurrentPage({ page: newPage }));
      setSearchParams({ ...params, page: `${newPage}` });
    },
    [params, packsAC.setCurrentPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(packsAC.setPageCount({ pageCount: +event.target.value }));
      setSearchParams({ ...params, pageCount: event.target.value });
    },
    [params, packsAC.setPageCount]
  );

  const removePack = useCallback((id: string) => {
    dispatch(removePackTC(id));
  }, []);

  const setSearchQueryParams = useCallback(
    debounce(
      (value: string) => setSearchParams({ ...params, packName: value }),
      1000
    ),
<<<<<<< HEAD
    [setSearchParams, debounce]
=======
    [params]
>>>>>>> dev
  );

  const changeSearchHandler = useCallback(
    (value: string) => {
      dispatch(packsAC.setPackName({ packName: value }));
      setSearchQueryParams(value);
    },
    [setSearchQueryParams, packsAC.setPackName]
  );

  const handlerIsMyPack = useCallback(
    (param: boolean) => {
      dispatch(packsAC.setPreferencePacks({ isMine: param }));
      setSearchParams({ ...params, isMyPack: `${param}` });
    },
    [params, packsAC.setPreferencePacks]
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
    [params, packsAC.setPacksSort]
  );
<<<<<<< HEAD
  //range
  const optDebounce = useCallback(
    debounce((valueRange: number[]) => {
=======

  // const optDebounce = useCallback(
  //   debounce((valueRange: number[]) => {
  //     console.log("settings params");
  //     setSearchParams({
  //       ...params,
  //       min: valueRange[0].toString(),
  //       max: valueRange[1].toString(),
  //     });
  //   }, 700),
  //   [params]
  // );

  const optDebounce = useCallback(
    useDebounce((valueRange: number[]) => {
>>>>>>> dev
      setSearchParams({
        ...params,
        min: valueRange[0].toString(),
        max: valueRange[1].toString(),
      });
      console.log("setted");
    }, 1000),
    [params]
  );
<<<<<<< HEAD
=======

>>>>>>> dev
  const changeRangeHandler = useCallback(
    (valueRange: number[]) => {
      // dispatch(packsAC.setRangeValue({ range: valueRange }));
      optDebounce(valueRange);
    },
<<<<<<< HEAD
    [packsAC.setRangeValue, optDebounce, params]
  );
=======
    [dispatch, optDebounce]
  );

  //
  // const optDebounce = debounce((valueRange: number[]) => {
  //   setSearchParams({
  //     ...params,
  //     min: valueRange[0].toString(),
  //     max: valueRange[1].toString(),
  //   });
  // }, 1000);
  //
  // const changeRangeHandler = (valueRange: number[]) => {
  //   optDebounce(valueRange);
  //   dispatch(packsAC.setRangeValue({ range: valueRange }));
  // };
>>>>>>> dev

  const showSortIcon = (field: string) => {
    return sortPacks.field === field ? (
      getSortIcon(sortPacks.direction === 1)
    ) : (
      <HorizontalRule />
    );
  };

  const removeSort = useCallback(() => {
    dispatch(packsAC.clearSettings({}));
    setSearchParams({});
  }, []);

  return (
<<<<<<< HEAD
    <Container variant="sm" sx={{ paddingTop: "8.75rem" }}>
      {!isLoading ? (
        <Flex fDirection={"column"}>
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
            changeSort={changeSort}
            showSortIcon={showSortIcon}
            removePack={removePack}
            isMyPack={isMyPack}
            isLoading={isLoading}
          />
          <Pagination
            selectProps={{
              options: selectOptions,
              selected: pageCount.toString(),
              onChange: handleChangeRowsPerPage,
              endIcon: <MdKeyboardArrowDown />,
            }}
            label="Packs"
            changePage={changePage}
            currentPage={page}
            totalPages={totalPageCount}
          />

          <PacksModals />
        </Flex>
      ) : (
        <PacksPreloader />
      )}
    </Container>
=======
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
>>>>>>> dev
  );
};

export default Packs;
