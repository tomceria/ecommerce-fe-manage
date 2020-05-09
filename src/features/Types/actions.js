import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetTypes,
  doGetType,
  setLoadingTypes,
  setLoadingType,
  setSuccessTypes,
  setSuccessType
} = slice.actions;

export const performGetTypes = createAction("TYPE_SAGA_GETTYPES", function prepare(filters) {
  return {
    payload: { ...filters }
  };
});

export const performGetType = createAction("TYPE_SAGA_GETTYPE", function prepare(id) {
  return { payload: id };
});
