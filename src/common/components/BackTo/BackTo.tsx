import React, { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import styles from "./BackTo.module.css";
import { Button, Typography } from "@mui/material";
interface IBackToProps {
  title: string;
  route: string;
}

export const BackTo: FC<IBackToProps> = ({ title, route }) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(route);
  };

  return (
    <Button className={styles.link} onClick={onClickHandler}>
      <ArrowBack />
      <Typography>{title}</Typography>
    </Button>
  );
};
