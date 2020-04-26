import React from "react";
// import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";

import { accountStaffPasswordModel as model } from "../models";
import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";

const AccountStaffPasswordForm = () => {
  const formFuncs = useFormContext();

  const { isSubmitting } = formFuncs.formState;

  return (
    <>
      {model.map(field => (
        <FormField model={field} key={field.name} formFuncs={formFuncs} disabled={isSubmitting} />
      ))}
      <Button type="submit" color="primary" disabled={isSubmitting}>
        Reset password
      </Button>
    </>
  );
};

export default AccountStaffPasswordForm;

// PropTypes
AccountStaffPasswordForm.propTypes = {};
