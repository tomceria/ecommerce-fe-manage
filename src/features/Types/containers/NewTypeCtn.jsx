import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import TypeForm from "../components/TypeForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { handleOnClearBasic as handleOnClear } from "../../../utils/function.util";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewTypeCtn = () => {
  const formFuncs = useForm();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const { id, name, description } = data;
    setErrRes(null);
    try {
      const result = await request("post", "/types", { id, name, description });
      setErrRes(result);
      handleOnClear(formFuncs, model);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <TypeFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <TypeForm model={model} />
    </TypeFormWrapper>
  );
};

export default NewTypeCtn;

// Styles
const TypeFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
