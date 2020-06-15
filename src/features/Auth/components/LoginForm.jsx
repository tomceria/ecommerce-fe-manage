import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import model from "../models";
import FormField from "../../shared/containers/FormField";
import Button from "../../shared/components/Form/Button";
import Checkbox from "../../shared/components/Form/Checkbox";

const LoginForm = () => {
  const formFuncs = useFormContext();
  const { t } = useTranslation();

  const { isSubmitting } = formFuncs.formState;

  return (
    <>
      {model(t).map(field => (
        <FormField model={field} key={field.name} disabled={isSubmitting} />
      ))}
      <Checkbox
        label={t("AUTH.LABEL.STAYSIGNEDIN")}
        name="remember"
        className="remember"
        inputRef={formFuncs.register}
        disabled={isSubmitting}
      />
      <Button type="submit" color="primary" className="submit" disabled={isSubmitting}>
        {t("AUTH.LABEL.LOGIN")}
      </Button>
    </>
  );
};

export default LoginForm;
