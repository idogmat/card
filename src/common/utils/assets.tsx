import {
  ArrowDropDown,
  ArrowDropUp,
  HorizontalRule,
} from "@mui/icons-material";
import React from "react";

export const avatarPlaceholder =
  "https://i0.wp.com/boingboing.net/wp-content/uploads/2020/06/IMG_20200602_082003_707.jpg?fit=1&resize=620%2C4000&ssl=1";

export const getSortIcon = (isAsc: boolean) =>
  isAsc ? <ArrowDropDown /> : <ArrowDropUp />;
