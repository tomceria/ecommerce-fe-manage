import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import TestForm from "../components/TestForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { templates } from "../../../styles/stylings/stylings.style";

const TestPageCtn = () => {
  const formFuncs = useForm();

  const [errRes, setErrRes] = useState(null);

  useEffect(() => {
    console.log(formFuncs.getValues());
  }, [formFuncs.getValues()]); //eslint-disable-line

  const handleOnSubmit = async data => {
    try {
      console.log(data);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  const handleOnClear = (_formFuncs, _model) => {
    console.log("Perform clearing", _formFuncs, _model);
  };

  return (
    <TestFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <TestForm onClear={() => handleOnClear(formFuncs, model)} />
    </TestFormWrapper>
  );
};

export default TestPageCtn;

// Styles
const TestFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
