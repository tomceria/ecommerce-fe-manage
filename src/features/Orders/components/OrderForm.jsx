import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";

import { useOrderSubInfo } from "../hooks";
import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";

const FIELDLIST = {
  add: ["userId", "lastName", "firstName", "email", "phone", "address", "itemId", "variationId"],
  verify: ["id", "verify"]
};

const OrderForm = ({ model, isPerformingVerify, isFetching, onFieldChanged }) => {
  const formFuncs = useFormContext();

  const isLoadingForm = !useOrderSubInfo();
  const { isSubmitting } = formFuncs.formState;

  const getFieldList = () => {
    if (isPerformingVerify) {
      return FIELDLIST.verify;
    }
    return FIELDLIST.add;
  };

  const additionalProps = fieldName => {
    const newProps = {};
    if (!!onFieldChanged && ["userId", "itemId"].includes(fieldName)) {
      newProps.changed = () => onFieldChanged(fieldName);
    }
    return newProps;
  };

  return (
    <>
      {model
        .filter(f => getFieldList().includes(f.name))
        .map(field => (
          <React.Fragment key={field.name}>
            <FormField
              model={field}
              // key={field.name}
              formFuncs={formFuncs}
              disabled={
                ["id", "item_id", "item_name", "item_variationId"].includes(field.name) ||
                // (isPerformingVerify && ["email", "phone", "address"].includes(field.name)) ||
                isLoadingForm ||
                isFetching ||
                isSubmitting
              }
              {...additionalProps(field.name)} // eslint-disable-line
            />
          </React.Fragment>
        ))}
      <Button type="submit" color="primary" disabled={isLoadingForm || isSubmitting}>
        Submit
      </Button>
    </>
  );
};

export default OrderForm;

// PropTypes
OrderForm.propTypes = {
  model: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isPerformingVerify: PropTypes.bool,
  isFetching: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func
};
OrderForm.defaultProps = {
  isPerformingVerify: undefined,
  onFieldChanged: undefined
};
