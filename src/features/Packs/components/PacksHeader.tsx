import React, { FC } from "react";

import { useAppDispatch } from "../../../common/hooks";
import { packsModalsAC } from "../packsModalsSlice";
import RangeSlider from "../../../common/components/RangeSlider/RangeSlider";
import { Button } from "../../../common/ui-kit/Button/Button";
import { MyPackButton } from "../PacksStyle";
import { Flex } from "../../../common/ui-kit/Flex/Flex";
import { IoTrashBin } from "react-icons/io5";
import { Search } from "../../../common/ui-kit/Search/Search";

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
      <Flex
        justify={"space-between"}
        fWrap={"wrap"}
        sx={{ gap: "1rem", marginBottom: ".6rem" }}
      >
        <Search value={packName} onChange={changeSearchHandler} btnDisabled />
        <Flex align={"center"} sx={{ gap: "1rem" }}>
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
        <Button onClick={modalAddPack}>Add new Pack</Button>
        <Button semantic onClick={() => removeSort()}>
          <IoTrashBin />
        </Button>
      </Flex>
    );
  }
);

export default PacksHeader;
