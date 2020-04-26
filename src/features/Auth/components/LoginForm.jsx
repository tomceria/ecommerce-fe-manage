import React from "react";
import { useFormContext } from "react-hook-form";

import model from "../models";
import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";
import Checkbox from "../../shared/components/Form/Checkbox";

const LoginForm = () => {
  const formFuncs = useFormContext();

  const { isSubmitting } = formFuncs.formState;

  return (
    <>
      {model.map(field => (
        <FormField model={field} key={field.name} disabled={isSubmitting} />
      ))}
      <Checkbox
        label="Stay signed in"
        name="remember"
        className="remember"
        inputRef={formFuncs.register}
        disabled={isSubmitting}
      />
      <Button type="submit" color="primary" className="submit" disabled={isSubmitting}>
        Login
      </Button>
    </>
  );
};

export default LoginForm;
