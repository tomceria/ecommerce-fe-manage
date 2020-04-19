import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import ProductForm from "../components/ProductForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import { templates } from "../../../styles/stylings/stylings.style";

const NewProductCtn = () => {
  const formFuncs = useForm();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = data => {
    setErrRes(null);
    console.log(data);
  };

  return (
    <ProductFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <ProductForm />
    </ProductFormWrapper>
  );
};

export default NewProductCtn;

// Styles
const ProductFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}
`;
