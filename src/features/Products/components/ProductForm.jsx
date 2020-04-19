import React from "react";
import { useFormContext } from "react-hook-form";

import model from "../models";
import { useProductSubInfo } from "../hooks";
import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";

const ProductForm = () => {
  const formFuncs = useFormContext();

  const isLoadingForm = !useProductSubInfo();
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
    </>
  );
};

export default ProductForm;
