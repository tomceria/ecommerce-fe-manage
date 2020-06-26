import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Alert from "../components/Form/Alert";

const FormWrapper = ({ formFuncs, submitted, errRes, children, className }) => {
  const { t } = useTranslation();

  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState("error");

  useEffect(() => {
    if (!errRes) {
      setAlertMsg("");
      return;
    }
    switch (errRes.status) {
      // Field validation errors
      case 422: {
        errRes.data.errors.reverse().forEach(fieldEr => {
          formFuncs.setError(fieldEr.param, "", fieldEr.msg);
        });
        break;
      }
      // API processing errors
      case 400:
      case 401:
      case 403:
      case 500: {
        setAlertMsg(errRes.data.message);
        setSeverity("error");
        break;
      }
      // Success
      case 200:
      case 201: {
        setAlertMsg(t("FORM.COMMON.SUCCESS"));
        setSeverity("success");
        break;
      }
      default: {
        break;
      }
    }
    // eslint-disable-next-line
  }, [errRes]);

  return (
    // eslint-disable-next-line
    <FormContext {...formFuncs}>
      <form onSubmit={formFuncs.handleSubmit(submitted)} className={className}>
        {alertMsg && <Alert severity={severity}>{alertMsg}</Alert>}
        {children}
      </form>
    </FormContext>
  );
};

export default FormWrapper;

// PropTypes
FormWrapper.propTypes = {
  formFuncs: PropTypes.shape({
    handleSubmit: PropTypes.func,
    setError: PropTypes.func
  }).isRequired,
  submitted: PropTypes.func.isRequired,
  errRes: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        errors: PropTypes.arrayOf(PropTypes.shape({})),
        message: PropTypes.string
      })
    ])
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.string])),
    PropTypes.shape({})
  ]).isRequired,
  className: PropTypes.string
};
FormWrapper.defaultProps = {
  errRes: undefined,
  className: ""
};
