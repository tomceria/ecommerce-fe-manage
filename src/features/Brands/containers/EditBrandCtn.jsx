import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import { performGetBrand } from "../actions";
import { selectBrand } from "../reducers";

import BrandForm from "../components/BrandForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditBrandCtn = ({ subjectId }) => {
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedBrand = useSelector(selectBrand.brand);
  const isSuccessBrand = useSelector(selectBrand.isSuccessBrand);
  const isLoadingBrand = useSelector(selectBrand.isLoadingBrand);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  useEffect(() => {
    dispatch(performGetBrand(subjectId));

    return () => {
      model.forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingBrand && isSuccessBrand) {
      const nModel = JSON.parse(JSON.stringify(model));
      nModel.forEach(field => {
        field.defaultValue = fetchedBrand[field.name];
      });
      setNewModel(nModel);
    }
  }, [fetchedBrand, isLoadingBrand]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const { id, name, description } = data;
    setErrRes(null);
    try {
      const result = await request("put", `/brands/${id}`, { name, description });
      setErrRes(result);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <BrandFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <BrandForm model={newModel} isPerformingUpdate />
        </BrandFormWrapper>
      )}
    </>
  );
};

export default EditBrandCtn;

// PropTypes
EditBrandCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const BrandFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
