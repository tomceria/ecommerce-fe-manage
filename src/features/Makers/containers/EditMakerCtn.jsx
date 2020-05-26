import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import { performGetMaker } from "../actions";
import { selectMaker } from "../reducers";

import MakerForm from "../components/MakerForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditMakerCtn = ({ subjectId }) => {
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedMaker = useSelector(selectMaker.maker);
  const isSuccessMaker = useSelector(selectMaker.isSuccessMaker);
  const isLoadingMaker = useSelector(selectMaker.isLoadingMaker);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  useEffect(() => {
    dispatch(performGetMaker(subjectId));

    return () => {
      model.forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingMaker && isSuccessMaker) {
      const nModel = JSON.parse(JSON.stringify(model));
      nModel.forEach(field => {
        field.defaultValue = fetchedMaker[field.name];
      });
      setNewModel(nModel);
    }
  }, [fetchedMaker, isLoadingMaker]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const { id, name, description } = data;
    setErrRes(null);
    try {
      const result = await request("put", `/makers/${id}`, { name, description });
      setErrRes(result);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <MakerFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <MakerForm model={newModel} isPerformingUpdate />
        </MakerFormWrapper>
      )}
    </>
  );
};

export default EditMakerCtn;

// PropTypes
EditMakerCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const MakerFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
