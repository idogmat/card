import React, { FC } from "react";
import { Grid, Link, Paper, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import Button from "@mui/material/Button/Button";
import { FormikProps } from "formik";
import { hasError } from "../../common/utils/errorHandlers";
interface FormValues {
  recoveryForm: FormikProps<{ email: string }>;
}
const SendMailForm: FC<FormValues> = React.memo(({ recoveryForm }) => {
  const sendMailHasError = hasError.bind(null, recoveryForm);
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid item justifyContent={"center"} xs={3} sx={{ minWidth: "360px" }}>
        <Paper sx={{ padding: "35px" }}>
          <form onSubmit={recoveryForm.handleSubmit}>
            <FormControl sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant={"h5"} sx={{ textAlign: "center" }}>
                Forgot your password?
              </Typography>
              <TextField
                error={sendMailHasError("email")}
                label={
                  sendMailHasError("email")
                    ? recoveryForm.errors.email
                    : "Email"
                }
                margin={"normal"}
                variant={"standard"}
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
                variant={"contained"}
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
                <Link>Try logging in</Link>
              </Typography>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
});

export default SendMailForm;
