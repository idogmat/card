import {
  CardBanner,
  CardTitle,
  CardsHeaderInfo,
  CardsHeaderWrapper,
} from "../CardsStyles";
import React, { FC } from "react";

import { Button } from "common/ui-kit/Button/Button";
import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { CardsPackMenu } from "../CardsPackMenu";
import { Flex } from "common/ui-kit/Flex/Flex";
import { IPackResponse } from "./../../Packs/packsAPI";
import { MdMoreHoriz } from "react-icons/md";
import { Search } from "../../../common/components/Search/Search";
import { useAppDispatch } from "common/hooks";
import { useComponentVisible } from "common/hooks/isComponentVisible";

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
    const { ref, isComponentVisible, setIsComponentVisible } =
      useComponentVisible(false);

    // Utils
    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("opening menu", isComponentVisible);
      setIsComponentVisible(true);
    };

    const openAddNewCardModal = () => {
      dispatch(CardsModalsAC.setAddCardState({ state: true }));
    };

    return (
      <>
        <CardsHeaderWrapper>
          <CardsHeaderInfo>
            <CardTitle>{pack.name}</CardTitle>
            {isPackMine && (
              <>
                <Button ref={ref} onClick={openMenu} semantic>
                  <MdMoreHoriz fontSize={"1.25rem"} />
                </Button>
                <CardsPackMenu
                  open={isComponentVisible}
                  posSettings={{ bottom: "0", right: "0" }}
                  pack={pack}
                />
              </>
            )}
          </CardsHeaderInfo>
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
