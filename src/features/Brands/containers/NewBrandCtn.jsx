import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import BrandForm from "../components/BrandForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { handleOnClearBasic as handleOnClear } from "../../../utils/function.util";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewBrandCtn = () => {
  const formFuncs = useForm();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const { id, name, description } = data;
    setErrRes(null);
    try {
      const result = await request("post", "/brands", { id, name, description });
      setErrRes(result);
      handleOnClear(formFuncs, model);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <BrandFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <BrandForm model={model} />
    </BrandFormWrapper>
  );
};

export default NewBrandCtn;

// Styles
const BrandFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
