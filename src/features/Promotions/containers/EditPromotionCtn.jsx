import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import model from "../models";
import { performGetPromotion } from "../actions";
import { selectPromotion } from "../reducers";

import PromotionForm from "../components/PromotionForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditPromotionCtn = ({ subjectId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formFuncs = useForm();
  const fetchedPromotion = useSelector(selectPromotion.promotion);
  const isSuccessPromotion = useSelector(selectPromotion.isSuccessPromotion);
  const isLoadingPromotion = useSelector(selectPromotion.isLoadingPromotion);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  const mapFetchedToFormModel = (_model, promotion) => {
    const nModel = JSON.parse(JSON.stringify(_model)); // HAS TO BE DEEP COPY
    nModel.forEach(field => {
      switch (field.name) {
        case "id":
        case "name":
        case "timeStart":
        case "timeEnd":
        case "description": {
          field.defaultValue = promotion[field.name];
          break;
        }
        case "offPercent": {
          field.defaultValue = promotion[field.name].toString();
          break;
        }
        case "items": {
          const promotionItemsArr = promotion.PromotionItems.map(pI => pI.Item.id);
          field.defaultValue = {
            value: JSON.stringify(promotionItemsArr),
            object: promotionItemsArr
          };
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
    dispatch(performGetPromotion(subjectId));

    return () => {
      model(t).forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingPromotion && isSuccessPromotion) {
      const nModel = mapFetchedToFormModel(model(t), fetchedPromotion);
      setNewModel(nModel);
    }
  }, [fetchedPromotion, isLoadingPromotion]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const { id, name, timeStart, timeEnd, offPercent, description, items } = data;
    setErrRes(null);
    try {
      const result = await request("put", `/promotions/${id}`, {
        id,
        name,
        timeStart,
        timeEnd,
        offPercent,
        description,
        items: JSON.parse(items)
      });
      setErrRes(result);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <PromotionFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <PromotionForm model={newModel} isPerformingUpdate />
        </PromotionFormWrapper>
      )}
    </>
  );
};

export default EditPromotionCtn;

// PropTypes
EditPromotionCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const PromotionFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
