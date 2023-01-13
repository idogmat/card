import React, { FC, useState } from "react";

import { BackToButton } from "./BackToStyles";
import { MdKeyboardBackspace } from "react-icons/md";
import { Navigate } from "react-router-dom";
import { Typography } from "common/ui-kit/Text/Typography";

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
    <BackToButton semantic onClick={onClickHandler}>
      {shouldNavigate && <Navigate to={route} />}
      <MdKeyboardBackspace />
      <Typography>{title}</Typography>
    </BackToButton>
  );
});
