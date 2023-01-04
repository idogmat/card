import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { DeleteOutline, Edit, MoreHoriz, School } from "@mui/icons-material";
import React, { FC, useState } from "react";

import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { IPackResponse } from "./../../Packs/packsAPI";
import { NavLink } from "react-router-dom";
import { Search } from "../../../common/components/Search/Search";
import { packsModalsAC } from "./../../Packs/packsModalsSlice";
import { useAppDispatch } from "common/hooks";
import PacksModals from "../../Packs/components/modals/PacksModals";

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

    const openAddNewCardModal = () =>
      dispatch(CardsModalsAC.setAddCardState({ state: true }));

    const openEditPackModal = () => {
      dispatch(packsModalsAC.setUpdatePackState({ status: true, pack }));
    };

    const openDeletePackModal = () => {
      dispatch(packsModalsAC.setDeletePackState({ status: true, pack }));
    };

    console.log("PREVIOUS URL IN HEADER", previousURL);

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
            sx={{ display: "flex", alignItems: "center", maxWidth: "100%" }}
          >
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
          </Typography>
          {isPackMine && (
            <Button
              sx={{ borderRadius: "24px" }}
              variant={"contained"}
              onClick={openAddNewCardModal}
            >
              Add new card
            </Button>
          )}
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Search
            searchChangeHandler={setSearchRequest}
            searchValue={searchValue}
          />
        </Box>
      </>
    );
  }
);

export default CardsHeader;
