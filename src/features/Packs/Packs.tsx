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
import { appStateSelector } from "app/selectors";
import { getSortIcon } from "../../common/utils/assets";
import { packsAC } from "./packsReducer";
import { useSearchParams } from "react-router-dom";
import { userStateSelector } from "features/User/selectors";
import { selectOptions } from "./Packs.data";
import { Pagination } from "../../common/ui-kit/Pagination/Pagination";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Flex } from "../../common/ui-kit/Flex/Flex";
import { Container } from "../../common/ui-kit/Container/Container";
import { PacksPreloader } from "./components/PacksPreloader";
import { useDebounce } from "../../common/hooks/useDebounce";

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
    (newPage: number) => {
      dispatch(packsAC.setCurrentPage({ page: newPage }));
      setSearchParams({ ...params, page: `${newPage}` });
    },
    [params, packsAC.setCurrentPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (value: string) => {
      dispatch(packsAC.setPageCount({ pageCount: +value }));
      setSearchParams({ ...params, pageCount: value });
    },
    [params, packsAC.setPageCount]
  );

  const removePack = useCallback((id: string) => {
    dispatch(removePackTC(id));
  }, []);

  const setSearchQueryParams = useCallback(
    useDebounce(
      (value: string) => setSearchParams({ ...params, packName: value }),
      1000
    ),
    [setSearchParams, useDebounce]
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
    [params, packsAC.setPreferencePacks, setSearchParams]
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

  const optDebounce = useCallback(
    useDebounce((valueRange: number[]) => {
      setSearchParams({
        ...params,
        min: valueRange[0].toString(),
        max: valueRange[1].toString(),
      });
      // console.log("setted");
    }, 1000),
    [params]
  );

  const changeRangeHandler = useCallback(
    (valueRange: number[]) => {
      optDebounce(valueRange);
    },
    [packsAC.setRangeValue, optDebounce, params]
  );

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
            minCardsCount={minCardsCount}
            maxCardsCount={maxCardsCount}
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
  );
};

export default Packs;
