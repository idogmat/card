import React from "react";
import { FormikProps } from "formik";
import { hasError } from "../../common/utils/errorHandlers";
import { Typography } from "../../common/ui-kit/Text/Typography";
import { Input } from "common/ui-kit/Input/Input";
import { Link } from "react-router-dom";
import { Button } from "common/ui-kit/Button/Button";
import {
  RegisterContent,
  RegisterForm,
  RegisterWrapper,
} from "../Register/RegisterStyles";
import { Paper } from "../../common/ui-kit/Paper/Paper";

interface FormValues {
  recoveryForm: FormikProps<{ email: string }>;
}

const SendMailForm: React.FC<FormValues> = React.memo(({ recoveryForm }) => {
  const sendMailHasError = hasError.bind(null, recoveryForm);
  return (
    <RegisterWrapper>
      <RegisterContent>
        <Paper sx={{ margin: "10px" }}>
          <RegisterForm onSubmit={recoveryForm.handleSubmit}>
            <Typography variant={"title"} sx={{ textAlign: "center" }}>
              Forgot your password?
            </Typography>
            <Input
              label={
                sendMailHasError("email") ? recoveryForm.errors.email : "Email"
              }
              error={sendMailHasError("email")}
              {...recoveryForm.getFieldProps("email")}
            />
            <Typography variant={"sub-title-sm"} sx={{ opacity: ".7" }}>
              Enter your email address and we will send you further instructions
            </Typography>
            <Button type={"submit"} disabled={sendMailHasError("email")}>
              Recovery
            </Button>
            <Typography variant={"sub-title-sm"} sx={{ opacity: ".7" }}>
              Did you remember your password?
            </Typography>
            <Typography variant={"sub-title-sm"} sx={{ color: "#366EFF" }}>
              <Link to={"/login"}>Sign in</Link>
            </Typography>
          </RegisterForm>
        </Paper>
      </RegisterContent>
    </RegisterWrapper>
  );
});

export default SendMailForm;
