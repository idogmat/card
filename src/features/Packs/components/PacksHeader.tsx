import React, { FC } from "react";
import { Search } from "../../../common/components/Search/Search";
import FormControl from "@mui/material/FormControl/FormControl";
import { useAppDispatch } from "../../../common/hooks";
import { packsModalsAC } from "../packsModalsSlice";
import RangeSlider from "../../../common/components/RangeSlider/RangeSlider";
import { IParams } from "../packsThunks";
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
  minCardsCount: number;
  maxCardsCount: number;
  max: number | string;
  min: number | string;
  changeRangeHandler: (valueRange: number[], params: any) => void;
  params: IParams;
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
    params,
  }) => {
    const dispatch = useAppDispatch();
    const modalAddPack = () =>
      dispatch(packsModalsAC.setAddPackState({ status: true }));
    return (
      <Flex justify={"space-between"}>
        <Search
          topPosition={"30px"}
          searchValue={packName}
          searchChangeHandler={changeSearchHandler}
          endItem={<MdOutlineSearch />}
        />
        <FormControl
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "auto 1rem",
          }}
        >
          <MyPackButton
            style={{ margin: "auto 1rem" }}
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
        </FormControl>

        <RangeSlider
          max={max}
          min={min}
          minCardsCount={minCardsCount}
          maxCardsCount={maxCardsCount}
          onChangeSlider={changeRangeHandler}
          params={params}
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
          style={{ margin: "auto 0" }}
        >
          <IoTrashBin />
        </Button>
      </Flex>
    );
  }
);

export default PacksHeader;
