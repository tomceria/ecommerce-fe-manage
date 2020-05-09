import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import { performGetAttribute } from "../actions";
import { selectAttribute } from "../reducers";

import AttributeForm from "../components/AttributeForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditAttributeCtn = ({ subjectId }) => {
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedAttribute = useSelector(selectAttribute.attribute);
  const isSuccessAttribute = useSelector(selectAttribute.isSuccessAttribute);
  const isLoadingAttribute = useSelector(selectAttribute.isLoadingAttribute);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  useEffect(() => {
    dispatch(performGetAttribute(subjectId));

    return () => {
      model.forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingAttribute && isSuccessAttribute) {
      const nModel = JSON.parse(JSON.stringify(model));
      nModel.forEach(field => {
        field.defaultValue = fetchedAttribute[field.name];
      });
      setNewModel(nModel);
    }
  }, [fetchedAttribute, isLoadingAttribute]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const { id, name, description } = data;
    setErrRes(null);
    try {
      const result = await request("put", `/attributes/${id}`, { name, description });
      setErrRes(result);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <AttributeFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <AttributeForm model={newModel} isPerformingUpdate />
        </AttributeFormWrapper>
      )}
    </>
  );
};

export default EditAttributeCtn;

// PropTypes
EditAttributeCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const AttributeFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
