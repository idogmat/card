import React from 'react';
import {Grid, Paper, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch} from "../../common/hooks/hooks";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import {useParams} from "react-router-dom";
import {setNewPassword} from "./setNewPasswordThunk";


const SetNewPassword = () => {
    let params = useParams();
    const dispatch = useAppDispatch();
    const setPasswordForm = useFormik({
        initialValues: {
            password: "",

        },
        validate: (values) => {
            const errors: any  = {};
            if (!values.password) {
                errors.password = "Required";
            }else if(values.password.length < 8) {
                errors.password = "Incorrect password";
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values,params);
            dispatch(setNewPassword({password:values.password,resetPasswordToken:params.id+''}));
        },
    });

    const hasError = (prop: 'password') => {
        return !!setPasswordForm.errors[prop]  && !!setPasswordForm.touched[prop];
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
                    <form onSubmit={setPasswordForm.handleSubmit}>
                        <FormControl sx={{ width: "100%", textAlign: "center" }}>
                            <Typography variant={"h5"} sx={{ textAlign: "center" }}>
                                Set your new password
                            </Typography>
                        <TextField
                            error={hasError("password")}
                            label={
                                hasError("password") ? setPasswordForm.errors.password : "password"
                            }
                            margin={"normal"}
                            variant={"standard"}
                            {...setPasswordForm.getFieldProps("password")}
                        />
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            disabled={hasError('password')}
                            color={"primary"}
                            sx={{ borderRadius: "30px", marginBottom: "30px" }}
                        >
                           Set
                        </Button>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default SetNewPassword;