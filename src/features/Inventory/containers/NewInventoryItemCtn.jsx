import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import model from "../models";

import InventoryItemForm from "../components/InventoryItemForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewInventoryItemCtn = () => {
  const history = useHistory();
  const formFuncs = useForm();
  const { t } = useTranslation();

  const [errRes, setErrRes] = useState(null);

  const handleOnSubmit = async data => {
    const inventories = JSON.parse(data.inventories).map(inv => ({
      itemId: inv[0],
      variationName: inv[1],
      quantity: inv[2]
    }));
    setErrRes(null);
    try {
      const result = await request("post", "/inventories", { inventories });
      setErrRes(result);
      history.push("/inventory");
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <InventoryItemFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
      <hr style={{ width: "100%" }} />
      <InventoryItemForm model={model(t)} />
    </InventoryItemFormWrapper>
  );
};

export default NewInventoryItemCtn;

// Styles
const InventoryItemFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}
`;
