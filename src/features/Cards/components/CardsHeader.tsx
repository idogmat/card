import { CardBanner, CardTitle, CardsHeaderWrapper } from "../CardsStyles";
import { DeleteOutline, Edit, MoreHoriz, School } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { FC, useState } from "react";

import { Button } from "common/ui-kit/Button/Button";
import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { Flex } from "common/ui-kit/Flex/Flex";
import { IPackResponse } from "./../../Packs/packsAPI";
import { NavLink } from "react-router-dom";
import { Search } from "../../../common/components/Search/Search";
import { packsModalsAC } from "./../../Packs/packsModalsSlice";
import { useAppDispatch } from "common/hooks";

interface ICardsHeaderProps {
  isPackMine: boolean;
  setSearchRequest: (value: string) => void;
  pack: IPackResponse;
  searchValue: string;
  previousURL: string;
}

const CardsHeader: FC<ICardsHeaderProps> = React.memo(
  ({ pack, isPackMine, setSearchRequest, searchValue, previousURL }) => {
    // Dispatch & selectors
    const dispatch = useAppDispatch();

    // Local States & Vars
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const isMenuOpen = !!menuAnchor;

    // Utils
    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
      setMenuAnchor(e.currentTarget);
    };

    const closeMenu = () => {
      setMenuAnchor(null);
    };

    const openAddNewCardModal = () => {
      dispatch(CardsModalsAC.setAddCardState({ state: true }));
    };

    const openEditPackModal = () => {
      dispatch(packsModalsAC.setUpdatePackState({ status: true, pack }));
    };

    const openDeletePackModal = () => {
      dispatch(packsModalsAC.setDeletePackState({ status: true, pack }));
    };

    return (
      <>
        <CardsHeaderWrapper>
          <CardTitle>
            {pack.name}
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
                    <Typography
                      className={"menu-text-icon"}
                      onClick={openEditPackModal}
                    >
                      <Edit />
                      Edit
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      className={"menu-text-icon"}
                      onClick={openDeletePackModal}
                    >
                      <DeleteOutline />
                      Delete
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography className={"menu-text-icon"}>
                      <NavLink
                        to={`/learn/${pack._id}`}
                        state={{ previousURL: previousURL, pack }}
                      >
                        <School />
                        Learn
                      </NavLink>
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </CardTitle>
          {pack.deckCover && <CardBanner src={pack.deckCover} alt="" />}
          {isPackMine && (
            <Button onClick={openAddNewCardModal}>Add new card</Button>
          )}
        </CardsHeaderWrapper>
        <Flex sx={{ marginBottom: "1.25rem" }}>
          <Search
            searchChangeHandler={setSearchRequest}
            searchValue={searchValue}
          />
        </Flex>
      </>
    );
  }
);

export default CardsHeader;
