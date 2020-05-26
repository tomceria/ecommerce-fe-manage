import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import { performGetScale } from "../actions";
import { selectScale } from "../reducers";

import ScaleForm from "../components/ScaleForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditScaleCtn = ({ subjectId }) => {
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedScale = useSelector(selectScale.scale);
  const isSuccessScale = useSelector(selectScale.isSuccessScale);
  const isLoadingScale = useSelector(selectScale.isLoadingScale);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  useEffect(() => {
    dispatch(performGetScale(subjectId));

    return () => {
      model.forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingScale && isSuccessScale) {
      const nModel = JSON.parse(JSON.stringify(model));
      nModel.forEach(field => {
        field.defaultValue = fetchedScale[field.name];
      });
      setNewModel(nModel);
    }
  }, [fetchedScale, isLoadingScale]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const { id, name, description } = data;
    setErrRes(null);
    try {
      const result = await request("put", `/scales/${id}`, { name, description });
      setErrRes(result);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <ScaleFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <ScaleForm model={newModel} isPerformingUpdate />
        </ScaleFormWrapper>
      )}
    </>
  );
};

export default EditScaleCtn;

// PropTypes
EditScaleCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const ScaleFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
