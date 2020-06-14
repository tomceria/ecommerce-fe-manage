import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useInventoryItemSubInfo } from "../hooks";
import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";

const FIELDLIST = {
  add: ["inventories"],
  update: ["id", "variationId", "available"]
};

const InventoryItemForm = ({ model, isPerformingUpdate }) => {
  const formFuncs = useFormContext();
  const { t } = useTranslation();

  const isLoadingForm = !useInventoryItemSubInfo();
  const { isSubmitting } = formFuncs.formState;

  const getFieldList = () => {
    if (isPerformingUpdate) {
      return FIELDLIST.update;
    }
    return FIELDLIST.add;
  };

  return (
    <>
      {model
        .filter(f => getFieldList().includes(f.name))
        .map(field => (
          <FormField
            model={field}
            key={field.name}
            formFuncs={formFuncs}
            disabled={(isPerformingUpdate && field.name === "id") || isLoadingForm || isSubmitting}
          />
        ))}
      <Button type="submit" color="primary" disabled={isLoadingForm || isSubmitting}>
        {t("FORM.COMMON.SUBMIT")}
      </Button>
    </>
  );
};

export default InventoryItemForm;

// PropTypes
InventoryItemForm.propTypes = {
  model: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isPerformingUpdate: PropTypes.bool
};
InventoryItemForm.defaultProps = {
  isPerformingUpdate: undefined
};
