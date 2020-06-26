import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import model from "../models";
import { performGetType } from "../actions";
import { selectType } from "../reducers";

import TypeForm from "../components/TypeForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditTypeCtn = ({ subjectId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formFuncs = useForm();
  const fetchedType = useSelector(selectType.type);
  const isSuccessType = useSelector(selectType.isSuccessType);
  const isLoadingType = useSelector(selectType.isLoadingType);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  useEffect(() => {
    dispatch(performGetType(subjectId));

    return () => {
      model(t).forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingType && isSuccessType) {
      const nModel = JSON.parse(JSON.stringify(model(t)));
      nModel.forEach(field => {
        field.defaultValue = fetchedType[field.name];
      });
      setNewModel(nModel);
    }
  }, [fetchedType, isLoadingType]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const { id, name, description } = data;
    setErrRes(null);
    try {
      const result = await request("put", `/types/${id}`, { name, description });
      setErrRes(result);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <TypeFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <TypeForm model={newModel} isPerformingUpdate />
        </TypeFormWrapper>
      )}
    </>
  );
};

export default EditTypeCtn;

// PropTypes
EditTypeCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const TypeFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
