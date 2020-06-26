import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetAttributes,
  doGetAttribute,
  setLoadingAttributes,
  setLoadingAttribute,
  setSuccessAttributes,
  setSuccessAttribute
} = slice.actions;

export const performGetAttributes = createAction("ATTRIBUTES_SAGA_GETATTRIBUTES", function prepare(filters) {
  return {
    payload: { ...filters }
  };
});
export const performGetAttribute = createAction("ATTRIBUTES_SAGA_GETATTRIBUTE", function prepare(id) {
  return { payload: id };
});
