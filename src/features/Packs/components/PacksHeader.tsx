import React, { FC } from "react";
import { Box, Container, Toolbar } from "@mui/material";
import { Search } from "../../../common/components/Search/Search";
import FormControl from "@mui/material/FormControl/FormControl";
import Button from "@mui/material/Button/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppDispatch } from "../../../common/hooks";
import { packsModalsAC } from "../packsModalsSlice";
import RangeSlider from "../../../common/components/RangeSlider/RangeSlider";
import { IParams } from "../packsThunks";

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

            <RangeSlider
              max={max}
              min={min}
              minCardsCount={minCardsCount}
              maxCardsCount={maxCardsCount}
              onChangeSlider={changeRangeHandler}
              params={params}
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
    );
  }
);

export default PacksHeader;
