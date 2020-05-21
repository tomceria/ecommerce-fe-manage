import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import model from "../models";

import { performGetProduct } from "../../Products/actions";
import { selectProduct } from "../../Products/reducers";
import { performGetAccountUser } from "../../AccountUsers/actions";
import { selectAccountUser } from "../../AccountUsers/reducers";

import OrderForm from "../components/OrderForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const NewOrderCtn = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedProduct = useSelector(selectProduct.product);
  const isSuccessProduct = useSelector(selectProduct.isSuccessProduct);
  const isLoadingProduct = useSelector(selectProduct.isLoadingProduct);
  const fetchedAccountUser = useSelector(selectAccountUser.accountUser);
  const isSuccessAccountUser = useSelector(selectAccountUser.isSuccessAccountUser);
  const isLoadingAccountUser = useSelector(selectAccountUser.isLoadingAccountUser);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  const mapFetchedToFormModel = (_model, _fields) => {
    const { accountUser, product } = _fields;
    const nModel = JSON.parse(JSON.stringify(_model)); // HAS TO BE DEEP COPY
    // Assigning references to custom dataType function. dataTypes[0] must be dataTypes.CUSTOM
    ["userId"].forEach(f => {
      nModel.find(field => field.name === f).dataTypes[0].options = _model.find(
        field => field.name === f
      ).dataTypes[0].options;
    });
    // Executions
    nModel.forEach(field => {
      switch (field.name) {
        case "userId": {
          if (!isLoadingAccountUser && isSuccessAccountUser && !!accountUser) {
            field.defaultValue = accountUser.User.id;
          }
          break;
        }
        case "variationId": {
          if (!isLoadingProduct && isSuccessProduct) {
            field.selections = product.Variations;
          }
          break;
        }
        case "email": {
          if (!isLoadingAccountUser && isSuccessAccountUser && !!accountUser) {
            field.defaultValue = accountUser[field.name];
          }
          break;
        }
        case "lastName":
        case "firstName":
        case "phone": {
          if (!isLoadingAccountUser && isSuccessAccountUser && !!accountUser) {
            field.defaultValue = accountUser.User.Info[field.name];
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
    dispatch(performGetAccountUser("0")); // get blank accountUser
    setNewModel(model);

    return () => {
      model.forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    // model with new defaultValue
    if (
      (!isLoadingProduct && isSuccessProduct && !!formFuncs.getValues().itemId) ||
      (!isLoadingAccountUser && isSuccessAccountUser)
    ) {
      setNewModel(null);
      const nModel = mapFetchedToFormModel(model, {
        accountUser: fetchedAccountUser,
        product: fetchedProduct
      });
      setNewModel(nModel);
    }
  }, [fetchedProduct, isLoadingProduct, fetchedAccountUser, isLoadingAccountUser]); // eslint-disable-line

  const handleOnFieldChanged = fieldName => {
    switch (fieldName) {
      case "userId": {
        setNewModel(null);
        dispatch(performGetAccountUser(formFuncs.getValues().userId));
        break;
      }
      case "itemId": {
        dispatch(performGetProduct(formFuncs.getValues().itemId));
        formFuncs.setValue("variationId", "");
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleOnSubmit = async data => {
    const newData = {
      userId: data.userId,
      billingDetails: {
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        phone: data.phone
      },
      cart: [
        {
          itemId: data.itemId,
          variationId: data.variationId,
          quantity: 1
        }
      ]
    };
    setErrRes(null);
    try {
      const result = await request("post", "/orders", newData);
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
          <OrderForm
            model={newModel}
            isFetching={isLoadingProduct}
            onFieldChanged={fieldName => handleOnFieldChanged(fieldName)}
          />
        </OrderFormWrapper>
      )}
    </>
  );
};

export default NewOrderCtn;

// Styles
const OrderFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}
`;
