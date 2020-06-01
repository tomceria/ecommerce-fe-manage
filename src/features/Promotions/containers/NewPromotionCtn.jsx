import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import model from "../models";
import PromotionForm from "../components/PromotionForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewPromotionCtn = () => {
  const history = useHistory();
  const formFuncs = useForm();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const { name, timeStart, timeEnd, offPercent, description, items } = data;
    setErrRes(null);
    try {
      const result = await request("post", "/promotions", {
        name,
        timeStart,
        timeEnd,
        offPercent,
        description,
        items: JSON.parse(items)
      });
      setErrRes(result);
      history.push("/promotions");
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <PromotionFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <PromotionForm model={model} />
    </PromotionFormWrapper>
  );
};

export default NewPromotionCtn;

// Styles
const PromotionFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
