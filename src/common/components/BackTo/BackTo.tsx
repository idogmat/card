import { Button, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import React, { FC, useRef, useState } from "react";

import { ArrowBack } from "@mui/icons-material";
import styles from "./BackTo.module.css";

interface IBackToProps {
  title: string;
  route: string;
}

export const BackTo: FC<IBackToProps> = React.memo(({ title, route }) => {
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const onClickHandler = () => {
    setShouldNavigate(true);
  };

  return (
    <Button className={styles.link} onClick={onClickHandler}>
      {shouldNavigate && <Navigate to={route} />}
      <ArrowBack />
      <Typography>{title}</Typography>
    </Button>
  );
});
