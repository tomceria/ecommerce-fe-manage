import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import { performGetShop } from "../actions";
import { selectShop } from "../reducers";

import ShopForm from "../components/ShopForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditShopCtn = () => {
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedShop = useSelector(selectShop.shop);
  const isSuccessShop = useSelector(selectShop.isSuccessShop);
  const isLoadingShop = useSelector(selectShop.isLoadingShop);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  useEffect(() => {
    dispatch(performGetShop());

    return () => {
      model.forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingShop && isSuccessShop) {
      const nModel = JSON.parse(JSON.stringify(model));
      nModel.forEach(field => {
        field.defaultValue = fetchedShop[field.name];
      });
      setNewModel(nModel);
    }
  }, [fetchedShop, isLoadingShop]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const { name, locationLng, locationLat, address, phone, description } = data;
    setErrRes(null);
    try {
      const result = await request("put", `/shop`, {
        name,
        locationLng,
        locationLat,
        address,
        phone,
        description
      });
      setErrRes(result);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <ShopFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <ShopForm model={newModel} isPerformingUpdate />
        </ShopFormWrapper>
      )}
    </>
  );
};

export default EditShopCtn;

// Styles
const ShopFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
