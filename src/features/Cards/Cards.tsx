import { Box, SelectChangeEvent, debounce } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  cardsCardQuestionSelector,
  cardsCardsSelector,
  cardsCurrentPageSelector,
  cardsPackOwnerSelector,
  cardsShowPerPageSelector,
  cardsTotalCountSelector,
} from "./selectors";
import { useAllSelector, useAppDispatch } from "common/hooks";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { BackTo } from "common/components/BackTo/BackTo";
import { CardsAC } from "./cardsSlice";
import CardsHeader from "./components/CardsHeader";
import { CardsModals } from "./components/modals/CardsModals";
import { CardsTable } from "./components/CardsTable";
import { IGetCardsRequest } from "./cardsAPI";
import { IPackResponse } from "./../Packs/packsAPI";
import { NotFoundElements } from "common/components/NotFoundElements/NotFoundElements";
import { Preloader } from "common/components/Preloader/Preloader";
import { TablePagination } from "common/components/TablePagination/TablePagination";
import { appStateSelect } from "app/selectors";
import { getCardsTC } from "./cardsThunks";
import { selectOptions } from "./Cards.data";
import styles from "common/styles/common.module.css";
import { userStateSelector } from "../User/selectors";

// Types
export interface IFieldSort {
  direction: number;
  field: string;
}

export const Cards = React.memo(() => {
  // Selectors
  const dispatch = useAppDispatch();
  const user = useAllSelector(userStateSelector);
  const { isLoading } = useAllSelector(appStateSelect);

  const cards = useAllSelector(cardsCardsSelector);
  const packUserId = useAllSelector(cardsPackOwnerSelector);
  const cardsTotalCount = useAllSelector(cardsTotalCountSelector);
  const page = useAllSelector(cardsCurrentPageSelector);
  const pageCount = useAllSelector(cardsShowPerPageSelector);
  const cardQuestion = useAllSelector(cardsCardQuestionSelector);

  // Url & Query
  // const { packID } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useLocation();
  const previousURL = state ? state.previousURL : "";
  const pack: IPackResponse = state ? state.pack : {};
  const params = Object.fromEntries(searchParams);
  console.log(pack);

  // Local states
  const defaultSort = { direction: 0, field: "updated" };
  const [sort, setSort] = useState<IFieldSort>(defaultSort);

  // Utils
  const isPackMine = useMemo(
    () => user._id === packUserId,
    [user._id, packUserId]
  );
  const cardsSort = sort.field ? `${sort.direction}${sort.field}` : "0updated";
  const totalPages = useMemo(
    () => Math.ceil(cardsTotalCount / +pageCount),
    [pageCount, cardsTotalCount]
  );
  const isPageCountValid = selectOptions.some(
    (option) => option.value === +params.showPerPage
  );

  useEffect(() => {
    const model = {
      cardsPack_id: pack._id,
      pageCount: isPageCountValid ? params.showPerPage : pageCount,
      page: params.currentPage || page,
      cardQuestion: params.search || cardQuestion,
      sortCards: params.sortCards || cardsSort,
    } as IGetCardsRequest;

    dispatch(getCardsTC(model));
  }, [searchParams]);

  const changeShowPerPage = useCallback(
    (event: SelectChangeEvent) => {
      const rowsPerPage = +event.target.value;
      const existingPages = cardsTotalCount / rowsPerPage;
      const lastPage = Math.ceil(existingPages);
      if (lastPage < totalPages && page >= lastPage) {
        dispatch(CardsAC.setPage({ page: lastPage }));
        setSearchParams({
          ...params,
          currentPage: lastPage.toString(),
          showPerPage: rowsPerPage.toString(),
        });
      } else {
        setSearchParams({ ...params, showPerPage: rowsPerPage.toString() });
      }
      dispatch(CardsAC.setPageCount({ showPerPage: rowsPerPage }));
    },
    [cardsTotalCount, totalPages, page, params.showPerPage]
  );

  const changePageHandler = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(CardsAC.setPage({ page: value }));
      setSearchParams({ ...params, currentPage: value.toString() });
    },
    [dispatch, setSearchParams]
  );

  const setSearchRequestToQuery = useCallback(
    debounce((value: string) => {
      setSearchParams({ ...params, search: value });
    }, 700),
    []
  );

  const changeSearchRequestHandler = useCallback(
    (value: string) => {
      dispatch(CardsAC.setCardQuestion({ value }));
      setSearchRequestToQuery(value);
    },
    [dispatch, setSearchRequestToQuery]
  );

  const handleChangeSort = useCallback(
    (value: IFieldSort) => {
      setSort(value);
      setSearchParams({
        ...params,
        sortCards: `${value.direction}${value.field}`,
      });
    },
    [params, setSearchParams]
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: "100px",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {isLoading && (
          <div className={styles.preventSending}>
            <Preloader />
          </div>
        )}
        <BackTo title={"Back to packs"} route={`/packs?${previousURL}`} />
        <CardsHeader
          isPackMine={isPackMine}
          pack={pack}
          setSearchRequest={changeSearchRequestHandler}
          searchValue={cardQuestion || ""}
          previousURL={previousURL}
        />
        {cards.length > 0 ? (
          <>
            <Box sx={{ marginBottom: 3 }}>
              <CardsTable
                cards={cards}
                isPackMine={isPackMine}
                sort={sort}
                setSort={handleChangeSort}
                isLoading={isLoading}
              />
            </Box>
            <TablePagination
              title={"Cards"}
              totalPages={totalPages}
              elementsPerPage={pageCount}
              changePageHandler={changePageHandler}
              changeElementsPerPage={changeShowPerPage}
              currentPage={page}
              selectOptions={selectOptions}
            />
          </>
        ) : (
          <NotFoundElements title={"Empty"} />
        )}
        <CardsModals pack={pack} />
      </Box>
    </Box>
  );
});
