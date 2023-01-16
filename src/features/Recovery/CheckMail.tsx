import React from "react";
import svg from "../../assets/img/mail.svg";
import { useNavigate } from "react-router-dom";
import { Typography } from "../../common/ui-kit/Text/Typography";
import { Button } from "../../common/ui-kit/Button/Button";
import {
  RegisterContent,
  RegisterForm,
  RegisterWrapper,
} from "../Register/RegisterStyles";

interface ICheckMail {
  email: string;
}
const CheckMail: React.FC<ICheckMail> = React.memo(({ email }) => {
  const navigate = useNavigate();
  return (
    <RegisterWrapper>
      <RegisterContent>
        <RegisterForm>
          <Typography
            variant={"title"}
            sx={{ textAlign: "center", marginBottom: "0.6rem" }}
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
            sx={{ borderRadius: "30px", margin: "auto" }}
          >
            Back to login
          </Button>
        </RegisterForm>
      </RegisterContent>
    </RegisterWrapper>
  );
});

export default CheckMail;
