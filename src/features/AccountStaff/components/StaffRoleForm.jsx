import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";

import { accountStaffRoleModel as model } from "../models";
import { useAccountStaffSubInfo } from "../hooks";
import FormField from "../../shared/containers/FormField";

const StaffRoleForm = ({ subject, submitted }) => {
  const formFuncs = useFormContext();

  const isLoadingForm = !useAccountStaffSubInfo();
  const { isSubmitting } = formFuncs.formState;

  return (
    <>
      {model({ defaultValue: subject.Staff.roleId }).map(field => (
        <FormField
          model={field}
          key={field.name}
          formFuncs={formFuncs}
          disabled={isLoadingForm || isSubmitting}
          //
          changed={() => formFuncs.handleSubmit(submitted)()}
        />
      ))}
    </>
  );
};

export default StaffRoleForm;

// PropTypes
StaffRoleForm.propTypes = {
  subject: PropTypes.shape({
    Staff: PropTypes.shape({
      roleId: PropTypes.string
    })
  }).isRequired,
  submitted: PropTypes.func.isRequired
};
