import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import AttributeForm from "../components/AttributeForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { handleOnClearBasic as handleOnClear } from "../../../utils/function.util";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewAttributeCtn = () => {
  const formFuncs = useForm();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const { id, name, description, valueType } = data;
    setErrRes(null);
    try {
      const result = await request("post", "/attributes", { id, name, description, valueType });
      setErrRes(result);
      handleOnClear(formFuncs, model);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <AttributeFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <AttributeForm model={model} />
    </AttributeFormWrapper>
  );
};

export default NewAttributeCtn;

// Styles
const AttributeFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
