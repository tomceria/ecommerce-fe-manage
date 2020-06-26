import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import model from "../models";

import { performGetProduct } from "../../Products/actions";
import { selectProduct } from "../../Products/reducers";

import InventoryItemForm from "../components/InventoryItemForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewInventoryItemCtn = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedProduct = useSelector(selectProduct.product);
  const isSuccessProduct = useSelector(selectProduct.isSuccessProduct);
  const isLoadingProduct = useSelector(selectProduct.isLoadingProduct);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  const mapFetchedToFormModel = (_model, product) => {
    const nModel = JSON.parse(JSON.stringify(_model)); // HAS TO BE DEEP COPY
    // Assigning references to custom dataType function. dataTypes[0] must be dataTypes.CUSTOM
    ["itemId"].forEach(f => {
      nModel.find(field => field.name === f).dataTypes[0].options = _model.find(
        field => field.name === f
      ).dataTypes[0].options;
    });
    // Executions
    nModel.forEach(field => {
      switch (field.name) {
        case "variationId": {
          if (!isLoadingProduct && isSuccessProduct && !!formFuncs.getValues().itemId) {
            field.selections = product.Variations;
          }
          break;
        }
        default: {
          break;
        }
      }
    });
    return nModel;
  };

  useEffect(() => {
    return () => {
      model(t).forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    // model with new defaultValue
    if (!isLoadingProduct && isSuccessProduct && !!formFuncs.getValues().itemId) {
      setNewModel(null);
      const nModel = mapFetchedToFormModel(model(t), fetchedProduct);
      setNewModel(nModel);
    }
  }, [fetchedProduct, isLoadingProduct]); // eslint-disable-line

  const handleOnProductChanged = () => {
    if (formFuncs.getValues().itemId) {
      dispatch(performGetProduct(formFuncs.getValues().itemId));
      formFuncs.setValue("variationId", "");
    }
  };

  const handleOnSubmit = async data => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.identifiers = newData.identifiers.split("\n");
    const variationName = fetchedProduct.Variations.find(varia => varia.id === newData.variationId)
      .name;
    const inventories = newData.identifiers.map(identifier => ({
      inventoryItemId: identifier,
      itemId: newData.itemId,
      variationName
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
      <InventoryItemForm
        model={newModel || model(t)}
        isPerformingAddBasic
        isFetching={isLoadingProduct}
        onProductChanged={handleOnProductChanged}
      />
    </InventoryItemFormWrapper>
  );
};

export default NewInventoryItemCtn;

// Styles
const InventoryItemFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}
`;
