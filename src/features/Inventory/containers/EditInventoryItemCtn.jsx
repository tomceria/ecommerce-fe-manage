import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import { performGetInventoryItem } from "../actions";
import { selectInventoryItem } from "../reducers";

import { performGetProduct } from "../../Products/actions";
import { selectProduct } from "../../Products/reducers";

import InventoryItemForm from "../components/InventoryItemForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditInventoryItemCtn = ({ subjectId }) => {
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedProduct = useSelector(selectProduct.product);
  const isSuccessProduct = useSelector(selectProduct.isSuccessProduct);
  const isLoadingProduct = useSelector(selectProduct.isLoadingProduct);
  const fetchedInventoryItem = useSelector(selectInventoryItem.inventoryItem);
  const isSuccessInventoryItem = useSelector(selectInventoryItem.isSuccessInventoryItem);
  const isLoadingInventoryItem = useSelector(selectInventoryItem.isLoadingInventoryItem);

  const [newModel, setNewModel] = useState(null);
  const [localInventoryItem, setLocalInventoryItem] = useState(null);
  const [localProduct, setLocalProduct] = useState(null);
  const [errRes, setErrRes] = useState(null);

  const mapFetchedToFormModel = (_model, inventoryItem, product) => {
    const nModel = JSON.parse(JSON.stringify(_model)); // HAS TO BE DEEP COPY
    // Executions
    nModel.forEach(field => {
      switch (field.name) {
        case "id":
        case "available": {
          field.defaultValue = inventoryItem[field.name].toString();
          break;
        }
        case "variationId": {
          field.defaultValue = inventoryItem[field.name].toString();
          if (!isLoadingProduct && isSuccessProduct) {
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
    dispatch(performGetInventoryItem(subjectId));

    return () => {
      model.forEach(field => {
        formFuncs.unregister(field.name);
      });
      setNewModel(null);
    };
  }, []); // eslint-disable-line

  // Step 1
  useEffect(() => {
    if (!isLoadingInventoryItem && isSuccessInventoryItem) {
      setLocalInventoryItem(fetchedInventoryItem);
    }
  }, [fetchedInventoryItem, isLoadingInventoryItem]); // eslint-disable-line

  // Step 2
  useEffect(() => {
    if (localInventoryItem) {
      dispatch(performGetProduct(fetchedInventoryItem.itemId));
    }
  }, [localInventoryItem]); // eslint-disable-line

  // Step 3
  useEffect(() => {
    if (localInventoryItem && !isLoadingProduct && isSuccessProduct) {
      setLocalProduct(fetchedProduct);
    }
  }, [fetchedProduct, isLoadingProduct]); // eslint-disable-line

  // Step 4
  useEffect(() => {
    // model with new defaultValue
    if (localProduct) {
      setNewModel(null);
      const nModel = mapFetchedToFormModel(model, localInventoryItem, localProduct);
      setNewModel(nModel);
    }
  }, [localProduct]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const { variationId, available } = data;
    setErrRes(null);
    try {
      const result = await request("put", `/inventories/${subjectId}`, { variationId, available });
      setErrRes(result);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <InventoryItemFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <InventoryItemForm model={newModel} isPerformingUpdate isFetching={isLoadingProduct} />
        </InventoryItemFormWrapper>
      )}
    </>
  );
};

export default EditInventoryItemCtn;

// PropTypes
EditInventoryItemCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const InventoryItemFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}
`;
