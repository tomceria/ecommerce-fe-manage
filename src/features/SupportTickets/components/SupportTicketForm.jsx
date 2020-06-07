import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";

import { useSupportTicketSubInfo } from "../hooks";
import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";

const SupportTicketForm = ({ model, isPerformingUpdate }) => {
  const formFuncs = useFormContext();

  const isLoadingForm = !useSupportTicketSubInfo();
  const { isSubmitting } = formFuncs.formState;

  return (
    <>
      {model
        .filter(field => ["id", "statusId"].includes(field.name))
        .map(field => (
          <FormField
            model={field}
            key={field.name}
            formFuncs={formFuncs}
            disabled={(isPerformingUpdate && field.name === "id") || isLoadingForm || isSubmitting}
          />
        ))}
      <Button type="submit" color="primary" disabled={isLoadingForm || isSubmitting}>
        Update Status
      </Button>
    </>
  );
};

export default SupportTicketForm;

// PropTypes
SupportTicketForm.propTypes = {
  model: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isPerformingUpdate: PropTypes.bool
};
SupportTicketForm.defaultProps = {
  isPerformingUpdate: undefined
};
