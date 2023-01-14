import React from "react";

import svg from "../../assets/img/mail.svg";

import { useNavigate } from "react-router-dom";
import { Flex } from "../../common/ui-kit/Flex/Flex";
import { Typography } from "../../common/ui-kit/Text/Typography";
import { Button } from "../../common/ui-kit/Button/Button";
interface ICheckMail {
  email: string;
}
const CheckMail: React.FC<ICheckMail> = React.memo(({ email }) => {
  const navigate = useNavigate();
  return (
    <Flex justify={"center"} fDirection={"column"} sx={{ paddingTop: "8rem" }}>
      <Flex
        fDirection={"column"}
        sx={{
          padding: "35px",
          borderRadius: "5px",
          boxShadow: "black 0px 0px 1px 1px",
        }}
      >
        <Typography
          variant={"title"}
          sx={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Check Email
        </Typography>
        <img
          style={{ width: "30%", margin: "auto" }}
          src={svg}
          alt="checkMail"
        />
        <Typography
          style={{ marginBottom: "1rem" }}
          sx={{ textAlign: "center", marginBottom: "1rem" }}
        >
          <p style={{ opacity: ".7" }}>
            We’ve sent an Email with instructions to {email}
          </p>
        </Typography>
        <Button
          onClick={() => navigate("/login")}
          sx={{ borderRadius: "30px", marginBottom: "30px" }}
        >
          Back to login
        </Button>
      </Flex>
    </Flex>
  );
});

export default CheckMail;
