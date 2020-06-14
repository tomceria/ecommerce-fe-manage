import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import model from "../models";
import ScaleForm from "../components/ScaleForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { handleOnClearBasic as handleOnClear } from "../../../utils/function.util";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewScaleCtn = () => {
  const formFuncs = useForm();
  const { t } = useTranslation();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const { id, name, description } = data;
    setErrRes(null);
    try {
      const result = await request("post", "/scales", { id, name, description });
      setErrRes(result);
      handleOnClear(formFuncs, model(t));
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <ScaleFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <ScaleForm model={model(t)} />
    </ScaleFormWrapper>
  );
};

export default NewScaleCtn;

// Styles
const ScaleFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
