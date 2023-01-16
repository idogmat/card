import React, { FC } from "react";
import { Box, Container, Toolbar } from "@mui/material";
import { Search } from "../../../common/components/Search/Search";
import FormControl from "@mui/material/FormControl/FormControl";
import Button from "@mui/material/Button/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppDispatch } from "../../../common/hooks";
import { packsModalsAC } from "../packsModalsSlice";
import RangeSlider from "../../../common/components/RangeSlider/RangeSlider";
<<<<<<< HEAD
import { Button } from "../../../common/ui-kit/Button/Button";
import { MyPackButton } from "../PacksStyle";
import { MdOutlineSearch } from "react-icons/md";
import { Flex } from "../../../common/ui-kit/Flex/Flex";
import { IoTrashBin } from "react-icons/io5";
=======
>>>>>>> dev

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
<<<<<<< HEAD
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
=======
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0",
          }}
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0",
            }}
>>>>>>> dev
          >
            <Search
              searchValue={packName}
              searchChangeHandler={changeSearchHandler}
            />
            <FormControl
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "auto 1rem",
              }}
            >
              <Button
                style={{ margin: "auto 1rem" }}
                variant={isMyPack ? "contained" : "outlined"}
                onClick={() => handlerIsMyPack(true)}
              >
                My
              </Button>
              <Button
                variant={!isMyPack ? "contained" : "outlined"}
                onClick={() => handlerIsMyPack(false)}
              >
                All
              </Button>
            </FormControl>

<<<<<<< HEAD
        <RangeSlider
          max={max}
          min={min}
          minCardsCount={minCardsCount}
          maxCardsCount={maxCardsCount}
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
=======
            <RangeSlider
              max={max}
              min={min}
              minCardsCount={minCardsCount}
              maxCardsCount={maxCardsCount}
              onChangeSlider={changeRangeHandler}
            />
            <Button variant="contained" onClick={modalAddPack}>
              Add new Pack
            </Button>
            <Button onClick={() => removeSort()} style={{ margin: "auto 0" }}>
              <DeleteForeverIcon />
            </Button>
          </Container>
        </Toolbar>
      </Box>
>>>>>>> dev
    );
  }
);

export default PacksHeader;
