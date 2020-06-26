import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import model from "../models";
import { performGetProduct } from "../actions";
import { selectProduct } from "../reducers";

import ProductForm from "../components/ProductForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";

const EditProductCtn = ({ subjectId }) => {
  const dispatch = useDispatch();
  const formFuncs = useForm();

  const fetchedProduct = useSelector(selectProduct.product);
  const isSuccessProduct = useSelector(selectProduct.isSuccessProduct);
  const isLoadingProduct = useSelector(selectProduct.isLoadingProduct);
  const { t } = useTranslation();

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  const mapFetchedToFormModel = (_model, product) => {
    const nModel = JSON.parse(JSON.stringify(_model)); // HAS TO BE DEEP COPY
    // Assigning references to reduxSelectors, custom dataType function
    ["scale", "type", "maker", "brand"].forEach(f => {
      nModel.find(field => field.name === f).selections = _model.find(
        field => field.name === f
      ).selections;
      // dataTypes[0] must be dataTypes.CUSTOM
      nModel.find(field => field.name === f).dataTypes[0].options = _model.find(
        field => field.name === f
      ).dataTypes[0].options;
    });
    nModel.forEach(field => {
      switch (field.name) {
        case "name":
        case "id":
        case "blog": {
          field.defaultValue = product[field.name];
          break;
        }
        case "year":
        case "price": {
          field.defaultValue = product[field.name].toString();
          break;
        }
        case "scale": {
          field.defaultValue = product.scaleId;
          break;
        }
        case "type": {
          field.defaultValue = product.typeId;
          break;
        }
        case "maker": {
          field.defaultValue = product.makerId;
          break;
        }
        case "brand": {
          field.defaultValue = product.brandId;
          break;
        }
        case "hidden": {
          field.defaultValue = product.hidden ? "true" : "false";
          break;
        }
        case "images": {
          const mediaArr = product.Imgs.map(img => img.Media);
          field.defaultValue = {
            value: `[${mediaArr.map(m => m.id).toString()}]`,
            object: mediaArr
          };
          break;
        }
        case "variations": {
          field.defaultValue = {
            value: "",
            object: product.Variations.map(varia => ({
              name: varia.name,
              colors: varia.colors
            }))
          };
          break;
        }
        case "attributes": {
          field.defaultValue = {
            value: "",
            object: product.Attributes.map(attr => ({
              isPerformingUpdate: true, // TODO: TEMPORARY FIX, wait for Autocomplete solution
              attributeId: attr.id,
              value: attr.Item_Attribute.value.toString(),
              rating: attr.Item_Attribute.rating.toString()
            }))
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
    dispatch(performGetProduct(subjectId));

    return () => {
      model(t).forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingProduct && isSuccessProduct) {
      const nModel = mapFetchedToFormModel(model(t), fetchedProduct);
      setNewModel(nModel);
    }
  }, [fetchedProduct, isLoadingProduct]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.images = JSON.parse(newData.images);
    Object.keys(newData.attributes).forEach(attrK => {
      const checkingAttr = newData.attributes[attrK];
      if (!checkingAttr.value || !checkingAttr.rating) {
        newData.attributes[attrK] = undefined;
      }
    });
    setErrRes(null);
    try {
      const result = await request("put", `/items/${newData.id}`, newData);
      setErrRes(result);
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <ProductFormWrapper formFuncs={formFuncs} submitted={handleOnSubmit} errRes={errRes}>
          <ProductForm model={newModel} isPerformingUpdate />
        </ProductFormWrapper>
      )}
    </>
  );
};

export default EditProductCtn;

// PropTypes
EditProductCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const ProductFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;
