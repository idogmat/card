import React from 'react';
import {Grid, Paper, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import {loginThunk} from "./loginThunks";
import {useAppDispatch} from "../../common/hooks/hooks";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import {recoveryThunk} from "./recoveryThunk";



const RecoveryPassword = () => {

    const dispatch = useAppDispatch();
    const recoveryForm = useFormik({
        initialValues: {
            email: "",

        },
        validate: (values) => {
            const errors: any  = {};
            if (!values.email) {
                errors.email = "Required";
            }else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            dispatch(recoveryThunk(values.email));
        },
    });
    const hasError = (prop: 'email') => {
        return !!recoveryForm.errors[prop]  && !!recoveryForm.touched[prop];
    };
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
                                Enter yor email for recovery password
                            </Typography>
                        <TextField
                            error={hasError("email")}
                            label={
                                hasError("email") ? recoveryForm.errors.email : "Email"
                            }
                            margin={"normal"}
                            variant={"standard"}
                            {...recoveryForm.getFieldProps("email")}
                        />
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            disabled={hasError('email')}
                            color={"primary"}
                            sx={{ borderRadius: "30px", marginBottom: "30px" }}
                        >
                            Recovery
                        </Button>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default RecoveryPassword;