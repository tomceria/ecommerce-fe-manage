import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import model from "../models";
import ProductForm from "../components/ProductForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewProductCtn = () => {
  const history = useHistory();

  const formFuncs = useForm({
    defaultValues: {
      variations: [{ name: "", colors: "" }]
    }
  });

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.images = JSON.parse(newData.images);
    Object.keys(newData.attributes).forEach(attrK => {
      const checkingAttr = newData.attributes[attrK];
      if (!checkingAttr.value || !checkingAttr.rating) {
        newData.attributes[attrK] = undefined;
      }
    });
    setErrRes(null);
    try {
      const result = await request("post", "/items", newData);
      setErrRes(result);
      history.push("/products");
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <ProductFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <ProductForm model={model} />
    </ProductFormWrapper>
  );
};

export default NewProductCtn;

// Styles
const ProductFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}
`;
