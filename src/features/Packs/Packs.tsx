import { IParams, removePackTC, setPacksTC } from "./packsThunks";
import React, { useCallback, useEffect, useRef } from "react";
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
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { appStateSelector } from "app/selectors";
import { getSortIcon } from "../../common/utils/assets";
import { packsAC } from "./packsReducer";
import styles from "../../common/styles/common/common.module.scss";
import { useSearchParams } from "react-router-dom";
import { userStateSelector } from "features/User/selectors";
import { selectOptions } from "./Packs.data";
import { Pagination } from "../../common/ui-kit/Pagination/Pagination";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Flex } from "../../common/ui-kit/Flex/Flex";
import { Container } from "../../common/ui-kit/Container/Container";
import { useDebounce } from "../../common/hooks/useDebounce";
import { debounce } from "@mui/material";

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
  // Local states

  // Utils
  const totalPageCount = Math.ceil(cardPacksTotalCount / pageCount);
  const isParamsSet = Object.keys(params).length > 0;
  const dispatch = useAppDispatch();
  let timeout = useRef<TimeoutId>();

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
  //page
  const changePage = useCallback(
    (newPage: number) => {
      dispatch(packsAC.setCurrentPage({ page: newPage }));
      setSearchParams({ ...params, page: `${newPage}` });
    },
    [packsAC.setCurrentPage, setSearchParams]
  );

  const handleChangeRowsPerPage = useCallback(
    (value: string) => {
      dispatch(packsAC.setPageCount({ pageCount: +value }));
      setSearchParams({ ...params, pageCount: value });
    },
    [setSearchParams, packsAC.setPageCount]
  );

  const setSearchQueryParams = useCallback(
    debounce((value: string) =>
      setSearchParams({ ...params, packName: value })
    ),
    [setSearchParams, debounce]
  );
  //search
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
    [setSearchParams, packsAC.setPreferencePacks]
  );
  //sort
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
    [packsAC.setPacksSort, setSearchParams]
  );
  //range
  const optDebounce = (
    type: { valueRange: number[]; params: any },
    ms: number
  ) => {
    function callFunc() {
      setSearchParams({
        ...type.params,
        min: type.valueRange[0].toString(),
        max: type.valueRange[1].toString(),
      });
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(callFunc, ms);
  };

  const changeRangeHandler = (valueRange: number[], params: IParams) => {
    dispatch(packsAC.setRangeValue({ range: valueRange }));
    optDebounce({ valueRange, params }, 700);
  };

  const showSortIcon = (field: string) => {
    return sortPacks.field === field ? (
      getSortIcon(sortPacks.direction === 1)
    ) : (
      <MdKeyboardArrowDown />
    );
  };

  const removePack = useCallback((id: string) => {
    dispatch(removePackTC(id));
  }, []);

  const removeSort = useCallback(() => {
    dispatch(packsAC.clearSettings({}));
    setSearchParams({});
  }, []);

  return (
    <Container variant="sm" sx={{ paddingTop: "8.75rem" }}>
      <Flex fDirection={"column"}>
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
          params={params}
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
    </Container>
  );
};

export default Packs;
