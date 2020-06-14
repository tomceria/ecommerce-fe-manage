import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import model from "../models";
import MakerForm from "../components/MakerForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { handleOnClearBasic as handleOnClear } from "../../../utils/function.util";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewMakerCtn = () => {
  const formFuncs = useForm();
  const { t } = useTranslation();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const { id, name, description } = data;
    setErrRes(null);
    try {
      const result = await request("post", "/makers", { id, name, description });
      setErrRes(result);
      handleOnClear(formFuncs, model(t));
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <MakerFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <MakerForm model={model(t)} />
    </MakerFormWrapper>
  );
};

export default NewMakerCtn;

// Styles
const MakerFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
