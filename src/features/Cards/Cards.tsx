import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BackTo } from "../../common/components/BackTo/BackTo";
import { Box, SelectChangeEvent } from "@mui/material";
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

export const Cards = () => {
  const { packID } = useParams();
  const dispatch = useAppDispatch();
  const user = useAllSelector(userStateSelector);
  const { isLoading } = useAllSelector(appStateSelect);
  const { cards, packUserId, cardsTotalCount, page, pageCount } =
    useAllSelector(cardsStateSelector);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchRequest, setSearchRequest] = useState("");
  const [sort, setSort] = useState({ direction: 0, field: "updated" });

  const isPackMine = user._id === packUserId;
  const totalPages = Math.ceil(cardsTotalCount / +pageCount);
  const params = Object.fromEntries(searchParams);
  const isParamsSet = Object.keys(params).length > 0;

  useEffect(() => {
    setSearchParams({
      currentPage: page.toString(),
      showPerPage: pageCount.toString(),
      search: searchRequest,
      sortCards: sort.field ? `${sort.direction}${sort.field}` : "0updated",
    });
  }, []);

  useEffect(() => {
    const model = {
      cardsPack_id: packID,
      pageCount: params.showPerPage || pageCount,
      page: params.currentPage || page,
      cardQuestion: params.search || searchRequest,
      sortCards: sort.field ? `${sort.direction}${sort.field}` : "0updated",
    } as IGetCardsRequest;
    isParamsSet && dispatch(getCardsTC(model));
  }, [params.showPerPage, params.currentPage, params.search]);

  const changeShowPerPage = (event: SelectChangeEvent) => {
    const rowsPerPage = +event.target.value;
    const existingPages = cardsTotalCount / rowsPerPage;
    if (Math.ceil(existingPages) < totalPages) {
      dispatch(CardsAC.setPage({ page: Math.floor(existingPages) }));
    }
    dispatch(CardsAC.setPageCount({ showPerPage: rowsPerPage }));
    setSearchParams({ ...params, showPerPage: rowsPerPage.toString() });
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

  const changeSearchRequestHandler = (value: string) => {
    setSearchParams({ ...params, search: value });
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
          <BackTo title={"Back to packs"} route={""} />
        </Box>
        <CardsHeader
          isPackMine={isPackMine}
          packID={packID ? packID : ""}
          setSearchRequest={changeSearchRequestHandler}
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
                setSort={setSort}
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
