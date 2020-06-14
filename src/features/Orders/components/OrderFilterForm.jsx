import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";
import iconSearch from "@iconify/icons-bx/bx-search";
import { useTranslation } from "react-i18next";

import { orderFilterModel as model } from "../models";

import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";

const ProductFilterForm = ({ isLoading, filtersReloaded }) => {
  const formFuncs = useFormContext();
  const { t } = useTranslation();

  return (
    <>
      <div>
        <FormField
          model={model(t).find(a => a.name === "query")}
          formFuncs={formFuncs}
          disabled={isLoading}
          style={{ flexGrow: 1 }}
        />
        <Button type="submit" color="primary" disabled={isLoading}>
          <Icon icon={iconSearch} />
        </Button>
      </div>
      {["statusId", "userId", "verifier"].map(fieldName => (
        <div key={fieldName}>
          <FormField
            model={model(t).find(a => a.name === fieldName)}
            formFuncs={formFuncs}
            changed={filtersReloaded}
            disabled={isLoading}
            style={{ flexGrow: 1 }}
          />
        </div>
      ))}
    </>
  );
};

export default ProductFilterForm;

// PropTypes
ProductFilterForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  filtersReloaded: PropTypes.func.isRequired
};
