import React, { FC } from "react";

import { Flex } from "common/ui-kit/Flex/Flex";
import { Typography } from "common/ui-kit/Text/Typography";

interface INotFoundElementsProps {
  title: string;
}

export const NotFoundElements: FC<INotFoundElementsProps> = React.memo(
  ({ title }) => {
    return (
      <Flex justify="center" align="center">
        <Typography variant={"title"} as="h2" sx={{ fontSize: "2.2rem" }}>
          {title}
        </Typography>
      </Flex>
    );
  }
);
