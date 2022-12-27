import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BackTo } from "../../common/components/BackTo/BackTo";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  addCardTC,
  deleteCardTC,
  getCardsTC,
  updateCardTC,
} from "./cardsThunks";
import { IAddCardRequest, IGetCardsRequest } from "./cardsAPI";
import { useAllSelector, useAppDispatch } from "../../common/hooks";
import { cardsStateSelector } from "./selectors";
import {
  DeleteOutline,
  Edit,
  KeyboardArrowDownOutlined,
  MoreHoriz,
  School,
} from "@mui/icons-material";
import { userStateSelector } from "../User/selectors";
import { CardsTable } from "./CardsTable";
import { CardsAC } from "./cardsSlice";
import { Search } from "../../common/components/Search/Search";
import { appStateSelect } from "../../app/selectors";
import { Preloader } from "../../common/components/Preloader/Preloader";
import styles from "../../common/styles/common.module.css";

export const Cards = () => {
  const { packID } = useParams();
  const dispatch = useAppDispatch();
  const user = useAllSelector(userStateSelector);
  const { isLoading } = useAllSelector(appStateSelect);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cards, packUserId, cardsTotalCount, page, pageCount } =
    useAllSelector(cardsStateSelector);

  let timer: number;
  const handleSearchRequestChange = (value: string) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchRequest(value);
    }, 500);
  };

  const [searchRequest, setSearchRequest] = useState("");
  const [sort, setSort] = useState({ direction: 0, field: "updated" });
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const isPackMine = user._id === packUserId;
  const totalPages = Math.ceil(cardsTotalCount / +pageCount);
  const params = Object.fromEntries(searchParams);
  const isMenuOpen = !!menuAnchor;

  useEffect(() => {
    setSearchParams({
      currentPage: page.toString(),
      showPerPage: pageCount.toString(),
      search: searchRequest,
      sortCards: sort.field ? `${sort.direction}${sort.field}` : "0updated",
    });
  }, [sort, pageCount, page, searchRequest, setSearchParams]);

  useEffect(() => {
    const model = {
      cardsPack_id: packID,
      pageCount: params.showPerPage || pageCount,
      page: params.currentPage || page,
      cardQuestion: params.search || searchRequest,
      sortCards: sort.field ? `${sort.direction}${sort.field}` : "0updated",
    } as IGetCardsRequest;
    dispatch(getCardsTC(model));
  }, [searchParams]);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const changeShowPerPage = (event: SelectChangeEvent) => {
    const rowsPerPage = +event.target.value;
    const existingPages = cardsTotalCount / rowsPerPage;
    if (Math.ceil(existingPages) < totalPages) {
      dispatch(CardsAC.setPage({ page: Math.floor(existingPages) }));
    }
    dispatch(CardsAC.setPageCount({ showPerPage: rowsPerPage }));
  };

  const changePageHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(CardsAC.setPage({ page: value }));
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

  const updateCardHandler = (cardID: string) => {
    const mockQuestion = "new question";
    const model = { card: { _id: cardID, question: mockQuestion } };
    dispatch(updateCardTC(packID ? packID : "", model));
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
          <BackTo title={"Back to packs"} route={"/packs"} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Typography
            variant={"h3"}
            component={"h3"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            Name placeholder
            {isPackMine && (
              <>
                <IconButton onClick={openMenu}>
                  <MoreHoriz />
                </IconButton>
                <Menu
                  open={isMenuOpen}
                  onClose={closeMenu}
                  anchorEl={menuAnchor}
                  sx={{
                    "& .menu-text-icon": {
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    },
                  }}
                >
                  <MenuItem>
                    <Typography className={"menu-text-icon"}>
                      <Edit />
                      Edit
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography className={"menu-text-icon"}>
                      <DeleteOutline />
                      Delete
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography className={"menu-text-icon"}>
                      <School />
                      Learn
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Typography>
          {isPackMine && (
            <Button
              sx={{ borderRadius: "24px" }}
              variant={"contained"}
              onClick={addNewCardHandler}
            >
              Add new card
            </Button>
          )}
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Search onChangeCb={handleSearchRequestChange} />
        </Box>
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
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Pagination
                color={"primary"}
                variant={"outlined"}
                shape={"rounded"}
                count={totalPages}
                page={page}
                onChange={changePageHandler}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography>Show</Typography>
                <Select
                  value={pageCount.toString()}
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
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant={"h2"} component={"h2"}>
              Empty
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
