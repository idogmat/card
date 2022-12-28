import React, { FC, useEffect } from "react";
import { Box, Container, Toolbar } from "@mui/material";
import { Search } from "../../common/components/Search/Search";
import FormControl from "@mui/material/FormControl/FormControl";
import Button from "@mui/material/Button/Button";
import SuperRange from "./SuperRange";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
interface IHeaderProps {
  packName: string;
  changeSearchHandler: (s: string) => void;
  isMyPack: boolean;
  handlerIsMyPack: (param: "my" | "all") => void;
  cardPacksTotalCount: number;
  max: number | string;
  min: number | string;
  addPackMode: boolean;
  changeRangeHandler: (valueRange: number[]) => void;
  setAddPackMode: (b: boolean) => void;
  removeSort: () => void;
}
const PacksHeader: FC<IHeaderProps> = ({
  removeSort,
  setAddPackMode,
  changeRangeHandler,
  packName,
  changeSearchHandler,
  isMyPack,
  max,
  min,
  cardPacksTotalCount,
  handlerIsMyPack,
  addPackMode,
}) => {
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
              onClick={() => handlerIsMyPack("my")}
            >
              My
            </Button>
            <Button
              variant={!isMyPack ? "contained" : "outlined"}
              onClick={() => handlerIsMyPack("all")}
            >
              All
            </Button>
          </FormControl>

          <SuperRange
            max={max}
            min={min}
            maxPacks={cardPacksTotalCount}
            onChangeSlider={changeRangeHandler}
          />
          <Button
            variant="contained"
            onClick={() => setAddPackMode(!addPackMode)}
          >
            Add new Pack
          </Button>
          <Button onClick={() => removeSort()} style={{ margin: "auto 0" }}>
            <DeleteForeverIcon />
          </Button>
        </Container>
      </Toolbar>
    </Box>
  );
};

export default PacksHeader;
