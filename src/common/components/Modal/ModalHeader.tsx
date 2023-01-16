import { MdClose } from "react-icons/md";
import { FC } from "react";
import { Flex } from "common/ui-kit/Flex/Flex";
import { Button } from "common/ui-kit/Button/Button";
import { Typography } from "common/ui-kit/Text/Typography";

interface IModalHeaderProps {
  title: string;
  handleClose: () => void;
}

export const ModalHeader: FC<IModalHeaderProps> = ({ title, handleClose }) => {
  return (
    <Flex justify="space-between" sx={{ gap: "0.6rem" }}>
      <Typography variant={"title"} as="h3">
        {title}
      </Typography>
      <Button semantic onClick={handleClose}>
        <MdClose />
      </Button>
    </Flex>
  );
};
