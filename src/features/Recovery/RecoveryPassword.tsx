import React, { useState } from "react";
import { useFormik } from "formik";
import { recoveryThunk } from "./recoveryThunk";
import CheckMail from "./CheckMail";
import SendMailForm from "./SendMailForm";
import { useAppDispatch } from "../../common/hooks";

const RecoveryPassword = React.memo(() => {
  const [sent, setSent] = useState(false);
  const dispatch = useAppDispatch();

  const recoveryForm = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const res = await dispatch(recoveryThunk(values.email));
      !!res && setSent(true);
    },
  });

  return sent ? (
    <CheckMail email={recoveryForm.values.email} />
  ) : (
    <SendMailForm recoveryForm={recoveryForm} />
  );
});

export default RecoveryPassword;
