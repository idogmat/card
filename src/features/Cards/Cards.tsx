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
import { useParams, useSearchParams } from "react-router-dom";

import { BackTo } from "common/components/BackTo/BackTo";
import { CardsAC } from "./cardsSlice";
import CardsHeader from "./components/CardsHeader";
import { CardsModals } from "./components/modals/CardsModals";
import { CardsTable } from "./components/CardsTable";
import { Container } from "common/ui-kit/Container/Container";
import { Flex } from "common/ui-kit/Flex/Flex";
import { IGetCardsRequest } from "./cardsAPI";
import { IPackResponse } from "./../Packs/packsAPI";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NotFoundElements } from "common/components/NotFoundElements/NotFoundElements";
import { Pagination } from "common/ui-kit/Pagination/Pagination";
import { appStateSelector } from "app/selectors";
import { debounce } from "@mui/material";
import { getCardsTC } from "./cardsThunks";
import { getItemFromLC } from "common/utils/localStorage";
import { selectOptions } from "./Cards.data";
import { userStateSelector } from "../User/selectors";
import { CardsPreloader } from "./CardsPreloader";

// Types
export interface IFieldSort {
  direction: number;
  field: string;
}

export interface ILocationState {
  pack: IPackResponse;
  previousURL: string;
}

export const Cards = React.memo(() => {
  // Url & Query
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { packID } = useParams();

  // Selectors
  const dispatch = useAppDispatch();

  const user = useAllSelector(userStateSelector);
  const { isLoading } = useAllSelector(appStateSelector);

  const cards = useAllSelector(cardsCardsSelector);
  const packUserId = useAllSelector(cardsPackOwnerSelector);
  const cardsTotalCount = useAllSelector(cardsTotalCountSelector);
  const page = useAllSelector(cardsCurrentPageSelector);
  const pageCount = useAllSelector(cardsShowPerPageSelector);
  const cardQuestion = useAllSelector(cardsCardQuestionSelector);

  // Vars
  const backToState = getItemFromLC("backToState");
  const previousURL = backToState?.previousURL || "packs";
  const pack =
    backToState?.pack || ({ name: "namePlaceholder" } as IPackResponse);
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
    (option) => option.selectValue === params.showPerPage
  );

  useEffect(() => {
    const model = {
      cardsPack_id: packID,
      pageCount: isPageCountValid ? params.showPerPage : pageCount,
      page: params.currentPage || page,
      cardQuestion: params.search || cardQuestion,
      sortCards: params.sortCards || cardsSort,
    } as IGetCardsRequest;

    dispatch(getCardsTC(model));
  }, [searchParams]);

  const changeShowPerPage = useCallback(
    (value: string) => {
      const rowsPerPage = +value;
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
    (value: number) => {
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
    <Container variant="sm" sx={{ paddingTop: "3.125rem" }}>
      <Flex sx={{ position: "relative" }} fDirection="column">
        <>
          <Flex justify="flex-start">
            <BackTo title={"Back to packs"} route={`/packs?${previousURL}`} />
          </Flex>
          <CardsHeader
            isPackMine={isPackMine}
            pack={pack}
            setSearchRequest={changeSearchRequestHandler}
            searchValue={cardQuestion || ""}
            previousURL={previousURL}
          />
          {isLoading ? (
            cards.length > 0 ? (
              <>
                <div style={{ marginBottom: "1.25rem" }}>
                  <CardsTable
                    cards={cards}
                    isPackMine={isPackMine}
                    sort={sort}
                    setSort={handleChangeSort}
                  />
                </div>
                <Pagination
                  selectProps={{
                    options: selectOptions,
                    selected: pageCount.toString(),
                    onChange: changeShowPerPage,
                    endIcon: <MdKeyboardArrowDown />,
                  }}
                  label="Cards"
                  changePage={changePageHandler}
                  currentPage={page}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NotFoundElements title={"Empty"} />
            )
          ) : (
            <CardsPreloader />
          )}

          <CardsModals pack={pack} />
        </>
      </Flex>
    </Container>
  );
});
