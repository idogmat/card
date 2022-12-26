import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackTo } from "../../common/components/BackTo/BackTo";
import {
  Box,
  Button,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { addCardTC, deleteCardTC, getCardsTC } from "./cardsThunks";
import { IAddCardRequest, IGetCardsRequest } from "./cardsAPI";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { cardsStateSelector } from "./selectors";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { userStateSelector } from "../User/selectors";
import { CardsTable } from "./CardsTable";
import { CardsAC } from "./cardsSlice";

export const Cards = () => {
  const { packID } = useParams();
  const dispatch = useAppDispatch();
  const user = useAllSelector(userStateSelector);
  const { cards, packUserId, cardsTotalCount, page } =
    useAllSelector(cardsStateSelector);

  const [showPerPage, setShowPerPage] = useState("4");

  const isPackMine = user._id === packUserId;
  const pageCount = Math.ceil(cardsTotalCount / +showPerPage);
  console.log(pageCount);

  useEffect(() => {
    const model = {
      cardsPack_id: packID,
      pageCount: showPerPage,
      page,
    } as IGetCardsRequest;
    dispatch(getCardsTC(model));
  }, [showPerPage, page]);

  const changeShowPerPage = (event: SelectChangeEvent) => {
    setShowPerPage(event.target.value);
  };

  const addNewCardHandler = () => {
    const mockCard: IAddCardRequest = {
      card: {
        cardsPack_id: packID ? packID : "",
        answer: "answer placeholder",
        question: "question placeholder",
      },
    };
    dispatch(addCardTC(mockCard));
  };

  const deleteCardHandler = (cardID: string) => {
    dispatch(deleteCardTC(cardID, packID ? packID : ""));
  };

  const changePageHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(CardsAC.setPage({ page: value }));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: 5 }}>
        <BackTo title={"Back to packs"} route={"/packs"} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItem: "center",
        }}
      >
        <Typography>Name placeholder</Typography>
        <Button
          sx={{ borderRadius: "24px", marginBottom: 5 }}
          variant={"contained"}
          onClick={addNewCardHandler}
        >
          Add new card
        </Button>
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <CardsTable
          cards={cards}
          isPackMine={isPackMine}
          deleteCardHandler={deleteCardHandler}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Pagination
          color={"primary"}
          variant={"outlined"}
          shape={"rounded"}
          count={pageCount}
          page={page}
          onChange={changePageHandler}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography>Show</Typography>
          <Select
            value={showPerPage}
            onChange={changeShowPerPage}
            sx={{ padding: "0", height: 20 }}
            IconComponent={() => <KeyboardArrowDownOutlined />}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
          <Typography>Cards per page</Typography>
        </Box>
      </Box>
    </Box>
  );
};
