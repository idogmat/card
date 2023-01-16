import React, { FC } from "react";
import { Search } from "../../../common/components/Search/Search";
import { useAppDispatch } from "../../../common/hooks";
import { packsModalsAC } from "../packsModalsSlice";
import RangeSlider from "../../../common/components/RangeSlider/RangeSlider";
import { Button } from "../../../common/ui-kit/Button/Button";
import { MyPackButton } from "../PacksStyle";
import { MdOutlineSearch } from "react-icons/md";
import { Flex } from "../../../common/ui-kit/Flex/Flex";
import { IoTrashBin } from "react-icons/io5";

interface IHeaderProps {
  packName: string;
  changeSearchHandler: (s: string) => void;
  isMyPack: boolean;
  handlerIsMyPack: (param: boolean) => void;
  max: number | string;
  min: number | string;
  minCardsCount: number;
  maxCardsCount: number;
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
    handlerIsMyPack,
    minCardsCount,
    maxCardsCount,
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
            onClick={() => handlerIsMyPack(false)}
          >
            All
          </MyPackButton>
        </Flex>

        <RangeSlider
          minCardsCount={minCardsCount}
          maxCardsCount={maxCardsCount}
          max={max}
          min={min}
          onChangeSlider={changeRangeHandler}
        />
        <Button
          style={{ padding: "0px 5px", margin: "20px 0px" }}
          onClick={modalAddPack}
        >
          Add new Pack
        </Button>
        <Button
          semantic
          onClick={() => removeSort()}
          style={{ margin: "20px 0", padding: "10px 5px" }}
        >
          <IoTrashBin />
        </Button>
      </Flex>
    );
  }
);

export default PacksHeader;
