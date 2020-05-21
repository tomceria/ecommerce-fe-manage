import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import { performGetOrder } from "../actions";
import { selectOrder } from "../reducers";

import OrderForm from "../components/OrderForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditOrderCtn = ({ subjectId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedOrder = useSelector(selectOrder.order);
  const isSuccessOrder = useSelector(selectOrder.isSuccessOrder);
  const isLoadingOrder = useSelector(selectOrder.isLoadingOrder);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  const mapFetchedToFormModel = (_model, order) => {
    const nModel = JSON.parse(JSON.stringify(_model)); // HAS TO BE DEEP COPY
    nModel.forEach(field => {
      switch (field.name) {
        case "id": {
          field.defaultValue = order[field.name];
          break;
        }
        case "item_id":
        case "item_name":
        case "item_variationId": {
          field.defaultValue = order.Items[0][field.name];
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
    dispatch(performGetOrder(subjectId));

    return () => {
      model.forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingOrder && isSuccessOrder) {
      const nModel = mapFetchedToFormModel(model, fetchedOrder);
      setNewModel(nModel);
    }
  }, [fetchedOrder, isLoadingOrder]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const newData = {
      orderDetails: [
        {
          variationId: data.item_variationId,
          inventoryId: data.item_inventoryId
        }
      ]
    };
    setErrRes(null);
    try {
      const result = await request("patch", `/orders/${subjectId}/verify`, newData);
      setErrRes(result);
      history.push("/orders");
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <OrderFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <OrderForm model={newModel} isPerformingVerify isFetching={isLoadingOrder} />
        </OrderFormWrapper>
      )}
    </>
  );
};

export default EditOrderCtn;

// PropTypes
EditOrderCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const OrderFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
