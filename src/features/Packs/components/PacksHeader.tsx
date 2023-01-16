import React, { FC } from "react";
import { Search } from "../../../common/components/Search/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppDispatch } from "../../../common/hooks";
import { packsModalsAC } from "../packsModalsSlice";
import RangeSlider from "../../../common/components/RangeSlider/RangeSlider";
import { Button } from "../../../common/ui-kit/Button/Button";
import { MyPackButton } from "../PacksStyle";
import { MdOutlineSearch } from "react-icons/md";
import { Flex } from "../../../common/ui-kit/Flex/Flex";

interface IHeaderProps {
  packName: string;
  changeSearchHandler: (s: string) => void;
  isMyPack: boolean;
  handlerIsMyPack: (param: boolean) => void;
  minCardsCount: number;
  maxCardsCount: number;
  max: number | string;
  min: number | string;
  changeRangeHandler: (valueRange: number[]) => void;
  removeSort: () => void;
}

const PacksHeader: FC<IHeaderProps> = React.memo(
  ({
    removeSort,
    changeRangeHandler,
    packName,
    changeSearchHandler,
    isMyPack,
    max,
    min,
    maxCardsCount,
    minCardsCount,
    handlerIsMyPack,
  }) => {
    const dispatch = useAppDispatch();
    const modalAddPack = () =>
      dispatch(packsModalsAC.setAddPackState({ status: true }));
    return (
      <Flex justify={"space-between"} fWrap={"wrap"}>
        <Search
          searchValue={packName}
          searchChangeHandler={changeSearchHandler}
          endItem={<MdOutlineSearch />}
        />
        <Flex sx={{ gap: "1rem" }}>
          <MyPackButton
            selected={isMyPack}
            onClick={() => handlerIsMyPack(true)}
          >
            My
          </MyPackButton>
          <MyPackButton
            selected={!isMyPack}
            onClick={() => handlerIsMyPack(true)}
          >
            All
          </MyPackButton>
        </Flex>
        <RangeSlider
          max={max}
          min={min}
          minCardsCount={minCardsCount}
          maxCardsCount={maxCardsCount}
          onChangeSlider={changeRangeHandler}
        />
        <Button onClick={modalAddPack}>Add new Pack</Button>
        <Button onClick={() => removeSort()} style={{ margin: "auto 0" }}>
          <DeleteForeverIcon />
        </Button>
      </Flex>
    );
  }
);

export default PacksHeader;
