import React, { FC } from "react";

import { FormikProps } from "formik";
import { hasError } from "../../common/utils/errorHandlers";
import { Flex } from "../../common/ui-kit/Flex/Flex";
import { Typography } from "../../common/ui-kit/Text/Typography";
import { Input } from "../../common/ui-kit/Input/Input";
import { Link, NavLink } from "react-router-dom";
import { Button } from "common/ui-kit/Button/Button";
interface FormValues {
  recoveryForm: FormikProps<{ email: string }>;
}
const SendMailForm: FC<FormValues> = React.memo(({ recoveryForm }) => {
  const sendMailHasError = hasError.bind(null, recoveryForm);
  return (
    <Flex justify={"center"} sx={{ paddingTop: "8rem" }}>
      <Flex
        style={{
          padding: "35px",
          borderRadius: "5px",
          boxShadow: "black 0px 0px 1px 1px",
        }}
      >
        <form onSubmit={recoveryForm.handleSubmit}>
          <Flex
            fDirection={"column"}
            sx={{ width: "100%", textAlign: "center" }}
          >
            <Typography variant={"title"} sx={{ textAlign: "center" }}>
              Forgot your password?
            </Typography>
            <Input
              styleType={"underline"}
              error={sendMailHasError("email") && recoveryForm.errors.email}
              {...recoveryForm.getFieldProps("email")}
            />
            <Typography>
              <p style={{ opacity: ".7" }}>
                Enter your email address and we will send you further
                instructions
              </p>
            </Typography>
            <Button
              type={"submit"}
              disabled={sendMailHasError("email")}
              color={"primary"}
              sx={{ borderRadius: "30px", marginBottom: "30px" }}
            >
              Recovery
            </Button>
            <Typography>
              <p style={{ opacity: ".7" }}>Did you remember your password?</p>
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              sx={{ textAlign: "center" }}
            >
              <Link to={"/login"} style={{ color: "inherit" }}>
                Sign in
              </Link>
            </Typography>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
});

export default SendMailForm;
