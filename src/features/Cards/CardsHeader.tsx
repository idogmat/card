import React, { FC, useCallback, useState } from "react";
import {
  Box,
  Button,
  debounce,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { DeleteOutline, Edit, MoreHoriz, School } from "@mui/icons-material";
import { Search } from "../../common/components/Search/Search";
import { useAppDispatch } from "../../common/hooks";
import { IAddCardRequest } from "./cardsAPI";
import { addCardTC } from "./cardsThunks";

interface ICardsHeaderProps {
  packID: string;
  isPackMine: boolean;
  setSearchRequest: (value: string) => void;
}

const CardsHeader: FC<ICardsHeaderProps> = ({
  packID,
  isPackMine,
  setSearchRequest,
}) => {
  const dispatch = useAppDispatch();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const isMenuOpen = !!menuAnchor;

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
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

  const searchRequestChangeHandler = (value: string) => {
    setSearchRequest(value);
  };
  const handleSearchRequestChange = useCallback(
    debounce(searchRequestChangeHandler, 500),
    []
  );

  return (
    <>
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
    </>
  );
};

export default CardsHeader;
