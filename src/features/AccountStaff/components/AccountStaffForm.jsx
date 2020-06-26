import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";

import model from "../models";
import { useAccountStaffSubInfo } from "../hooks";
import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";

const AccountStaffForm = ({ onClear }) => {
  const formFuncs = useFormContext();

  const isLoadingForm = !useAccountStaffSubInfo();
  const { isSubmitting } = formFuncs.formState;

  return (
    <>
      {model.map(field => (
        <FormField
          model={field}
          key={field.name}
          formFuncs={formFuncs}
          disabled={isLoadingForm || isSubmitting}
        />
      ))}
      <Button type="submit" color="primary" disabled={isLoadingForm || isSubmitting}>
        Submit
      </Button>
      <Button
        color="default"
        onClick={onClear}
        disabled={isLoadingForm || isSubmitting}
        className="clear"
      >
        Clear
      </Button>
    </>
  );
};

export default AccountStaffForm;

// PropTypes
AccountStaffForm.propTypes = {
  onClear: PropTypes.func.isRequired
};
