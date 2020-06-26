import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import TestForm from "../components/TestForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { templates } from "../../../styles/stylings/stylings.style";

const TestPageCtn = () => {
  const formFuncs = useForm({
    defaultValues: {
      variations: [{ name: "", colors: "" }]
    }
  });

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    try {
      formFuncs.setError("variations", "", "Variations error test");
      console.log(data);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  const handleOnClear = (_formFuncs, _model) => {
    console.log("Perform clearing", _formFuncs, _model);
    console.log(formFuncs.getValues());
    console.log(formFuncs.errors);
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
