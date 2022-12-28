import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { BackTo } from "../../common/components/BackTo/BackTo";
import { Box, debounce, SelectChangeEvent } from "@mui/material";
import { deleteCardTC, getCardsTC, updateCardTC } from "./cardsThunks";
import { IGetCardsRequest } from "./cardsAPI";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { cardsStateSelector } from "./selectors";
import { userStateSelector } from "../User/selectors";
import { CardsTable } from "./CardsTable";
import { CardsAC } from "./cardsSlice";
import { appStateSelect } from "../../app/selectors";
import { Preloader } from "../../common/components/Preloader/Preloader";
import styles from "../../common/styles/common.module.css";
import CardsHeader from "./CardsHeader";
import { TablePagination } from "./TablePagination";
import { NotFoundElements } from "../../common/components/NotFoundElements/NotFoundElements";
import { selectOptions } from "./Cards.data";

export interface IFieldSort {
  direction: number;
  field: string;
}

export const Cards = () => {
  // Selectors
  const dispatch = useAppDispatch();
  const user = useAllSelector(userStateSelector);
  const { isLoading } = useAllSelector(appStateSelect);
  const { cards, packUserId, cardsTotalCount, page, pageCount } =
    useAllSelector(cardsStateSelector);

  // Url & Query
  const { packID } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useLocation();
  const previousURL = state ? state.previousURL : null;
  const packName = state ? state.packName : null;
  const params = Object.fromEntries(searchParams);

  // Local states
  const [searchRequest, setSearchRequest] = useState(params.search || "");
  const [sort, setSort] = useState<IFieldSort>({
    direction: 0,
    field: "updated",
  });

  // Utils
  const isPackMine = user._id === packUserId;
  const totalPages = Math.ceil(cardsTotalCount / +pageCount);
  useEffect(() => {
    const isPageCountValid = selectOptions.some((option) => {
      return option.value === +params.showPerPage;
    });
    console.log(isPageCountValid);
    const model = {
      cardsPack_id: packID,
      pageCount: isPageCountValid ? params.showPerPage : pageCount,
      page: params.currentPage || page,
      cardQuestion: params.search || searchRequest,
      sortCards: sort.field ? `${sort.direction}${sort.field}` : "0updated",
    } as IGetCardsRequest;
    dispatch(getCardsTC(model));
  }, [searchParams]);

  const changeShowPerPage = (event: SelectChangeEvent) => {
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
  };

  const changePageHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(CardsAC.setPage({ page: value }));
    setSearchParams({ ...params, currentPage: value.toString() });
  };

  const deleteCardHandler = (cardID: string) => {
    dispatch(deleteCardTC(cardID, packID ? packID : ""));
  };

  const updateCardHandler = (cardID: string) => {
    const mockQuestion = "new question";
    const model = { card: { _id: cardID, question: mockQuestion } };
    dispatch(updateCardTC(packID ? packID : "", model));
  };

  const setSearchRequestToQuery = useCallback(
    debounce((value: string) => {
      setSearchParams({ ...params, search: value });
    }, 200),
    []
  );

  const changeSearchRequestHandler = (value: string) => {
    setSearchRequest(value);
    setSearchRequestToQuery(value);
  };

  const handleChangeSort = (value: IFieldSort) => {
    setSort(value);
    setSearchParams({
      ...params,
      sortCards: `${value.direction}${value.field}`,
    });
  };

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
        <Box sx={{ marginBottom: 5 }}>
          <BackTo title={"Back to packs"} route={previousURL} />
        </Box>
        <CardsHeader
          isPackMine={isPackMine}
          packID={packID ? packID : ""}
          setSearchRequest={changeSearchRequestHandler}
          packName={packName}
          searchValue={searchRequest}
        />
        {cards.length > 0 ? (
          <>
            <Box sx={{ marginBottom: 3 }}>
              <CardsTable
                cards={cards}
                isPackMine={isPackMine}
                deleteCardHandler={deleteCardHandler}
                updateCardHandler={updateCardHandler}
                sort={sort}
                setSort={handleChangeSort}
              />
            </Box>
            <TablePagination
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
      </Box>
    </Box>
  );
};
